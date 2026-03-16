import Image from "next/image";

import Timezone from "./ui/Timezone"

import timezones from "../data/world_clocks";

import SearchIcon from "@/public/search_icon.svg";

export default function WorldClock() {
    return (
        <div className="flex flex-col mb-auto h-full">
            <h1 className="text-white text-center text-[clamp(24px,5vw,30px)]">Reloj Mundial</h1>
            <main className="flex flex-col items-center h-full">
                <div className="flex flex-col items-center w-[95%] md:w-[75%] text-white font-semibold mt-10">
                    <h2 className="mb-4 text-center text-[clamp(18px,4vw,20px)]">Horario de Chile</h2>
                    <div className="flex justify-center w-full rounded-[10px] p-2 bg-page-background">
                        <span className="text-[clamp(20px,6vw,30px)] rounded-[10px]">18:42:33</span>
                    </div>
                </div>
                <div className="flex flex-col items-center w-[95%] md:w-[75%] rounded-[10px] p-2 max-h-[570px] md:max-h-[500px] overflow-y-auto text-white font-semibold mt-2 bg-page-background gap-3">
                    <div className="w-full">
                        <input type="text" placeholder="Buscar Ciudad..." className="w-full p-2 text-[clamp(15px,3vw,18px)] rounded-[5px] bg-light-black
                        bg-[url('/search_icon.svg')] bg-no-repeat bg-[left_6px_center] pl-10 bg-[length:32px]" />
                    </div>
                    {
                        timezones.map((timezone) => (
                            <Timezone key={timezone.id} id={timezone.id} city={timezone.city} country={timezone.country} time={timezone.time} timezone={timezone.timezone} />
                        ))
                    }
                </div>
            </main>
        </div>
    )
}