import type { Metadata } from "next";
import CSQuest from "@/components/CSQuest";

export const metadata: Metadata = {
  title: "CS Quest (Beta) | CBSE Class XII Computer Science Practice",
  description: "Practice Binary Files, CSV Files, MySQL queries and Python-SQL connectivity for CBSE Class XII.",
};

export default function Page() {
  return <CSQuest />;
}
