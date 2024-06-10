import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header/Header';
import { ActionsContextProvider } from '../../context/ActionsContext/ActionsContextProvider';
import { DatasContextProvider } from '../../context/DatasContext/DatasContextProvider';
import Layout from '../../layout/layout';
import SettingsModal from '../../components/SettigsModal/SettingsModal';
import AddTaskModal from '../../components/AddTaskModal/AddTaskModal';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import TaskComponent from '../../components/TaskComponent/TaskComponent';
import axios from 'axios';

export default function PomofucPage() {
    const { pomoFocusTime, setPomoFocusTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime } = useContext(DatasContextProvider);
    const [tempDatas, setTempDatas] = useState([]);

    useEffect(() => {
        const fetchTaskDatas = async () => {
            const datas = await axios.get('http://localhost:5000/user/task/get')
                .then((res) => {
                    let temp = [];
                    temp.push(res.data.tasks)
                    setTempDatas(temp);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

        fetchTaskDatas;
    }, [])

    const { active, ActiveHandler, setOpenAddTaskModal } = useContext(ActionsContextProvider);
    const [timerState, setTimerState] = useState("Start");
    const [timerId, setTimerId] = useState(null);

    const TimeStartHandler = () => {
        setTimerState("Pause");
        const timer = setInterval(() => {
            switch (active) {
                case 1:
                    setPomoFocusTime((pomoFocusTime) => {
                        if (pomoFocusTime === 0) {
                            setTimerState("Start");
                            setPomoFocusTime(pomoFocusTime);
                            clearInterval(timer);
                            return 0;
                        } else {
                            console.log(pomoFocusTime);
                            return pomoFocusTime - 1;
                        }
                    });
                    break;
                case 2:
                    setShortBreakTime((shortBreakTime) => {
                        if (shortBreakTime === 0) {
                            setTimerState("Start");
                            setShortBreakTime(shortBreakTime);
                            clearInterval(timer);
                            return 0;
                        } else {
                            return shortBreakTime - 1;
                        }
                    });
                    break;
                case 3:
                    setLongBreakTime((longBreakTime) => {
                        if (longBreakTime === 0) {
                            setTimerState("Start");
                            setLongBreakTime(longBreakTime);
                            clearInterval(timer);
                            return 0;
                        } else {
                            return longBreakTime - 1;
                        }
                    });
                    break;
                default:
                    break;
            }
        }, 1000);
        setTimerId(timer);
    };


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
            default:
                break;
        }
    };


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

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className={`transition-colors ease-in-out ${active === 1 && 'bg-[#BA4949]'} ${active === 2 && 'bg-[#38858A]'} ${active === 3 && 'bg-[#397097]'} h-full`}>
            <Header />
            <SettingsModal />
            <AddTaskModal />
            <div className="max-w-2xl mx-auto bg-gray-800 h-[1px]">
                <div className="h-full bg-gray-50" />
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

            <div className="max-w-lg pb-10 mx-auto justify-center items-center">

                <p className='text-center text-xl my-4'>Time to focus!</p>

                <div className="flex items-center justify-between border-b pb-4 mb-8">
                    <h1 className='text-xl font-semibold'>Tasks</h1>
                    <Menu as="div" className="relative ml-3">
                        <MenuButton className="rounded-md p-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                            </svg>
                        </MenuButton>
                        <Transition
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <MenuItem>
                                    {({ focus }) => (
                                        <li
                                            className={classNames(focus ? 'bg-gray-100' : '', 'cursor-pointer px-4 py-2 flex text-sm items-center gap-x-2 text-gray-700')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                            </svg>
                                            Clear finished tasks
                                        </li>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <li
                                            onClick={() => alert('Please login to use the template feature.')}
                                            className={classNames(focus ? 'bg-gray-100' : '', 'cursor-pointer px-4 py-2 flex text-sm items-center gap-x-2 text-gray-700')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                                                <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
                                            </svg>
                                            Use template
                                        </li>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {({ focus }) => (
                                        <li
                                            className={classNames(focus ? 'bg-gray-100' : '', 'cursor-pointer px-4 py-2 flex text-sm items-center gap-x-2 text-gray-700')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                            </svg>
                                            Clear all tasks
                                        </li>
                                    )}
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>
                </div>

                {/* Mapping datas */}

                {tempDatas.map((data, i) => (
                    data.title &&
                    (<div
                        className="my-2"
                        key={i + 1}
                    >
                        <TaskComponent
                            id={i + 1}
                            title={data.title}
                            description={data.description}
                        />
                    </div>)
                ))}

                {/* add task button */}

                <button onClick={() => setOpenAddTaskModal(true)} className='mt-8 text-lg flex items-center justify-center gap-x-3 py-4 border-2 border-gray-400 rounded-md border-dashed w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                    Add Task
                </button>
            </div>
        </div>
    );
}
