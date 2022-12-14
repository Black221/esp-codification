import React, {useEffect, useState} from "react";
import HeadComponent from '../components/HeadComponent';
import ListItem from "../components/ListItem";
import reservation from '../assets/reservation.png';
import axios from "axios";
import {API} from "../config/host";
import {useAuthStateContext} from "../context/AuthContextProvider";
import {useStateContext} from "../context/ContexProvider";
import {useNavigate} from "react-router-dom";

const Reservation = () => {

    const [members, setMembers] = useState([]);

    const navigate = useNavigate();
    const {roomReserved} = useStateContext();
    const auth = useAuthStateContext();

    const fetchMembers = (id) => {
        axios.get(`${API}/chambre/getReserved/${id}`,
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                console.log(res.data.membres);
                setMembers(res.data.membres)
            })
            .catch((error) => {
            })
    }



/*
    const handleValidate = () => {
        axios.post(`http://${HOST}:${PORT}/reservation/valider/${auth.user.num_carte}`,
            {},
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                setCodifier(true);
                setMessages(res.data.msg);
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleRemove = () => {
        axios.post(`http://${HOST}:${PORT}/reservation/annuler/${auth.user.num_carte}`,
            {},
            {headers: {Authorization: `Bearer ${auth.user.token}`}})
            .then((res) => {
                console.log(res)
                setRoomReserved(null);
                navigate('/accueil');
            })
            .catch((error) => {
                console.log(error)
            })
    }
*/
    useEffect(() => {
        if (roomReserved)
            fetchMembers(roomReserved._id)
        else
            navigate('/accueil')
    }, [roomReserved]);


    return (
        <div className="text-white">
            <HeadComponent />
            <div className="mt-6 flex flex-col justify-center items-center">
                <h1 className="font-bold md:text-3xl text-2xl text-center">Chambre r??serv??e :</h1>
               <div className="md:flex items-center md:space-x-10 mt-10">
                   <div className=" flex flex-col items-center justify-center space-y-8 mb-4">
                       <img src={reservation} className="w-80 md:w-96" alt=""/>
                   </div>
                   <div className="space-x-3 text-center">
                       {roomReserved && members && <ListItem chambre={roomReserved} members={members}/>}
                   {/*    {!codifier && <div className=" mt-6 space-x-3">*/}
                   {/*        <button onClick={handleValidate}*/}
                   {/*                className="cursor-pointer py-1 px-6 border border-green-500 text-green-400 rounded-full">Valider*/}
                   {/*        </button>*/}
                   {/*        <button onClick={handleRemove}*/}
                   {/*                className="cursor-pointer py-1 px-6 border border-red-500 text-red-500 rounded-full">Annuler*/}
                   {/*        </button>*/}
                   {/*    </div>}*/}
                   </div>
               </div>

            </div>
        </div>
    )
}

export default Reservation;