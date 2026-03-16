"use client"

import { useState, useEffect } from "react";

import DayTypes from "@/src/types/DayTypes";

export default function Day({ id, day, selected, selectedDays, setSelectedDays }: DayTypes) {
    const [isSelected, setIsSelected] = useState(selected);

    const checkDaySelected = (day: string) => {
        console.log(selectedDays)
        const isTrue = selectedDays.some((d: DayTypes) => day === d.day)

        if (isTrue) {
            setIsSelected(true)
        }
    }

    useEffect(() => {
        checkDaySelected(day);
    }, []);


    const handleIsSelected = () => {
        setIsSelected(!isSelected);
    }

    return (
        <h1 className={`w-10 h-10 flex justify-center items-center rounded-full ${isSelected ? 'bg-blue border-2 border-white' : 'bg-page-background'} hover:bg-blue cursor-pointer`}
            onClick={handleIsSelected}>{day}</h1>
    )
}