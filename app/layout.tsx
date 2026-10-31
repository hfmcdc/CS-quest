import type { Metadata, Viewport } from "next";
import "./globals.css";
import FirstVisitSplash from "@/components/FirstVisitSplash";
import AppPrefetcher from "@/components/AppPrefetcher";
import AppNav from "@/components/AppNav";
import { HALLOWEEN_ENABLED, HALLOWEEN_UNTIL } from "@/lib/seasonal";

export const metadata: Metadata = {
  title: "Quest MC | CBSE Class XII Practice",
  description: "Choose Computer Science, Maths or Chemistry practice for CBSE Class XII.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#070812" };

/** Runs before first paint. The splash is only switched on when this browser has never opened the app
 *  (flag key must match FirstVisitSplash). If storage is blocked we show it, which is the safe fallback. */
const SHOW_SPLASH = `(function(){var d=document.documentElement;try{if(!localStorage.getItem("qmc:seen"))d.setAttribute("data-splash","1")}catch(e){d.setAttribute("data-splash","1")}})()`;

/** Seasonal theme: applied before first paint, and only while today is on or before HALLOWEEN_UNTIL (browser date). */
const SEASON = HALLOWEEN_ENABLED
  ? `(function(){var d=document.documentElement,e=new Date("${HALLOWEEN_UNTIL}T23:59:59");if(new Date()<=e)d.setAttribute("data-theme","halloween")})()`
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
        {children}
        <AppPrefetcher />
      </body>
    </html>
  );
}
