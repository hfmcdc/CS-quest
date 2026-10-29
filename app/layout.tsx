import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS Quest (Beta) | CBSE Class XII Computer Science & Maths Practice",
  description: "Practice Binary Files, CSV Files, MySQL queries and Python-SQL connectivity, plus Class XII Maths (Inverse Trigonometry, Vectors, 3D Geometry, Maxima & Minima, Integrals).",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
