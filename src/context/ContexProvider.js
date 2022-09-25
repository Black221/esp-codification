
import React, { createContext, useContext, useState} from "react";

const StateContext = createContext(undefined);


export const ContextProvider = ({ children}) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false)

    return (
        <StateContext.Provider value={{
            screenSize, setScreenSize,
            isLoading, setIsLoading,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)