import React from "react";
import {useAuthStateContext} from "../context/AuthContextProvider";
import { Navigate } from 'react-router-dom';


export const RequireAdmin = ({children}) => {

    const auth = useAuthStateContext();
    if (!auth.user.admin)
       return <Navigate to="/accueil" />

    return children;
}