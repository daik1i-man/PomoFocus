import React, { useContext, useEffect, useState } from 'react'
import { DatasContextProvider } from '../context/DatasContext/DatasContextProvider';
import { ActionsContextProvider } from '../context/ActionsContext/ActionsContextProvider';
import axios from 'axios';

export default function Layout() {
    const { active } = useContext(ActionsContextProvider);
    const { datas } = useContext(DatasContextProvider);

    let minute = Math.floor(datas.pomofocus / 60);
    let second = Math.floor(datas.pomofocus % 60);

    switch (active) {
        case 1:
            minute = Math.floor(datas.pomofocus / 60);
            second = Math.floor(datas.pomofocus % 60);
            break;
        case 2:
            minute = Math.floor(datas.short_break / 60);
            second = Math.floor(datas.short_break % 60);
            break;
        case 3:
            minute = Math.floor(datas.long_break / 60);
            second = Math.floor(datas.long_break % 60);
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
