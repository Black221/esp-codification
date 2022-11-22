import React, {useEffect, useState} from 'react';
import axios from "axios";
import {HOST, PORT} from "../../config/host";
// import {useStateContext} from "../../context/ContexProvider";
import {useAuthStateContext} from "../../context/AuthContextProvider";
import {useStateContext} from "../../context/ContexProvider";



const ValidationColumn = ({num_carte}) => {

    const [message, setMessages] = useState("")
    const [compte, setCompte] = useState(null);
    const [request, setRequest] = useState(null);

    const auth = useAuthStateContext();
    const {setShowNotification, isAdminNotificationValidate, setIsAdminNotificationValidate} = useStateContext();

    useEffect(() => {
        if (num_carte)
            getInfo();
    }, [num_carte]);

    const getInfo = () => {
        axios.get(`http://${HOST}:${PORT}/compte/getCompte/${num_carte}`,
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                if (res.data.code === 500) {
                    setMessages(res.data.msg);
                    setCompte(null);
                } else {
                    if (res.data.compte && res.data.compte.reserver)
                        setCompte(res.data.compte);
                    else {
                        setCompte(null);
                        setMessages("en attente")
                    }
                }
            })
            .catch((err) => {
            })
    }

    useEffect(() => {
        if (isAdminNotificationValidate) {
            if (request === 'validation')
                OnValidate();
            if (request === 'remove')
                OnRemove();
        }
        setRequest(null);
        setIsAdminNotificationValidate(null);
        setShowNotification(false)
    }, [isAdminNotificationValidate]);


    const OnValidate = () => {
        axios.post(`http://${HOST}:${PORT}/reservation/valider/${num_carte}`,
            {},
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                getInfo()
            })
            .catch((error) => {
            })
    }

    const OnRemove = () => {
        axios.post(`http://${HOST}:${PORT}/reservation/annuler/${num_carte}`,
            {},
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                getInfo();
            })
            .catch((error) => {
            })
    }

    return (
        <div className="text-center mx-0 w-60">
            { compte ? compte.codifier ? <span className="text-green-500 font-bold"> &#9989; </span> :  <>
                <button onClick={() => {
                    setShowNotification(true);
                    setRequest('validation')
                }} className="mx-2 p-1 rounded px-3 font-bold bg-green-600">Valider</button>
                <button onClick={() => {
                    setShowNotification(true);
                    setRequest('remove')
                }} className="mx-2 p-1 rounded px-3 font-bold bg-red-600">Annuler</button>
            </> : <span className="text-red-400">{message}</span>}
        </div>
    )
}

export default ValidationColumn;