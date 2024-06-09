import React, { createContext, useState } from 'react'

export const ActionsContextProvider = createContext();

export default function ActionsContexComponent({ children }) {
    const [openModal, setOpenModal] = useState(false);
    const [openAddTaskModal, setOpenAddTaskModal] = useState(false);
    const [active, setActive] = useState(1);
    const [openUpdateTaskModal, setOpenUpdateTaskModal] = useState(false);
    const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);

    const ActiveHandler = (value) => {
        setActive(value === active ? 0 : value);
    }

    return (
        <ActionsContextProvider.Provider value={
            {
                openModal, setOpenModal,
                active, setActive, ActiveHandler,
                openAddTaskModal, setOpenAddTaskModal,
                openUpdateTaskModal, setOpenUpdateTaskModal,
                openDeleteTaskModal, setOpenDeleteTaskModal
            }
        }>
            {children}
        </ActionsContextProvider.Provider>
    )
}