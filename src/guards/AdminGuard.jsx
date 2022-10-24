import React from "react";
import {useAuthStateContext} from "../context/AuthContextProvider";
import { Navigate } from 'react-router-dom';


export const RequireAdmin = ({children}) => {

    const auth = useAuthStateContext();

    const access = JSON.parse(localStorage.getItem('access-key'));

    if ( !auth.user && !access)
        return <Navigate to='/connexion' />

    if (!auth.user.admin)
       return <Navigate to="/accueil" />

    return children;
}