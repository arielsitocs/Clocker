"use client"

import AlarmIcon from '@/public/alarm_icon.svg';
import CronometerIcon from '@/public/cronometer_icon.svg';
import TemporizerIcon from '@/public/temporizer_icon.svg';
import WorldClockIcon from '@/public/world_clock_icon.svg';

// import NavigationTypes from '@/src/types/NavigationTypes';

import Image from 'next/image';

import Alarms from "../components/alarms";
import Cronometer from "../components/cronometer";
import WorldClock from "../components/world_clock";
import Temporizer from "../components/temporizer";

export default function Navigation({ section, setSection }: any)  {
    return (
        <nav className='flex justify-center w-full items-center text-[clamp(10px,2.2vw,12px)] gap-5 sm:gap-8 p-0.5 bg-black-gray-background color-white rounded-full'>
            <div className='text-white font-semibold p-2 rounded-[5px] hover:cursor-pointer hover:bg-gray-background' onClick={() => setSection(<Alarms />)}>
                <div className='flex justify-center'>
                    <Image src={AlarmIcon} width={28} height={28} alt='Alarm Icon' />
                </div>
                <h2 className='hidden sm:block'>Alarmas</h2>
            </div>
            <div className='text-white font-semibold p-2 rounded-[5px] hover:cursor-pointer hover:bg-gray-background' onClick={() => setSection(<Cronometer />)}>
                <div className='flex justify-center'>
                    <Image src={CronometerIcon} width={28} height={28} alt='Alarm Icon' />
                </div>
                <h2 className='hidden sm:block'>Cronometro</h2>
            </div>
            <div className='text-white font-semibold p-2 rounded-[5px] hover:cursor-pointer hover:bg-gray-background' onClick={() => setSection(<WorldClock />)}>
                <div className='flex justify-center'>
                    <Image src={WorldClockIcon} width={28} height={28} alt='Alarm Icon' />
                </div>
                <h2 className='hidden sm:block'>Reloj Mundial</h2>
            </div>
            <div className='text-white font-semibold p-2 rounded-[5px] hover:cursor-pointer hover:bg-gray-background' onClick={() => setSection(<Temporizer />)}>
                <div className='flex justify-center'>
                    <Image src={TemporizerIcon} width={28} height={28} alt='Alarm Icon' />
                </div>
                <h2 className='hidden sm:block'>Temporizador</h2>
            </div>
        </nav>
    )
}