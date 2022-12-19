import React, {useEffect, useState} from 'react';
import HeadComponent from "../../components/HeadComponent";
import ListItem from "../../components/ListItem";
import {useAuthStateContext} from "../../context/AuthContextProvider";
import axios from "axios";
import {API} from "../../config/host";
import EtudiantList from "../../components/Admin/EtudiantList";
import { createColumnHelper } from "@tanstack/react-table";
import {startCase} from "lodash";
import ValidationColumn from "../../components/Admin/ValidationColumn";
import InscriptionColumn from "../../components/Admin/InscriptionColumn";
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
        axios.get(`${API}/etudiant/all`,
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
                    header: "Réservation",
                    id: "actions",
                    accessorKey : "actions",
                    cell: ({row}) => <ValidationColumn num_carte={row.original.num_carte} />
            }])
        })
    }



    const fetchRooms = () => {
        if (auth.user)
            axios.get(`${API}/chambre/getAllChambres`,
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


    const activeClass = "whitespace-nowrap p-5 py-2 border border-green-500 rounded bg-green-600";
    const defaultClass = "whitespace-nowrap p-5 py-2 border border-green-500 rounded";

    return (
        <div className="text-white overflow-hidden">
            <HeadComponent />
            {showNotification && <Notification message={
                <>Êtes-vous sûr de vouloir <br/>
                    continuer ? </>
            } user={'admin'}/>}
            <div className="w-screen mt-6 flex flex-col justify-center items-center">
                <div className=" w-full flex flex-col items-center justify-center space-y-8 ">
                   
                </div>
                
            </div>
            <div className="mt-10">
                <EtudiantList data={etudiants} columns={columns}/>
            </div>
        </div>
    )
}

export default Admin;