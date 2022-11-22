import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/ccee-logo.png';
import vector from '../assets/Vector.png';
import vector1 from '../assets/Vector(1).png';
import {ImYoutube2} from 'react-icons/im'
import {FiTwitter} from "react-icons/fi";
import {RiInstagramLine} from "react-icons/ri";
import axios from "axios";
import {HOST, PORT} from "../config/host";
import {useAuthStateContext} from "../context/AuthContextProvider";
import {useStateContext} from "../context/ContexProvider";
import loading from "../assets/loading.gif";
import {admin} from "../data/dummy.js"

const Login = () => {

    const navigate = useNavigate();
    const [num_carte, setNum_carte] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("");
    const auth = useAuthStateContext();
    const {roomReserved,setRoomReserved, setCodifier} = useStateContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!num_carte || !password) {
            setMessage("Veuillez remplir tous les champs")
            return null;
        }
        setIsLoading(true);
        if (num_carte !== admin)
            axios.post(`http://${HOST}:${PORT}/compte/connexion`,
                {num_carte, password},

            ).then((res) => {
                if (res.data.code ===400) {
                    setIsLoading(false)
                    setMessage(res.data.msg)
                }
                else if (res.data.code === 200) {
                    auth.login(res.data.user);
                    setRoomReserved(res.data.chambre);
                    setCodifier(res.data.codifier);
                    localStorage.setItem('room', JSON.stringify(res.data.chambre));
                    localStorage.setItem('codifier', JSON.stringify(res.data.codifier));
                }
                else if (res.data.code === 500) {
                    setIsLoading(false)
                    setMessage(res.data.msg)
                }
                else
                    setMessage("Une erreur est survenue, veuillez réessayer plus tard")
            }).catch((error) => {
                setMessage("Une erreur est survenue, veuillez réessayer plus tard")
                setIsLoading(false)
            })
        else
            axios.post(`http://${HOST}:${PORT}/admin/connexion`, {num_carte, password})
                .then((res) => {
                    if (res.data.code ===400) {
                        setIsLoading(false)
                        setMessage(res.data.msg)
                    }
                    else if (res.data.code === 200) {
                        auth.login(res.data.user);
                        localStorage.setItem('room', null);
                        localStorage.setItem('codifier', null);
                    }
                    else if (res.data.code === 500) {
                        setIsLoading(false)
                        setMessage(res.data.msg)
                    }
                    else
                        setMessage("Une erreur est survenue, veuillez réessayer plus tard")
                }).catch((error) => {
                setMessage("Une erreur est survenue, veuillez réessayer plus tard")
                setIsLoading(false)
            })

    }

    useEffect(() => {
        if (auth.user) {
            setIsLoading(false)
            if (auth.user.admin)
                navigate('/admin');
            else {
                if (roomReserved)
                    navigate('/reservation')
                else
                    navigate('/accueil')
            }
        }
    }, [auth.user, roomReserved]);

    useEffect(() => {
        auth.logout();
    }, []);

    return (
        <div className=" min-h-screen flex items-center justify-center relative">
           <div className="bg-opacity-30 p-2 md:p-10 bg-main-bg drop-shadow-login mb-16   rounded-3xl overflow-hidden">
               <img src={vector} alt="" className="animate-pulse absolute drop-shadow-login-blob -top-20 -right-10"/>
               <img src={vector1} alt="" className="animate-pulse absolute drop-shadow-login-blob -bottom-32 -left-24"/>
               <div className="mt-4 mb-4 md:mb-10 ">
                   <img src={logo} alt="" className="mx-auto"/>
               </div>
               {message && <div className="text-red-500 text-center">
                   {message}
               </div>}
               <form className="p-4  md:px-16 space-y-12 text-white" onSubmit={handleSubmit}>
                   <div className="relative flex">
                       <input type="text"
                              id="num"
                              value={num_carte}
                              onChange={(e) => setNum_carte(e.target.value)}
                              className=" w-72 md:block p-1 md:w-[320px] peer appearance-none bg-transparent focus:outline focus:outline-0 border-b-2 border-white"
                              placeholder=""
                       />
                       <label htmlFor="num"
                              className="absolute italic text-[18px]
                               text-gray-500 duration-300
                               transform -translate-y-4 scale-75 z-10
                               origin-[0] peer-focus:px-0
                               peer-focus:text-cyan-400
                               peer-placeholder-shown:scale-100
                               peer-placeholder-shown:-translate-y-1/2
                               peer-placeholder-shown:top-1/2
                               peer-focus:top-2 peer-focus:scale-75
                               peer-focus:-translate-y-6 ">
                           Numéro carte étudiant</label>
                   </div>
                   <div>
                       <div className="relative flex">
                           <input type="password"
                                  id="password"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                  className="w-full md:block p-1 md:w-[320px] peer appearance-none bg-transparent focus:outline focus:outline-0 border-b-2 border-white"
                                  placeholder=""
                           />
                           <label htmlFor="password"
                                  className="absolute italic text-[18px]
                               text-gray-500 duration-300
                               transform -translate-y-4 scale-75 z-10
                               origin-[0] peer-focus:px-0
                               peer-focus:text-cyan-400
                               peer-placeholder-shown:scale-100
                               peer-placeholder-shown:-translate-y-1/2
                               peer-placeholder-shown:top-1/2
                               peer-focus:top-2 peer-focus:scale-75
                               peer-focus:-translate-y-6 ">
                               Mot de passe</label>
                       </div>
                   </div>
                   {!isLoading && <div className="text-center">
                       <input type="submit"
                              value="Se connecter"
                              className="cursor-pointer p-2 px-4 font-semibold border-2 rounded-2xl text-white drop-shadow-login-button bg-main-bg border-b-blue-300 border-r-blue-300"/>
                   </div>}
                   {isLoading && <div><img src={loading} className="w-20 mx-auto rounded-full" alt=""/></div>}
               </form>
               <div className="text-center text-white mb-4">
                   <span>ou</span>
                   <br/>
                   <span className="text-cyan-400 font-semibold cursor-pointer" onClick={() => navigate('/')}>S'inscrire.</span>
               </div>
           </div>
            <nav className=" absolute bottom-4 flex flex-wrap space-x-3 text-white items-center">
                <a className="flex items-center" href="https://instagram.com/ceeofficiel">
                    <RiInstagramLine size={35} className="mr-2" />
                    <span className="hidden md:inline">instagram.com/ceeofficiel</span>
                </a>
                <a className="flex items-center" href="https://twitter.com/ceeofficiel">
                    <FiTwitter size={35} className="mr-2"/>
                    <span  className="hidden md:inline">twitter.com/ceeofficiel</span>
                </a>
                <a className="flex items-center" href="https://tinyurl.com/ceeofficiel">
                    <ImYoutube2 size={60} className="mr-2"/>
                    <span  className="hidden md:inline">tinyurl.com/ceeofficiel</span>
                </a>
            </nav>
        </div>
    )
}

export default Login;