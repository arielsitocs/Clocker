"use client"

import { useState } from "react";

import Image from "next/image";

import Navigation from "../components/navigation";
import Cronometer from "../components/cronometer";

export default function Home() {
  const [section, setSection] = useState(<Cronometer />);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-page-background">
      <main className="flex flex-col h-[95vh] w-[90%] md:w-[750px] px-1 py-3 md:px-20 md:py-10 rounded-[10px] bg-gray-background">
        {section}
        <Navigation section={section} setSection={setSection} />
      </main>
    </div>
  );
}
