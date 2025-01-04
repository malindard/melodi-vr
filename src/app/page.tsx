import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MELODI",
  description: "Website pencari ruangan Gedung Digital Center",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
