import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header';
import { ActionsContextProvider } from '../../context/ActionsContext/ActionsContextProvider';
import { DatasContextProvider } from '../../context/DatasContext/DatasContextProvider';
import Layout from '../../layout/layout';
import SettingsModal from '../../components/SettigsModal/SettingsModal';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';

export default function PomofucPage() {
    const {
        pomoFocusTime,
        setPomoFocusTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime,
    } = useContext(DatasContextProvider);


    const { active, ActiveHandler, setOpenAddTaskModal } = useContext(ActionsContextProvider);
    const [timerState, setTimerState] = useState("Start");
    const [progress, setProgress] = useState(0);
    const [timerId, setTimerId] = useState(null);

    const TimeStartHandler = () => {
        setTimerState("Pause");
        const timer = setInterval(() => {
            switch (active) {
                case 1:
                    setPomoFocusTime((pomoFocusTime) => {
                        if (pomoFocusTime === 0) {
                            setTimerState("Start");
                            setPomoFocusTime(totalTime);
                            clearInterval(timer);
                            return 0;
                        } else {
                            return pomoFocusTime - 1;
                        };
                    })
                    break;
                case 2:
                    setShortBreakTime((shortBreakTime) => {
                        if (shortBreakTime === 0) {
                            setTimerState("Start");
                            setShortBreakTime(totalTime);
                            clearInterval(timer);
                            return 0;
                        } else {
                            return shortBreakTime - 1;
                        };
                    })
                    break;
                case 3:
                    setLongBreakTime((longBreakTime) => {
                        if (longBreakTime === 0) {
                            setTimerState("Start");
                            setShortBreakTime(totalTime);
                            clearInterval(timer);
                            return 0;
                        } else {
                            return longBreakTime - 1;
                        };
                    })
                    break;
            }
        }, 1000)
        setTimerId(timer);
    }


    const PauseTimerHandler = () => {
        setTimerState("Continue");
        clearInterval(timerId);
    }

    const RestartTimerHandler = () => {
        setTimerState("Start");
        clearInterval(timerId);
        switch (active) {
            case 1:
                setPomoFocusTime(pomoFocusTime);
                break;
            case 2:
                setShortBreakTime(shortBreakTime);
                break;
            case 3:
                setLongBreakTime(longBreakTime);
                break;
        }
    }

    const PomodoroActiveHandler = (value) => {
        ActiveHandler(value)
        RestartTimerHandler();
    }

    const ShortBreakActiveHandler = (value) => {
        ActiveHandler(value)
        RestartTimerHandler();
    }

    const LongBreakActiveHandler = (value) => {
        ActiveHandler(value)
        RestartTimerHandler();
    }

    return (
        <div className={`transition-colors ease-in-out ${active === 1 && 'bg-[#BA4949]'} ${active === 2 && 'bg-[#38858A]'} ${active === 3 && 'bg-[#397097]'} h-screen`}>
            <Header />
            <SettingsModal />
            <AddTaskModal />
            <div className="max-w-2xl mx-auto bg-gray-800 h-[1px]">
                <div className={`${progress <= 0 ? 'w-0' : `w-[${progress}%]`} h-full bg-gray-50`} />
            </div>
            <div className="max-w-lg h-96 mx-auto justify-center items-center my-12 rounded-lg"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
                <div className="max-w-sm text-center mx-auto py-10">
                    <ul className='flex justify-center cursor-pointer items-center'>
                        <li
                            onClick={() => PomodoroActiveHandler(1)}
                            className={`${active === 1 ? 'bg-[#ffffff4a] py-1 px-4 rounded-md' : 'py-1 px-4'} transition-all ease-in-out`}
                        >
                            Pomodoro
                        </li>
                        <li
                            onClick={() => ShortBreakActiveHandler(2)}
                            className={`${active === 2 ? 'bg-[#ffffff4a] py-1 px-4 rounded-md' : 'py-1 px-4'} transition-all ease-in-out`}
                        >
                            Short Break
                        </li>
                        <li
                            onClick={() => LongBreakActiveHandler(3)}
                            className={`${active === 3 ? 'bg-[#ffffff4a] py-1 px-4 rounded-md' : 'py-1 px-4'} transition-all ease-in-out`}
                        >
                            Long Break
                        </li>
                    </ul>
                </div>

                {/* Timer */}

                <div className="">
                    <div className="text-center justify-center">
                        <Layout />
                        <div className="flex items-center my-12 justify-center space-x-5 mx-auto">
                            {timerState === 'Pause' ? (
                                <button
                                    onClick={PauseTimerHandler}
                                    className='uppercase font-bold bg-gray-50 py-3 rounded-md text-[#BA4949] text-3xl px-16'
                                >
                                    {timerState}
                                </button>
                            ) : (
                                <button
                                    onClick={TimeStartHandler}
                                    className='uppercase font-bold bg-gray-50 py-3 rounded-md text-[#BA4949] text-3xl px-16'
                                >
                                    {timerState}
                                </button>
                            )}
                            {(timerState === 'Pause' || timerState === 'Continue') &&
                                <svg onClick={RestartTimerHandler} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                </svg>
                            }
                        </div>
                    </div>
                </div>

            </div>

            {/* Tasks list */}


            <div className="max-w-lg mx-auto justify-center items-center">

                <p className='text-center text-xl my-4'>Time to focus!</p>

                <div className="flex items-center justify-between border-b pb-4">
                    <h1 className='text-xl font-semibold'>Tasks</h1>
                    <button className='bg-[#ffffff4a] rounded-sm p-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                </div>
                <button onClick={() => setOpenAddTaskModal(true)} className='text-lg flex items-center justify-center gap-x-3 py-4 border-2 border-gray-400 my-9 rounded-md border-dashed w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                    Add Task
                </button>
            </div>
            <Outlet />
        </div>
    )
}
