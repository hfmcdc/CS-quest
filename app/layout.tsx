import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quest MC | CBSE Class XII Practice",
  description: "Choose Computer Science or Maths practice for CBSE Class XII.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
