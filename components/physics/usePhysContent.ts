"use client";

import { useCallback, useEffect, useState } from "react";
import { cachedPhysContent, loadPhysContent } from "@/lib/physics/chapters";
import type { FeatureContentMap, PhysFeature } from "@/lib/physics/types";

/**
 * Loads one chapter-feature question bank on demand (a separate JS chunk per chapter per feature).
 * Content already warmed by the prefetcher or opened before is returned synchronously, so there is no flash of a skeleton.
 */
export function usePhysContent<F extends PhysFeature>(slug: string, feature: F) {
  const [data, setData] = useState<FeatureContentMap[F] | undefined>(() => cachedPhysContent(slug, feature));
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let alive = true;
    const hit = cachedPhysContent(slug, feature);
    if (hit) { setData(hit); setError(false); return; }
    setData(undefined);
    setError(false);
    loadPhysContent(slug, feature)
      .then((c) => { if (alive) setData(c); })
      .catch(() => { if (alive) setError(true); });
    return () => { alive = false; };
  }, [slug, feature, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { data, error, retry };
}
