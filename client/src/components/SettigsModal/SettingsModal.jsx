import { useContext, useState, useEffect } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { ActionsContextProvider } from '../../context/ActionsContext/ActionsContextProvider';
import { DatasContextProvider } from '../../context/DatasContext/DatasContextProvider';

export default function SettingsModal() {
    const { openModal, setOpenModal } = useContext(ActionsContextProvider);
    const {
        pomoFocusTime,
        setPomoFocusTime,
        shortBreakTime,
        setShortBreakTime,
        longBreakTime,
        setLongBreakTime,
        ActiveHandler,
        active,
    } = useContext(DatasContextProvider);

    const [initialPomoFocusTime, setInitialPomoFocusTime] = useState(Math.floor(pomoFocusTime / 60));
    const [initialShortBreakTime, setInitialShortBreakTime] = useState(Math.floor(shortBreakTime / 60));
    const [initialLongBreakTime, setInitialLongBreakTime] = useState(Math.floor(longBreakTime / 60));

    useEffect(() => {
        setInitialPomoFocusTime(Math.floor(pomoFocusTime / 60));
        setInitialShortBreakTime(Math.floor(shortBreakTime / 60));
        setInitialLongBreakTime(Math.floor(longBreakTime / 60));
    }, [pomoFocusTime, shortBreakTime, longBreakTime]);

    const handlePomoFocusTimeChange = (e) => {
        setInitialPomoFocusTime(e.target.value);
        setPomoFocusTime(e.target.value * 60);
    };

    const handleShortBreakTimeChange = (e) => {
        setInitialShortBreakTime(e.target.value);
        setShortBreakTime(e.target.value * 60);
    };

    const handleLongBreakTimeChange = (e) => {
        setInitialLongBreakTime(e.target.value);
        setLongBreakTime(e.target.value * 60);
    };

    return (
        <Transition show={openModal}>
            <Dialog className="relative z-10" onClose={() => setOpenModal(false)}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pt-5 text-gray-900">
                                    <div className="flex justify-between items-center">
                                        <div className="border-b-2 py-2 w-8 border-solid border-gray-900">
                                            <h1 className='text-xl'>Settings</h1>
                                        </div>
                                        <svg onClick={() => setOpenModal(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <hr className='mt-4' />

                                    {/* Timer settings */}
                                    <div className="my-8">
                                        <div className="flex space-x-2 my-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <h1 className='font-medium uppercase'>Timer</h1>
                                        </div>
                                        <div className="my-4">
                                            <h1 className='font-medium text-sm'>Time (minutes)</h1>
                                        </div>
                                        <form>
                                            <div className="flex gap-x-4">
                                                <div className="flex flex-col space-y-2">
                                                    <label htmlFor="pomoFocus" className='font-medium text-gray-400'>Pomodoro</label>
                                                    <input
                                                        type="number"
                                                        name="pomoFocus"
                                                        id="pomoFocus"
                                                        value={initialPomoFocusTime}
                                                        onChange={handlePomoFocusTimeChange}
                                                        className="w-full rounded-md py-1.5 px-4 focus:outline-none border bg-gray-50 text-gray-900 ring-gray-300 placeholder:text-gray-400"
                                                    />
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <label htmlFor="shortBreak" className='font-medium text-gray-400'>Short Break</label>
                                                    <input
                                                        type="number"
                                                        name="shortBreak"
                                                        id="shortBreak"
                                                        value={initialShortBreakTime}
                                                        onChange={handleShortBreakTimeChange}
                                                        className="w-full rounded-md py-1.5 px-4 focus:outline-none border bg-gray-50 text-gray-900 ring-gray-300 placeholder:text-gray-400"
                                                    />
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <label htmlFor="longBreak" className='font-medium text-gray-400'>Long Break</label>
                                                    <input
                                                        type="number"
                                                        name="longBreak"
                                                        id="longBreak"
                                                        value={initialLongBreakTime}
                                                        onChange={handleLongBreakTimeChange}
                                                        className="w-full rounded-md py-1.5 px-4 focus:outline-none border bg-gray-50 text-gray-900 ring-gray-300 placeholder:text-gray-400"
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                        <hr className='my-8' />

                                        {/* Themes settings */}
                                        <div className="">
                                            <div className="flex space-x-2 my-4 justify-between">
                                                <div className="flex space-x-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                        <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 0 0-3.471 2.987 10.04 10.04 0 0 1 4.815 4.815 18.748 18.748 0 0 0 2.987-3.472l3.386-5.079A1.902 1.902 0 0 0 20.599 1.5Zm-8.3 14.025a18.76 18.76 0 0 0 1.896-1.207 8.026 8.026 0 0 0-4.513-4.513A18.75 18.75 0 0 0 8.475 11.7l-.278.5a5.26 5.26 0 0 1 3.601 3.602l.502-.278ZM6.75 13.5A3.75 3.75 0 0 0 3 17.25a1.5 1.5 0 0 1-1.601 1.497.75.75 0 0 0-.7 1.123 5.25 5.25 0 0 0 9.8-2.62 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                                                    </svg>
                                                    <h2 className='font-medium uppercase'>Themes</h2>
                                                </div>
                                                <div className="flex space-x-4 justify-center">
                                                    <div onClick={() => ActiveHandler(1)} className="w-8 h-8 bg-[#BA4949] rounded-md cursor-pointer p-1 text-gray-50">
                                                        {active === 1 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                        </svg>}
                                                    </div>
                                                    <div onClick={() => ActiveHandler(2)} className="w-8 h-8 bg-[#38858A] rounded-md cursor-pointer p-1 text-gray-50">
                                                        {active === 2 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                        </svg>}
                                                    </div>
                                                    <div onClick={() => ActiveHandler(3)} className="w-8 h-8 bg-[#397097] rounded-md cursor-pointer p-1 text-gray-50">
                                                        {active === 3 && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                                                        </svg>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* buttons */}
                                        <div className="flex gap-x-4 my-8 -mb-4 items-center justify-end">
                                            <button
                                                onClick={() => setOpenModal(false)}
                                                type="button"
                                                className="inline-flex w-full justify-center border rounded-md px-8 py-2 text-sm font-semibold text-gray-900 shadow-sm sm:w-auto"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:w-auto"
                                                onClick={() => setOpenModal(false)}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
