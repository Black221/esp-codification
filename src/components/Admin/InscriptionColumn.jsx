import React, {useEffect, useState} from 'react';
import axios from "axios";
import {API} from "../../config/host";
// import {useStateContext} from "../../context/ContexProvider";
import {useAuthStateContext} from "../../context/AuthContextProvider";
import {useStateContext} from "../../context/ContexProvider";



const InscriptionColumn = ({num_carte}) => {

    //const [message, setMessages] = useState("")
    const [request, setRequest] = useState(null);
    const [canRemove, setCanRemove] = useState(false);

    const auth = useAuthStateContext();
    const {setShowNotification, isAdminNotificationValidate, setIsAdminNotificationValidate} = useStateContext();

    useEffect(() => {
        if (num_carte)
            getInfo();
    }, [num_carte]);

    const getInfo = () => {
        axios.get(`${API}/compte/getCompte/${num_carte}`,
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                if (res.data.code === 500) {
                    //setMessages(res.data.msg);
                    setCanRemove(false)
                } else {
                    if (res.data.compte && res.data.compte.reserver){
                        setCanRemove(false)
                    } else {
                        setCanRemove(true)

                    }
                }
            })
            .catch((err) => {
            })
    }

    useEffect(() => {
        if (isAdminNotificationValidate) {
            if (request === 'onRemoveProfile')
                OnRemove();
        }
        setRequest(null);
        setIsAdminNotificationValidate(null);
        setShowNotification(false)
    }, [isAdminNotificationValidate]);




    const OnRemove = () => {
        axios.post(`${API}/compte/annuler/${num_carte}`,
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
{/*             
            { canRemove &&  <button onClick={() => {
                setShowNotification(true);
                setRequest('onRemoveProfile')
            }} className="m-1 px-2 rounded  font-bold bg-red-400">x</button>} */}
        </div>
    )
}

export default InscriptionColumn;