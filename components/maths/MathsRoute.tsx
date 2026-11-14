"use client";

import { useRouter } from "next/navigation";
import MathsQuest from "@/components/maths/MathsQuest";

export default function MathsRoute() {
  const router = useRouter();
  return <MathsQuest onExit={() => router.push("/")} />;
}
