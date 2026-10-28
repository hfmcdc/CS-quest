import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest | CBSE Class XII Practice",
  description: "Practice Binary Files, CSV Files, MySQL queries and Python-SQL connectivity for CBSE Class XII.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
