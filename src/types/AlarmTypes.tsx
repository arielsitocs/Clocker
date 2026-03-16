import DayTypes from "./DayTypes"

interface AlarmTypes {
    id: string
    hours: string,
    minutes: string,
    weekDays?: ['L', 'M', 'X', 'J', 'V', 'S', 'D']
    selectedDays: DayTypes[]
    setSelectedDays?: any
    enabled?: boolean
}

export default AlarmTypes;