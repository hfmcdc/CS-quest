import type { Metadata } from "next";
import MathsComingSoon from "@/components/MathsComingSoon";

export const metadata: Metadata = {
  title: "Maths Quest | Coming soon",
  description: "CBSE Class XII Maths practice launches at 5:00 PM IST.",
};

export default function Page() {
  return <MathsComingSoon />;
}
