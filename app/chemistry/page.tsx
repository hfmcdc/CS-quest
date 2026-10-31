import type { Metadata } from "next";
import ChemistryHome from "@/components/chemistry/ChemistryHome";

export const metadata: Metadata = {
  title: "Chemistry | Quest MC",
  description: "CBSE Class XII Chemistry revision and MCQ practice.",
};

export default function ChemistryPage() {
  return <ChemistryHome />;
}
