"use client"

import { useState, useEffect } from "react"

export default function Alarms() {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isCounting, setIsCounting] = useState(false);


    // Funcion de formateo para digitos menores a 10 //
    const formatTwoDigits = (value: number) => String(value).padStart(2, "0");

    const restartCounter = () => {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }

    const toggleCronometer = () => {
        setIsCounting(!isCounting);
    }


    useEffect(() => {
        // Si isCounting es falso no se hace nada //
        if (isCounting === false) return;

        // Si el temporizador llega a cero por completo se detiene //
        if (hours === 0 && minutes === 0 && seconds === 0) {
            setIsCounting(false);
            return; 
        }

        const timerId = setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1); // Resta 1 segundo //
            } else {
                if (minutes > 0) {
                    setMinutes(minutes - 1); // Resta 1 minuto //
                    setSeconds(59); // Reinicia los segundos a 59 //
                } else {
                    if (hours > 0) {
                        setHours(hours - 1); // Resta 1 hora //
                        setMinutes(59); // Reinicia los minutos a 59 //
                        setSeconds(59); // Reinicia los segundos a 59 //
                    }
                }
            }
        }, 1000);

        // Limpiamos el timeout anterior antes de crear el nuevo (evita colapsos) // 
        return () => clearTimeout(timerId);

        // Se vuelve a ejecutar el codigo cada vez que una de estas variables cambie //
    }, [isCounting, seconds, minutes, hours]);
    return (
        <div className="flex flex-col mb-auto h-full">
            <h1 className="text-white text-center text-[clamp(24px,5vw,30px)]">Temporizador</h1>
            <main className="flex flex-col justify-center items-center h-full">
                <div className="flex flex-col justify-center items-center text-white">
                    <h2 className="mb-4 font-medium text-[clamp(16px,4vw,18px)]">Establecer Temporizador</h2>
                    <div className="flex gap-2 font-semibold">
                        <div className="flex flex-col justify-center items-center">
                            <input type="text" placeholder="00" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="p-4 w-[70px] sm:w-[100px] text-center text-[clamp(20px,4vw,24px)] rounded-[15px] bg-page-background" />
                            <h3 className="mt-2 text-secondary-text text-[clamp(14px,2vw,16px)]">Horas</h3>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <input type="text" placeholder="00" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="p-4 w-[70px] sm:w-[100px] text-center text-[clamp(20px,4vw,24px)] rounded-[15px] bg-page-background" />
                            <h3 className="mt-2 text-secondary-text text-[clamp(14px,2vw,16px)]">Minutos</h3>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <input type="text" placeholder="00" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className="p-4 w-[70px] sm:w-[100px] text-center text-[clamp(20px,4vw,24px)] rounded-[15px] bg-page-background" />
                            <h3 className="mt-2 text-secondary-text text-[clamp(14px,2vw,16px)]">Segundos</h3>
                        </div>
                    </div>
                </div>
                <div className="w-[90%] md:w-[70%] mt-10">
                    <div className="flex justify-center rounded-[10px] p-2 bg-page-background">
                        <span className="text-white font-semibold text-[clamp(30px,7vw,35px)]">{formatTwoDigits(hours)}:{formatTwoDigits(minutes)}:{formatTwoDigits(seconds)}</span>
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