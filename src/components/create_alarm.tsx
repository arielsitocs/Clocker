"iuse client"

import Image from "next/image"

import { useState } from "react";

import Day from "./ui/Day";

import ArrowUp from "@/public/arrow_up.svg";
import ArrowDown from "@/public/arrow_down.svg";
import DayTypes from "../types/DayTypes";
import AlarmTypes from "../types/AlarmTypes";

export default function CreateAlarm({ state, setState, selectedDays, setSelectedDays }: any) {
    const [hours, setHours] = useState("03");
    const [minutes, setMinutes] = useState("00");
    const [localDays, localSetDays] = useState<DayTypes[]>(selectedDays)

    const days = [
        {
            id: 1,
            day: 'L'
        },
        {
            id: 2,
            day: 'M'
        },
        {
            id: 3,
            day: 'X'
        },
        {
            id: 4,
            day: 'J'
        },
        {
            id: 5,
            day: 'V'
        },
        {
            id: 6,
            day: 'S'
        },
        {
            id: 7,
            day: 'D'
        }
    ]

    // Funcion que toma el valor como numero, lo convierte a string y agrega un 0 antes del digito si el numero no tiene mas de 1 digito //
    const formatTwoDigits = (value: number) => String(value).padStart(2, "0");

    // Agrega horas y reinicia el contador si sobrepasa el 24 //
    const addHours = () => {
        const nextHour = (Number(hours) + 1);
        if (Number(hours) === 24) {
            setHours("00")
        } else {
            setHours(formatTwoDigits(nextHour));
        }
    }

    // Agrega minutos y reinicia el contador si sobrepasa el 60 //
    const addMinutes = () => {
        const nextMinute = (Number(minutes) + 1);
        if (Number(minutes) === 60) {
            setMinutes("00")
        } else {
            setMinutes(formatTwoDigits(nextMinute));
        }
    }

    // Resta horas y reinicia el contador si sobrepasa el 00 //
    const removeHours = () => {
        const previousHour = (Number(hours) - 1);
        if (Number(hours) === 0) {
            setHours("24")
        } else {
            setHours(formatTwoDigits(previousHour));
        }
    }

    // Resta horas y reinicia el contador si sobrepasa el 00 //
    const removeMinutes = () => {
        const previousMinute = (Number(minutes) - 1);
        if (Number(minutes) === 0) {
            setMinutes("60")
        } else {
            setMinutes(formatTwoDigits(previousMinute));
        }
    }

    // Funcion que maneja añadir o eliminar los dias selccionados //
    const addSelectedDay = (day: DayTypes) => {
        // Verificamos si el día ya existe dentro del arreglo
        const isSelected = localDays.some((d) => d.id === day.id);

        if (!isSelected) {
            // Si no estaba seleccionado, se agrega al arreglo
            setSelectedDays([...selectedDays, day]);
        } else {
            // Si ya estaba seleccionado, se filtra para sacarlo del arreglo
            const newList = localDays.filter((d) => d.id !== day.id);
            setSelectedDays(newList);
        }
    }

    const createAlarm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newAlarmData: AlarmTypes = {
            id: crypto.randomUUID(),
            hours: hours,
            minutes: minutes,
            selectedDays: selectedDays
        }

        // Leer las alarmas guardadas desde el localstorage //
        const savedAlarms = localStorage.getItem('alarms_list');

        // Si ya había alarmas se desempaquetan. Si no se crea un arreglo vacio //
        const currentList = savedAlarms ? JSON.parse(savedAlarms) : [];

        // Empujamos la nueva alarma al final de esa lista histórica //
        currentList.push(newAlarmData);

        // Guardamos la lista completa y actualizada de vuelta en el navegador //
        localStorage.setItem('alarms_list', JSON.stringify(currentList));

        setState(false);
        window.location.reload();
    }

    if (state === false) return null;

    return (
        <div className="flex flex-col justify-center items-center w-[95%] max-w-[500px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-3 rounded-[5px] bg-gray-background">
            <h1 className="text-white text-[clamp(18px,4vw,22px)] mb-5">Establecer Hora</h1>
            <form onSubmit={createAlarm} className="text-white w-full">
                <div className="flex justify-center items-center gap-5 mb-5">
                    <div className="flex flex-col justify-center items-center font-semibold gap-3">
                        <Image src={ArrowUp} width={32} height={32} alt="Arrow Up Icon" className="hover:scale-120 cursor-pointer" onClick={addHours} />
                        <input type="text" placeholder="03" className="bg-page-background w-[100px] p-4 text-[clamp(20px,4vw,24px)] text-center rounded-[20px]" value={hours} onChange={(e) => setHours(e.target.value)} />
                        <Image src={ArrowDown} width={32} height={32} alt="Arrow Down Icon" className="hover:scale-120 cursor-pointer" onClick={removeHours} />
                    </div>
                    <h1 className="text-[clamp(30px,5vw,35px)] font-bold">:</h1>
                    <div className="flex flex-col justify-center items-center font-semibold gap-3">
                        <Image src={ArrowUp} width={32} height={32} alt="Arrow Up Icon" className="hover:scale-120 cursor-pointer" onClick={addMinutes} />
                        <input type="text" placeholder="00" className="bg-page-background w-[100px] p-4 text-[clamp(20px,4vw,24px)] text-center rounded-[20px]" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
                        <Image src={ArrowDown} width={32} height={32} alt="Arrow Down Icon" className="hover:scale-120 cursor-pointer" onClick={removeMinutes} />
                    </div>
                </div>
                <div className="flex justify-center items-center text-white text-[clamp(16px,3vw,19px)] font-semibold gap-3">
                    {days.map((day) => (
                        <span key={day.id} onClick={() => addSelectedDay(day)}>
                            <Day key={day.id} id={day.id} day={day.day} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                        </span>
                    ))}
                </div>
                <div className="flex justify-center items-center mt-5 gap-3 font-semibold">
                    <button type="button" className="w-[40%] p-3 rounded-[5px] bg-page-background hover:translate-y-[-5px] hover:opacity-75 cursor-pointer transition-all" onClick={() => setState(false)}>Cerrar</button>
                    <button type="submit" className="w-[40%] p-3 rounded-[5px] bg-blue hover:translate-y-[-5px] hover:opacity-75 cursor-pointer transition-all">Establecer</button>
                </div>
            </form>
        </div>
    );
}