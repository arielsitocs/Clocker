import { useState, useEffect } from "react";

import axios from "axios";

import Timezone from "./ui/Timezone"

import Loader from "./ui/Loader";

export default function WorldClock() {
    const [timezones, setTimezones] = useState<any[]>([]);
    const [userTimezone, setUserTimezone] = useState<any>('');
    const [loading, setLoading] = useState(false);

    const formatDate = (date: string) => {
        const resultDate = new Date(date);
        return resultDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Funcion que extrae y formatea la hora del timezone recibido, ya que solo recibimos los timezones en la otra funcion, no la hora //
    const getTimeForTimezone = (tzString: string) => {
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: tzString,
                hour: '2-digit',
                minute: '2-digit',
            }).format(new Date());
        } catch (error) {
            return ''; // Por si la API manda un texto raro que JS no reconozca //
        }
    }

    // Funcion obtiene todos los timezones desde la API, asi como el horario local del usuario //
    const getTimezones = async () => {
        try {
            setLoading(true);
            const timezones: any = await axios.get('https://time.now/developer/api/timezone');
            const userTimezone: any = await axios.get('https://time.now/developer/api/ip');

            // Se filtran los timezones extraños //
            const cleanZones = timezones.data.filter((tz: string) =>
                tz.includes('/') && !tz.startsWith('Etc/') // Descartamos los que no tienen '/' y la carpeta de sistema 'Etc' //
            );

            if (timezones && userTimezone) {
                setUserTimezone(userTimezone.data);
                setTimezones(cleanZones);
            }
        } catch (error) {
            console.error('Error al obtener los datos: ', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTimezones();
    }, []);

    return (
        <>
            <div className="flex flex-col mb-auto h-full">
                <h1 className="text-white text-center text-[clamp(24px,5vw,30px)]">Reloj Mundial</h1>
                <main className="flex flex-col items-center h-full">
                    <div className="flex flex-col items-center w-[95%] md:w-[75%] text-white font-semibold mt-10">
                        <h2 className="mb-4 text-center text-[clamp(18px,4vw,20px)]">Horario de {userTimezone.timezone}</h2>
                        <div className="flex justify-center w-full rounded-[10px] p-2 bg-page-background">
                            <span className="text-[clamp(20px,6vw,30px)] rounded-[10px]">{formatDate(userTimezone.datetime)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-[95%] md:w-[75%] rounded-[10px] p-2 max-h-[570px] md:max-h-[500px] overflow-y-auto text-white font-semibold mt-2 bg-page-background gap-3">
                        <div className="w-full">
                            <input type="text" placeholder="Buscar Continente/Ciudad..." className="w-full p-2 text-[clamp(15px,3vw,18px)] rounded-[5px] bg-light-black
                        bg-[url('/search_icon.svg')] bg-no-repeat bg-[left_6px_center] pl-10 bg-[length:32px] font-light" />
                        </div>
                        {
                            loading ?
                                <Loader state={loading} setState={setLoading} />
                                :
                                timezones?.map((tzString: string) => (
                                    <Timezone key={tzString} id={tzString} timezone={tzString} datetime={getTimeForTimezone(tzString)} />
                                ))
                        }
                    </div>
                </main>
            </div>

        </>
    )
}