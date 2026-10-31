import type { Metadata, Viewport } from "next";
import "./globals.css";
import FirstVisitSplash from "@/components/FirstVisitSplash";
import AppPrefetcher from "@/components/AppPrefetcher";

export const metadata: Metadata = {
  title: "Quest MC | CBSE Class XII Practice",
  description: "Choose Computer Science, Maths or Chemistry practice for CBSE Class XII.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090f" };

/** Runs before first paint: marks the page as a first visit so the splash shows with no flash on repeat visits. */
const FIRST_VISIT = `try{if(!localStorage.getItem("qmc_splash_seen_v1"))document.documentElement.setAttribute("data-splash","1")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FIRST_VISIT }} />
      </head>
      <body>
        <FirstVisitSplash />
        {children}
        <AppPrefetcher />
      </body>
    </html>
  );
}
