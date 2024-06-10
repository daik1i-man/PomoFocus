import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const DatasContextProvider = createContext();

export default function DatasContextComponent({ children }) {
    const [datas, setDatas] = useState({});
    useEffect(() => {
        const fetchDatas = async () => {
            try {
                const res = await axios.get('http://localhost:5000/settings/user/get/settings');
                const newSettings = {
                    pomofocus: res.data.setting.pomofocus * 60,
                    shortBreak: res.data.setting.short_break * 60,
                    longBreak: res.data.setting.long_break * 60
                }
                setDatas({ ...datas, ...newSettings });
                console.log(res.data.message);
            } catch (error) {
                console.log(error);
            }
        }

        fetchDatas();
    }, [setDatas])

    const [pomoFocusTime, setPomoFocusTime] = useState(0);
    const [shortBreakTime, setShortBreakTime] = useState(0);
    const [longBreakTime, setLongBreakTime] = useState(0);

    useEffect(() => {
        if (datas.pomofocus !== undefined) {
            setPomoFocusTime(datas.pomofocus);
            setShortBreakTime(datas.shortBreak);
            setLongBreakTime(datas.longBreak);
        }
    }, [datas])

    return (
        <DatasContextProvider.Provider value={
            { pomoFocusTime, setPomoFocusTime, shortBreakTime, setShortBreakTime, longBreakTime, setLongBreakTime, datas, setDatas }
        }>
            {children}
        </DatasContextProvider.Provider>
    )
}