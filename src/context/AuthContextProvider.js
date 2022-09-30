
import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const AuthContextProvider = ({ children}) => {

    const [user, setUser] = useState("");

    const login = (user) => {
        localStorage.setItem('access-key', JSON.stringify(user));
        setUser(user);
    }

    const logout = () => {
        localStorage.clear();
        setUser(null);
    }

    return (
        <StateContext.Provider value={{
            user, login, logout
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useAuthStateContext = () => useContext(StateContext)