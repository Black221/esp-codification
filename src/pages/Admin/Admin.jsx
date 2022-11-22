import React, {useEffect, useState} from 'react';
import HeadComponent from "../../components/HeadComponent";
import ListItem from "../../components/ListItem";
import {useAuthStateContext} from "../../context/AuthContextProvider";
import axios from "axios";
import {HOST, PORT} from "../../config/host";
import EtudiantList from "../../components/Admin/EtudiantList";
import { createColumnHelper } from "@tanstack/react-table";
import {startCase} from "lodash";
import ValidationColumn from "../../components/Admin/ValidationColumn";
import Notification from "../../components/Notification";
import {useStateContext} from "../../context/ContexProvider";
const columnHelper = createColumnHelper();


const Admin = () => {


    const [pav, setPav] = useState("A");
    const [rooms, setRooms] = useState([]);
    const [choice, setChoice] = useState("");
    const [members, setMembers] = useState([]);
    const [level, setLevel] = useState("")
    const [selectedRoom, setSelectedRoom] = useState([]);

    const auth = useAuthStateContext();
    const {showNotification} = useStateContext();

    const [etudiants, setEtudiants] = useState([]);
    const [columns, setColumns] = useState([]);

    const getEtudiants = () => {
        axios.get(`http://${HOST}:${PORT}/etudiant/all`,
            {headers: {  Authorization : `Bearer ${auth.user.token}`}}
        ).then((res) => {
            res.data.etudiant &&
            setEtudiants(res.data.etudiant);
            res.data.etudiant &&
            setColumns([
                ...Object.keys(res.data.etudiant[0]).map((key) =>
                columnHelper.accessor(key, {
                    cell: (info) => info.getValue(),
                    header: startCase(key),
                    id: key,
                })
            ), {
                    header: "Actions",
                    id: "actions",
                    accessorKey : "actions",
                    cell: ({row}) => <ValidationColumn num_carte={row.original.num_carte} />
            }])
        })
    }



    const fetchRooms = () => {
        if (auth.user)
            axios.get(`http://${HOST}:${PORT}/chambre/getAllChambres`,
                {headers: {  Authorization : `Bearer ${auth.user.token}`} })
                .then((res) => {
                    setRooms(res.data.chambres)
                })
                .catch((error) => {
                })
    }

    const fetchMembers = (id) => {
        axios.get(`http://${HOST}:${PORT}/chambre/getReserved/${id}`,
            {headers: {  Authorization : `Bearer ${auth.user.token}`} })
            .then((res) => {
                setMembers(res.data.membres)
            })
            .catch((error) => {
            })
    }

    useEffect(() => {
            fetchRooms();
            getEtudiants();

    }, []);


    useEffect(() => {
        if (rooms)
            setSelectedRoom(rooms.filter(({pavillon}) => (pavillon === pav)).sort((a,b) => {
                return a.numero - b.numero
            }))
    }, [pav, rooms])


    useEffect(() => {
        if (choice)
            fetchMembers(choice)
    }, [choice]);


    const activeClass = "whitespace-nowrap p-5 py-2 border border-orange-500 rounded bg-orange-600";
    const defaultClass = "whitespace-nowrap p-5 py-2 border border-orange-500 rounded";

    return (
        <div className="text-white overflow-hidden">
            <HeadComponent />
            {showNotification && <Notification message={
                <>Êtes-vous sûr de vouloir <br/>
                    continuer ? </>
            } user={'admin'}/>}
            <div className="w-screen mt-6 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col items-center justify-center space-y-8 ">
                    <div className="p-6 w-full md:w-auto flex md:block  overflow-x-scroll md:overflow-hidden space-x-8 font-bold text-xl">
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
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer" value={choice} onChange={(e) => setChoice(e.target.value)}>
                            <option value="">Choisir chambre</option>
                            {selectedRoom[0] && selectedRoom.filter(({etage, vue}) => ((etage === level || level === ""))).map((room) => (
                                <option key={room.numero} value={room._id}>{room.numero}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-10 md:mt-20 w-screen">
                    <div className="text-center text-red-500">
                    </div>
                    <ListItem chambre={selectedRoom.filter((room) => (room._id === choice))[0]} members={members} />
                </div>
            </div>
            <div className="mt-20">
                <EtudiantList data={etudiants} columns={columns}/>
            </div>
        </div>
    )
}

export default Admin;