/**
 * Seasonal theme switch.
 * To remove Halloween: set HALLOWEEN_ENABLED to false (or just wait: it switches itself off after HALLOWEEN_UNTIL).
 * The check runs in the browser (see the inline script in app/layout.tsx), so it expires correctly even on a statically built site.
 */
export const HALLOWEEN_ENABLED = true;
export const HALLOWEEN_UNTIL = "2026-11-04"; // last day it shows, inclusive (local time)
