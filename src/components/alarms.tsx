"use client"

import Image from "next/image";

import { useState, useEffect } from "react";

import Alarm from "./ui/Alarm"

import PlusIcon from '../../public/create_icon.svg';

import AlarmTypes from "../types/AlarmTypes";
import DayTypes from "../types/DayTypes";

import CreateAlarm from "./create_alarm";

export default function Alarms() {
    const [alarms, setAlarms] = useState<AlarmTypes[]>([]);
    const [createAlarmState, setCreateAlarmState] = useState(false);
    const [selectedDays, setSelectedDays] = useState<DayTypes[]>([]);

    // Cargar la lista de alarmas desde el local storage //
    useEffect(() => {
        const localAlarms = localStorage.getItem("alarms_list");

        if (localAlarms) {
            const objectData = JSON.parse(localAlarms);
            setAlarms(objectData);
        }
    }, []);

    return (
        <div className="flex flex-col justify-center mb-auto h-full">
            <h1 className="text-white text-center text-[clamp(24px,5vw,30px)] mb-2">Alarmas</h1>
            <main className="flex flex-col items-center mb-3 h-[95%] rounded-[10px] bg-page-background">
                <div className="flex flex-col w-full h-full max-h-[750px] overflow-y-auto p-2 gap-3">
                    {
                        alarms.length === 0 ? (
                            <div className="flex h-full justify-center items-center">
                                <h1 className="text-secondary-text text-center font-semibold text-[clamp(16px,2vw,19px)] mb-3">No hay alarmas creadas!</h1>
                            </div>
                        ) : (
                            alarms.map((alarm) => (
                                <Alarm key={alarm.id} id={alarm.id} hours={alarm.hours} minutes={alarm.minutes} weekDays={alarm.weekDays} selectedDays={alarm.selectedDays} setSelectedDays={setSelectedDays} enabled={alarm.enabled} />
                            ))
                        )
                    }
                </div>
                <button className="p-2 mb-3 mt-auto bg-light-gray-background rounded-full border-2 border-light-gray-background hover:bg-blue hover:border-white cursor-pointer transition-colors">
                    <Image src={PlusIcon} width={35} height={35} alt="Plus Icon" onClick={() => setCreateAlarmState(true)} />
                </button>
            </main>
            <CreateAlarm state={createAlarmState} setState={setCreateAlarmState} selectedDays={selectedDays} setSelectedDays={setSelectedDays} />
        </div>
    )
}