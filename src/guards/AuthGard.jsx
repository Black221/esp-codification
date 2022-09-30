import { Navigate } from 'react-router-dom';
import {useAuthStateContext} from "../context/AuthContextProvider";


export const RequireAuth = ({children}) => {



    const auth = useAuthStateContext();

    const access = JSON.parse(localStorage.getItem('access-key'));

    if ( !auth.user && !access)
        return <Navigate to='/connexion' />


    return children
}