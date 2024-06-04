import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header';
import { ActionsContextProvider } from '../context/ActionsContext/ActionsContextProvider';

export default function Layout() {
    const { active, ActiveHandler } = useContext(ActionsContextProvider);
    
    return (
        <div>
            <Header />
            <div className="max-w-lg h-96 mx-auto justify-center items-center my-12 rounded-lg"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
                <div className="max-w-sm text-center mx-auto py-10">
                    <ul className='flex justify-center cursor-pointer items-center'>
                        <li
                            onClick={() => ActiveHandler(1)}
                            className={`${active === 1 ? 'bg-[#ffffff4a] py-1 px-4 rounded-md' : 'py-1 px-4'} transition-all ease-in-out`}
                        >
                            Pomodoro
                        </li>
                        <li
                            onClick={() => ActiveHandler(2)}
                            className={`${active === 2 ? 'bg-[#ffffff4a] py-1 px-4 rounded-md' : 'py-1 px-4'} transition-all ease-in-out`}
                        >
                            Short Break
                        </li>
                        <li
                            onClick={() => ActiveHandler(3)}
                            className={`${active === 3 ? 'bg-[#ffffff4a] py-1 px-4 rounded-md' : 'py-1 px-4'} transition-all ease-in-out`}
                        >
                            Long Break
                        </li>
                    </ul>
                </div>
                <div className="">
                    <div className="flex">
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}
