"iuse client"

import Image from "next/image"

import { useState } from "react";

import Day from "./ui/Day";

import ArrowUp from "@/public/arrow_up.svg";
import ArrowDown from "@/public/arrow_down.svg";
import DayTypes from "../types/DayTypes";
import AlarmTypes from "../types/AlarmTypes";

export default function EditAlarm({ id, hours, minutes, state, setState, selectedDays, setSelectedDays }: any) {
    const [newHours, setNewHours] = useState(hours);
    const [newMinutes, setNewMinutes] = useState(minutes);
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
        const nextHour = (Number(newHours) + 1);
        if (Number(newHours) === 24) {
            setNewHours("00")
        } else {
            setNewHours(formatTwoDigits(nextHour));
        }
    }

    // Agrega minutos y reinicia el contador si sobrepasa el 60 //
    const addMinutes = () => {
        const nextMinute = (Number(newMinutes) + 1);
        if (Number(newMinutes) === 60) {
            setNewMinutes("00")
        } else {
            setNewMinutes(formatTwoDigits(nextMinute));
        }
    }

    // Resta horas y reinicia el contador si sobrepasa el 00 //
    const removeHours = () => {
        const previousHour = (Number(newHours) - 1);
        if (Number(newHours) === 0) {
            setNewHours("24")
        } else {
            setNewHours(formatTwoDigits(previousHour));
        }
    }

    // Resta horas y reinicia el contador si sobrepasa el 00 //
    const removeMinutes = () => {
        const previousMinute = (Number(newMinutes) - 1);
        if (Number(newMinutes) === 0) {
            setNewMinutes("60")
        } else {
            setNewMinutes(formatTwoDigits(previousMinute));
        }
    }

    // Funcion que maneja añadir o eliminar los dias selccionados //
    const addSelectedDay = (day: DayTypes) => {
        // Verificamos si el día ya existe dentro del arreglo
        const isSelected = localDays.some((d) => d.id === day.id);

        if (!isSelected) {
            // Si no estaba seleccionado, se agrega al arreglo
            localSetDays([...localDays, day]);
        } else {
            // Si ya estaba seleccionado, se filtra para sacarlo del arreglo
            const newList = localDays.filter((d) => d.id !== day.id);
            localSetDays(newList);
        }
    }

    const editAlarm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const localAlarms = localStorage.getItem("alarms_list");

        // Se desempaquetan las alarmas frescas //
        const alarmsArray = localAlarms ? JSON.parse(localAlarms) : [];

        // Creamos la lista actualizada mapeando cada alarma //
        const updatedList = alarmsArray.map((alarm: AlarmTypes) => {
            // Si es la alarma que queremos editar, la actualizamos //
            if (alarm.id === id) {
                return {
                    ...alarm, // Se mantienen su ID original y su estado enabled intactos //
                    hours: newHours, // Sobreescribimos la hora //
                    minutes: newMinutes, // Sobreescribimos los minutos //
                    selectedDays: localDays // Sobreescribimos los dias //
                };
            }

            return alarm;
        });

        // Guardamos la lista completa en la base de datos local //
        localStorage.setItem("alarms_list", JSON.stringify(updatedList));

        setState(false);
        window.location.reload();
    }

    const deleteAlarm = () => {
        const localAlarms = localStorage.getItem("alarms_list");

        // Se desempaquetan las alarmas frescas //
        const alarmsArray = localAlarms ? JSON.parse(localAlarms) : [];

        const newArray = alarmsArray.filter((alarm: AlarmTypes) => alarm.id !== id);

        console.log(newArray)

        localStorage.setItem("alarms_list", JSON.stringify(newArray));

        setState(false);
        window.location.reload();
    }

    if (state === false) return null;

    return (
        <div className="flex flex-col justify-center items-center w-[95%] max-w-[500px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-3 rounded-[5px] bg-gray-background">
            <h1 className="text-white text-[clamp(18px,4vw,22px)] mb-5">Modificar Alarma</h1>
            <form onSubmit={editAlarm} className="text-white w-full">
                <div className="flex justify-center items-center gap-5 mb-5">
                    <div className="flex flex-col justify-center items-center font-semibold gap-3">
                        <Image src={ArrowUp} width={32} height={32} alt="Arrow Up Icon" className="hover:scale-120 cursor-pointer" onClick={addHours} />
                        <input type="text" placeholder="03" className="bg-page-background w-[100px] p-4 text-[clamp(20px,4vw,24px)] text-center rounded-[20px]" value={newHours} onChange={(e) => setNewHours(e.target.value)} />
                        <Image src={ArrowDown} width={32} height={32} alt="Arrow Down Icon" className="hover:scale-120 cursor-pointer" onClick={removeHours} />
                    </div>
                    <h1 className="text-[clamp(30px,5vw,35px)] font-bold">:</h1>
                    <div className="flex flex-col justify-center items-center font-semibold gap-3">
                        <Image src={ArrowUp} width={32} height={32} alt="Arrow Up Icon" className="hover:scale-120 cursor-pointer" onClick={addMinutes} />
                        <input type="text" placeholder="00" className="bg-page-background w-[100px] p-4 text-[clamp(20px,4vw,24px)] text-center rounded-[20px]" value={newMinutes} onChange={(e) => setNewMinutes(e.target.value)} />
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
                    <button type="button" className="w-[33%] p-3 rounded-[5px] bg-light-red hover:translate-y-[-5px] hover:opacity-75 cursor-pointer transition-all" onClick={deleteAlarm}>Eliminar</button>
                    <button type="button" className="w-[33%] p-3 rounded-[5px] bg-page-background hover:translate-y-[-5px] hover:opacity-75 cursor-pointer transition-all" onClick={() => setState(false)}>Cerrar</button>
                    <button type="submit" className="w-[33%] p-3 rounded-[5px] bg-blue hover:translate-y-[-5px] hover:opacity-75 cursor-pointer transition-all">Modificar</button>
                </div>
            </form>
        </div>
    );
}