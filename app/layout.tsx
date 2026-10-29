import type { Metadata, Viewport } from "next";
import "./globals.css";
import InstallPrompt from "@/components/InstallPrompt";
import FeedbackButton from "@/components/FeedbackButton";

export const metadata: Metadata = {
  title: "Quest MC | CBSE Class XII Practice",
  description: "Practice Computer Science and Maths for CBSE Class XII.",
  applicationName: "Quest MC",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#07090f" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FeedbackButton />
        <InstallPrompt />
      </body>
    </html>
  );
}
