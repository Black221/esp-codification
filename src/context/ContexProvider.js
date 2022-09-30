
import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const ContextProvider = ({ children}) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)
    const [roomReserved, setRoomReserved] = useState(null)
    const [codifier, setCodifier] = useState(false)

    return (
        <StateContext.Provider value={{
            screenSize, setScreenSize,
            isLoading, setIsLoading,
            roomReserved, setRoomReserved,
            codifier, setCodifier
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)