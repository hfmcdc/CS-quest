import type { Metadata } from "next";
import MathsComingSoon from "@/components/MathsComingSoon";

export const metadata: Metadata = {
  title: "Quest MC | Maths coming soon",
  description: "CBSE Class XII Maths practice is coming soon.",
};

export default function Page() {
  return <MathsComingSoon />;
}
