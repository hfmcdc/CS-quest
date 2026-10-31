import type { Metadata, Viewport } from "next";
import "./globals.css";
import FirstVisitSplash from "@/components/FirstVisitSplash";
import AppPrefetcher from "@/components/AppPrefetcher";

export const metadata: Metadata = {
  title: "Quest MC | CBSE Class XII Practice",
  description: "Choose Computer Science, Maths or Chemistry practice for CBSE Class XII.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090f" };

/** Runs before first paint on every full page load (open or reload), so the splash shows with no flash of the page behind it. Client-side navigation never reloads the layout, so it does not replay. */
const SHOW_SPLASH = `document.documentElement.setAttribute("data-splash","1")`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SHOW_SPLASH }} />
      </head>
      <body>
        <FirstVisitSplash />
        {children}
        <AppPrefetcher />
      </body>
    </html>
  );
}
