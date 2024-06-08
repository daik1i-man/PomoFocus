import React, { useContext } from 'react'
import { DatasContextProvider } from '../context/DatasContext/DatasContextProvider';
import { ActionsContextProvider } from '../context/ActionsContext/ActionsContextProvider';

export default function Layout() {
    const { pomoFocusTime, shortBreakTime, longBreakTime } = useContext(DatasContextProvider);
    const { active } = useContext(ActionsContextProvider);

    let minute = Math.floor(pomoFocusTime / 60);
    let second = Math.floor(pomoFocusTime % 60);

    switch (active) {
        case 1:
            minute = Math.floor(pomoFocusTime / 60);
            second = Math.floor(pomoFocusTime % 60);
            break;
        case 2:
            minute = Math.floor(shortBreakTime / 60);
            second = Math.floor(shortBreakTime % 60);
            break;
        case 3:
            minute = Math.floor(longBreakTime / 60);
            second = Math.floor(longBreakTime % 60);
            break;
    }

    return (
        <>
            {
                (active === 1) && (
                    <h1 className='text-9xl font-bold'>{`${`${minute}`.padStart(2, 0)} : ${`${second}`.padStart(2, 0)}`}</h1>
                ) || (active === 2) && (
                    <h1 className='text-9xl font-bold'>{`${`${minute}`.padStart(2, 0)} : ${`${second}`.padStart(2, 0)}`}</h1>
                ) || (active === 3) && (
                    <h1 className='text-9xl font-bold'>{`${`${minute}`.padStart(2, 0)} : ${`${second}`.padStart(2, 0)}`}</h1>
                )
            }
        </>
    )
}
