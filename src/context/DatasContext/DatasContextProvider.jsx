import React, { createContext, useState } from 'react'

export const DatasContextProvider = createContext();

export default function DatasContextComponent({ children }) {
    const [datas, setDatas] = useState([]);
    return (
        <DatasContextProvider.Provider value={{ datas, setDatas }}>
            {children}
        </DatasContextProvider.Provider>
    )
}