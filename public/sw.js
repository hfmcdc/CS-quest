/* Quest MC service worker: tiny, dependency-free offline/speed layer.
 *  - /_next/static/*  hashed, immutable          -> cache-first
 *  - page navigations                            -> network-first (2.5 s), cached copy if slow/offline; main pages are pre-cached on install
 *  - other same-origin static files              -> stale-while-revalidate
 * Next.js RSC/prefetch requests are left to the network + Next's own router cache. */
const VERSION = "qmc-v2";
const STATIC = `${VERSION}-static`;
const PAGES = `${VERSION}-pages`;
const MAX_PAGES = 20;
const MAX_STATIC = 120;

// Pages worth having offline / instantly on a cold start. Best effort: a failure never blocks installation.
const SHELL = ["/", "/computer", "/maths", "/chemistry", "/chemistry/d-and-f-block-elements"];
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(PAGES)
      .then((cache) => Promise.all(SHELL.map((u) => cache.add(u).catch(() => {}))))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function cacheFirst(req) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) { cache.put(req, res.clone()); trim(STATIC, MAX_STATIC); }
  return res;
}

async function networkFirst(req) {
  const cache = await caches.open(PAGES);
  const net = fetch(req).then((res) => {
    if (res.ok) { cache.put(req, res.clone()); trim(PAGES, MAX_PAGES); }
    return res;
  });
  const cached = await cache.match(req);
  if (!cached) return net.catch(async () => (await cache.match("/")) || Response.error());
  return Promise.race([net, new Promise((r) => setTimeout(() => r(cached), 2500))]).catch(() => cached);
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(STATIC);
  const hit = await cache.match(req);
  const net = fetch(req).then((res) => { if (res.ok) cache.put(req, res.clone()); return res; }).catch(() => hit);
  return hit || net;
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (req.headers.get("RSC") || url.searchParams.has("_rsc")) return; // Next router payloads
  if (url.pathname === "/sw.js") return;

  if (url.pathname.startsWith("/_next/static/")) return e.respondWith(cacheFirst(req));
  if (req.mode === "navigate") return e.respondWith(networkFirst(req));
  if (/\.(?:woff2?|png|jpe?g|svg|ico|webp|avif)$/i.test(url.pathname)) return e.respondWith(staleWhileRevalidate(req));
});
