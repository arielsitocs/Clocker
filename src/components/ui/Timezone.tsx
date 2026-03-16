import WorldClockTypes from "@/src/types/WorldClockTypes";

export default function Timezone({ id, city, country, utcOffset, timezone, time  }: WorldClockTypes) {
    return (
        <div className="flex w-full text-[clamp(16px,3vw,22px)] rounded-[5px] p-2 font-light bg-gray-background ">
            <h2>{city}:</h2>
            <h2 className="ml-auto">{time}</h2>
        </div>
    )
}