import { useContext, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { ActionsContextProvider } from '../../context/ActionsContext/ActionsContextProvider'
import { DatasContextProvider } from '../../context/DatasContext/DatasContextProvider';

export default function UpdateTaskModal({ id }) {
    const { openUpdateTaskModal, setOpenUpdateTaskModal } = useContext(ActionsContextProvider);
    const { fakeDatas, setFakeDatas } = useContext(DatasContextProvider);
    const [title, setTitle] = useState(fakeDatas.title);
    const [description, setDescription] = useState(fakeDatas.description);
    const [loading, setLoading] = useState(false);

    const changeDescriptionHandler = (e) => {
        setDescription(e.target.value);
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
    }



    const UpdateTaskHandler = (e) => {
        e.preventDefault();
    }

    return (
        <Transition show={openUpdateTaskModal}>
            <Dialog className="relative z-10" onClose={setOpenUpdateTaskModal}>
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                                <form action="" onSubmit={UpdateTaskHandler}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div>
                                            <input
                                                value={title}
                                                onChange={changeTitleHandler}
                                                type='text'
                                                placeholder='What are you working on ?'
                                                className="w-full bg-gray-50 border-none outline-none py-1.5 px-3 placeholder:text-xl text-gray-900 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div className="text-gray-900 mt-8">
                                            <h1>+ Add note</h1>
                                            <textarea value={description} onChange={changeDescriptionHandler} className='bg-gray-100 my-2 rounded-md w-full mt-4 resize h-16  py-1.5 px-3 outline-none placeholder:opacity-50' placeholder='Some notes...' />
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-gray-900 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 sm:ml-3 sm:w-auto"
                                            onClick={UpdateTaskHandler}
                                        >
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full  justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900  sm:mt-0 sm:w-auto"
                                            onClick={() => setOpenUpdateTaskModal(false)}
                                            data-autofocus
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
