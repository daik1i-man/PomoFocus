import { createContext, useState } from 'react'

export const UserAuthContext = createContext();

export default function UserAuthContextComponent({ children }) {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userDatas, setUserDatas] = useState([]);

    return <UserAuthContext.Provider
        value={{ user, setUser, loading, setLoading, userDatas, setUserDatas }}
    >
        {children}
    </UserAuthContext.Provider>
}
