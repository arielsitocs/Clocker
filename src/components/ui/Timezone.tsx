import WorldClockTypes from "@/src/types/WorldClockTypes";

export default function Timezone({ id, datetime, timezone  }: WorldClockTypes) {
    return (
        <div className="flex w-full text-[clamp(16px,3vw,22px)] rounded-[5px] p-2 font-light bg-gray-background ">
            <h2 className="text-[clamp(16px,2vw,19px)]">{timezone}:</h2>
            <h2 className="ml-auto font-medium">{datetime}</h2>
        </div>
    )
}