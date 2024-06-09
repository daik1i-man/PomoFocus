import React, { createContext, useState } from 'react'

export const DatasContextProvider = createContext();

export default function DatasContextComponent({ children }) {
    
    const [pomoFocusTime, setPomoFocusTime] = useState(1500);
    const [shortBreakTime, setShortBreakTime] = useState(300);
    const [longBreakTime, setLongBreakTime] = useState(900);
    const [fakeDatas, setFakeDatas] = useState([]);

    return (
        <DatasContextProvider.Provider value={
            { pomoFocusTime, setPomoFocusTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, fakeDatas, setFakeDatas }
        }>
            {children}
        </DatasContextProvider.Provider>
    )
}