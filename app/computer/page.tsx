import type { Metadata } from "next";
import CSQuest from "@/components/CSQuest";

export const metadata: Metadata = {
  title: "Computer Science | Quest MC",
  description: "CBSE Class XII Computer Science practice for Binary Files, CSV, MySQL and Python–SQL.",
};

export default function ComputerPage() {
  return <CSQuest />;
}
