import Image from "next/image"

import type AlarmTypes from "@/src/types/AlarmTypes"

import CheckIcon from '@/public/check_icon.svg';

import { useState } from "react";

import EditAlarm from "../edit_alarm";
import WeekDays from "./WeekDays";

export default function Alarm({ id, hours, minutes, enabled, selectedDays, setSelectedDays }: AlarmTypes) {

    const [isAlarmEnabled, setIsAlarmEnabled] = useState(enabled);
    const [isEditing, setIsEditing] = useState(false);

    const toggleEnabled = () => {
        // Cambiamos el estado visual inmediatamente para que el usuario sienta la respuesta rapida //
        setIsAlarmEnabled(!isAlarmEnabled);

        // Se obtienen las alarmas del local actuales //
        const localAlarms = localStorage.getItem("alarms_list");
        // Se desempaquetan las alarmas para poder usar funciones de array //
        const alarmsArray = localAlarms ? JSON.parse(localAlarms) : [];

        // Creamos una copia actualizada de toda la lista de alarmas //
        const updatedList = alarmsArray.map((alarm: AlarmTypes) => {
            // Si encontramos la alarma a la que hicimos clic, se invierte el valor de enabled //
            if (alarm.id === id) {
                return { ...alarm, enabled: !alarm.enabled };
            }
            // Si es cualquier otra alarma se deja intacta //
            return alarm;
        });

        // Guardamos la lista completa y corregida de vuelta en localstorage //
        localStorage.setItem("alarms_list", JSON.stringify(updatedList));
    }

    return (
        <>
            <div className="flex items-center p-2 rounded-[10px] bg-light-gray-background font-medium text-white border-2 border-light-gray-background hover:border-white hover:cursor-pointer transition-all" onClick={() => setIsEditing(true)}>
                <div>
                    <span className="font-light text-[clamp(18px,4vw,24px)]">{`${hours}:${minutes}`}</span>
                </div>
                <div className="flex gap-2 ml-auto text-[clamp(11px,2.5vw,14px)]">
                    <WeekDays selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
                </div>
                <div>
                    <button className={`rounded-full p-1 ml-4 hover:cursor-pointer hover:scale-115 transition-all ${isAlarmEnabled ? 'bg-green' : 'bg-page-background'}`} onClick={(e) => { e.stopPropagation(); toggleEnabled(); }}>
                        <Image src={CheckIcon} width={28} height={28} alt="Check Icon" />
                    </button>
                </div>
            </div>
            <EditAlarm id={id} hours={hours} minutes={minutes} state={isEditing} setState={setIsEditing} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        </>
    )
}