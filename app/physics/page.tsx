import type { Metadata } from "next";
import PhysicsHome from "@/components/physics/PhysicsHome";

export const metadata: Metadata = {
  title: "Physics | Quest MC",
  description: "CBSE Class XII Physics: formula flashcards, practice, equation identification and advanced numericals.",
};

export default function PhysicsPage() {
  return <PhysicsHome />;
}
