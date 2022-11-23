import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import HeadComponent from '../components/HeadComponent';
import ListItem from "../components/ListItem";
import axios from "axios";
import {API} from "../config/host";
import {useAuthStateContext} from "../context/AuthContextProvider";
import {useStateContext} from "../context/ContexProvider";
import Notification from "../components/Notification";

const Home = () => {

    const navigate = useNavigate();
    const [pav, setPav] = useState("A");
    const [rooms, setRooms] = useState([]);
    const [choice, setChoice] = useState("");
    const [members, setMembers] = useState([]);
    const [view, setView] = useState("")
    const [level, setLevel] = useState("")

    const {roomReserved, setRoomReserved, showNotification, setShowNotification,isNotificationValidate, setIsNotificationValidate} = useStateContext();
    const auth = useAuthStateContext();

    const fetchRooms = () => {
        if (auth.user)
            axios.post(`${API}/chambre/getChambre/${auth.user.num_carte}`,
                {pavillon: pav},
                {headers: {  Authorization : `Bearer ${auth.user.token}`} })
                .then((res) => {
                    setRooms(res.data.chambres)
                })
                .catch((error) => {
                })
    }

    const fetchMembers = (id) => {
        axios.get(`${API}/chambre/getReserved/${id}`,
            {headers: {  Authorization : `Bearer ${auth.user.token}`} })
            .then((res) => {
                setMembers(res.data.membres)
            })
            .catch((error) => {
            })
    }

    const handleReserve = () => {

        if (choice) {
            axios.post(`${API}/reservation/reserver/${choice}`,
                {num_carte: auth.user.num_carte},
                {headers: {Authorization: `Bearer ${auth.user.token}`}})
                .then(() => {
                    setRoomReserved(rooms.filter((room) => (room._id === choice))[0]);
                })
                .catch((error) => {
                })
        }
    }

    useEffect(() => {
        if (isNotificationValidate)
            handleReserve();
        setIsNotificationValidate(null);
        setShowNotification(false);

    }, [isNotificationValidate]);


    useEffect(() => {
        fetchRooms(pav)
    }, [pav]);

    useEffect(() => {
        if (choice)
            fetchMembers(choice)
    }, [choice]);

    useEffect(() => {
        if (roomReserved)
            navigate('/reservation');
    }, [roomReserved]);

    const activeClass = "whitespace-nowrap p-5 py-2 border border-orange-500 rounded bg-orange-600";
    const defaultClass = "whitespace-nowrap p-5 py-2 border border-orange-500 rounded";

    return (
        <div className="text-white overflow-hidden">
            <HeadComponent />
            {showNotification && <Notification message={
                <>Êtes-vous sûr de vouloir <br/>
                    continuer ? </>
            } user={'etudiant'}/>}
            <div className="w-screen mt-6 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col items-center justify-center space-y-8 ">
                    <div className="md:bg-transparent bg-[rgba(0,0,0,0.3)] p-6 w-full md:w-auto flex md:block  overflow-x-scroll md:overflow-hidden space-x-8 font-bold text-xl">
                        <button className={pav === "A" ? activeClass : defaultClass}
                                onClick={() => setPav("A")}>
                            Pav A</button>
                        <button className={pav === "B" ? activeClass : defaultClass}
                                onClick={() => setPav("B")}>
                            Pav B</button>
                        <button className={pav === "C" ? activeClass : defaultClass}
                                onClick={() => setPav("C")}>
                            Pav C</button>
                        <button className={pav === "G" ? activeClass : defaultClass}
                                onClick={() => setPav("G")}>
                            Pav G</button>
                        <button className={pav === "F" ? activeClass : defaultClass}
                                onClick={() => setPav("F")}>
                            Pav F</button>
                    </div>
                    <div className="space-x-8 space-y-4 md:space-x-8 md:space-y-0  text-center ">
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer"
                                 onChange={(e) => (setLevel(e.target.value))}
                                 value={level}>
                            <option value="">Choisir étage</option>
                            <option value="R">Rez-de-chaussée</option>
                            {pav !== "F" && <option value="1">1er étage</option>}
                            {pav !== "F" &&  <option value="2">2éme étage</option>}
                            {pav !== "F" &&  <option value="3">3éme étage</option>}
                            {pav === "G" &&  <option value="4">4éme étage</option>}
                        </select>
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer"
                                 onChange={(e) => setView(e.target.value)}
                                 value={view}>
                            <option value="">Choisir vue</option>
                            <option value="campus">Sur campus</option>
                            <option value="mer">Sur mer</option>
                            <option value="autre">Sur autre</option>
                        </select>
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer" value={choice} onChange={(e) => setChoice(e.target.value)}>
                            <option value="">Choisir chambre</option>
                            {rooms[0] && rooms.filter(({etage, vue}) => ((etage === level || level === "") && (view === vue || view === ""))).map((room) => (
                                <option key={room.numero} value={room._id}>{room.numero}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-10 md:mt-20 w-screen">
                    <div className="text-center text-red-500">
                    </div>
                    <ListItem chambre={rooms.filter((room) => (room._id === choice))[0]} members={members} />
                </div>
                <div className=" mt-6 space-x-3">
                    <button disabled={!choice} onClick={() => {
                        setShowNotification(true);
                    }} className="cursor-pointer py-1 px-6 border rounded-full">Réserver</button>
                </div>
            </div>
        </div>
    )
}

export default Home;