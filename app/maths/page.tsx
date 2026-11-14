import type { Metadata } from "next";
import MathsRoute from "@/components/maths/MathsRoute";

export const metadata: Metadata = {
  title: "Maths Quest | Quest MC",
  description: "CBSE Class XII Maths revision, worked examples, practice and challenges.",
};

export default function MathsPage() {
  return <MathsRoute />;
}
