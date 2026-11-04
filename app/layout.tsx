import type { Metadata, Viewport } from "next";
import "./globals.css";
import FirstVisitSplash from "@/components/FirstVisitSplash";
import AppPrefetcher from "@/components/AppPrefetcher";
import AppNav from "@/components/AppNav";
import PhysicsAnnouncement from "@/components/PhysicsAnnouncement";
import { HALLOWEEN_ENABLED, HALLOWEEN_END_AT } from "@/lib/seasonal";

export const metadata: Metadata = {
  title: "Quest MC | CBSE Class XII Practice",
  description: "Choose Computer Science, Maths or Chemistry practice for CBSE Class XII.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#070812" };

/** Runs before first paint on every full page load (open or refresh), so the loading screen shows with no flash of the page behind it.
 *  Client-side navigation never reloads the layout, so moving between screens does not replay it. */
const SHOW_SPLASH = `document.documentElement.setAttribute("data-splash","1")`;

/** Seasonal theme: apply before first paint, then remove it exactly at the India-time cutoff. */
const SEASON = HALLOWEEN_ENABLED
  ? `(function(){var d=document.documentElement,t=Date.parse("${HALLOWEEN_END_AT}"),n=Date.now();if(n<t){d.setAttribute("data-theme","halloween");window.setTimeout(function(){d.removeAttribute("data-theme")},t-n)}})()`
  : "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SHOW_SPLASH + ";" + SEASON }} />
      </head>
      <body>
        <FirstVisitSplash />
        <AppNav />
        <PhysicsAnnouncement />
        {children}
        <AppPrefetcher />
      </body>
    </html>
  );
}
