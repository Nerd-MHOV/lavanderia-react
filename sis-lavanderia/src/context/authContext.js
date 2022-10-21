import { createContext, useEffect, useState } from "react"
import { useApi } from "../hooks/api"

export const AuthContext = createContext(null)

export const AuthContextProvider = ({ children }) => {

    const [userLogin, setUserLogin] = useState(null)
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken')
            if(storageData) {
                const data = await api.validateToken(storageData);
                if(data.user.user_id) {
                    setUserLogin (data.user.user_id);
                }
            }
        }
        validateToken();
    }, [api])

    const setToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const login = async (user, passwd) => {
        const data = await api.login(user, passwd);
        if(data.user && data.user.token) {
            setUserLogin(data.user.user_id);
            setToken(data.user.token);
            return data.message;
        }
        return data.message || null;
    }


    const logout = async () => {
        setUserLogin(null);
        setToken('');
        await api.logout();
    }

    return (
        <AuthContext.Provider value={{ userLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

