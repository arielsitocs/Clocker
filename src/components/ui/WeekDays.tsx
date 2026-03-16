import DayTypes from "@/src/types/DayTypes";

export default function WeekDays({ selectedDays, setSelectedDays }: any) {

    const checkDaySelected = (day: string) => {
        console.log(selectedDays)
        const isTrue = selectedDays.some((d: DayTypes) => day === d.day)

        return isTrue;
    }

    return (
        <div className="flex gap-3 ml-auto text-[clamp(11px,2.5vw,15px)]">
            <h1 className={`${checkDaySelected('L') ? 'text-light-blue' : 'text-white'}`}>L</h1>
            <h1 className={`${checkDaySelected('M') ? 'text-light-blue' : 'text-white'}`}>M</h1>
            <h1 className={`${checkDaySelected('X') ? 'text-light-blue' : 'text-white'}`}>X</h1>
            <h1 className={`${checkDaySelected('J') ? 'text-light-blue' : 'text-white'}`}>J</h1>
            <h1 className={`${checkDaySelected('V') ? 'text-light-blue' : 'text-white'}`}>V</h1>
            <h1 className={`${checkDaySelected('S') ? 'text-light-blue' : 'text-white'}`}>S</h1>
            <h1 className={`${checkDaySelected('D') ? 'text-light-blue' : 'text-white'}`}>D</h1>
        </div>
    )
}