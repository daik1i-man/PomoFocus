import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DatasContextProvider = createContext();

export default function DatasContextComponent({ children }) {
    const [pomoFocusTime, setPomoFocusTime] = useState(1500);
    const [shortBreakTime, setShortBreakTime] = useState(300);
    const [longBreakTime, setLongBreakTime] = useState(900);

    const [datas, setDatas] = useState({});

    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const res = await axios.get('http://localhost:5000/settings/user/get/settings');
                setDatas(res.data.setting);
                console.log(res.data.message);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDatas();
    }, [setDatas])

    return (
        <DatasContextProvider.Provider value={
            { pomoFocusTime, setPomoFocusTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, datas, setDatas }
        }>
            {children}
        </DatasContextProvider.Provider>
    )
}