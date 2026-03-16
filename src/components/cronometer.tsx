"use client"

import { useState, useEffect } from "react"

export default function Alarms() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [miliSeconds, setMiliSeconds] = useState(0);
    const [isCounting, setIsCounting] = useState(false);

    // Funcion de formateo para digitos menores a 10 //
    const formatTwoDigits = (value: number) => String(value).padStart(2, "0");

    // Logica base del cronometro //
    useEffect(() => {
        // Si isCounting es falso no se hace nada //
        if (isCounting == false) return;

        const timerId = setTimeout(() => {
            if (miliSeconds === 99) {
                setMiliSeconds(0); // Se reinician milisegundos a 0 //

                if (seconds === 59) {
                    setSeconds(0); // Se reinician segundos a 0 //
                    setMinutes(minutes + 1); // Suma 1 minuto //
                } else {
                    setSeconds(seconds + 1); // Suma 1 segundo //
                }
            } else {
                setMiliSeconds(miliSeconds + 1); // Sumamos 1 milisegundo //
            }
        }, 10);

        // Limpiamos el timeout anterior antes de crear el nuevo (evita colapsos)
        return () => clearTimeout(timerId);

        // Se vuelve a ejecutar el codigo cada vez que una de estas variables cambie //
    }, [isCounting, miliSeconds, seconds, minutes]);

    const toggleCronometer = () => {
        setIsCounting(!isCounting);
    }

    const restartCounter = () => {
        setMinutes(0);
        setSeconds(0);
        setMiliSeconds(0);
    }

    return (
        <div className="flex flex-col mb-auto h-full">
            <h1 className="text-white text-center text-[clamp(24px,5vw,30px)]">Cronómetro</h1>
            <main className="flex flex-col justify-center items-center h-full">
                <div className="w-[95%] md:w-[75%]">
                    <div className="flex justify-center rounded-[10px] p-2 bg-page-background">
                        <span className="text-white font-semibold text-[clamp(30px,7vw,35px)]">{formatTwoDigits(minutes)}:{formatTwoDigits(seconds)}.{formatTwoDigits(miliSeconds)}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-3 mt-5">
                        <button className="text-white text-[clamp(14px,3vw,16px)] font-medium sm:w-[50%] py-3 rounded-[5px] bg-page-background hover:translate-y-[-5px] hover:opacity-75 hover:cursor-pointer transition-all" onClick={restartCounter}>Reestablecer</button>
                        <button className={`text-white text-[clamp(14px,3vw,16px)] font-medium sm:w-[50%] py-3 rounded-[5px] ${isCounting ? 'bg-light-red' : 'bg-blue'} hover:translate-y-[-5px] hover:opacity-75 hover:cursor-pointer transition-all`} onClick={toggleCronometer}>{isCounting ? 'Detener' : 'Iniciar'}</button>
                    </div>
                </div>
            </main>
        </div>
    )
}