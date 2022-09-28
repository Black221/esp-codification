import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/ccee-logo.png';
import vector from '../assets/Vector.png';
import vector1 from '../assets/Vector(1).png';
import {ImYoutube2} from 'react-icons/im'
import {FiTwitter} from "react-icons/fi";
import {RiInstagramLine} from "react-icons/ri";


const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className=" min-h-screen flex items-center justify-center">
           <div className="bg-opacity-50 p-2 md:p-10 bg-main-bg drop-shadow-login mb-16   rounded-3xl overflow-hidden">
               <img src={vector} alt="" className="animate-pulse absolute drop-shadow-login-blob -top-20 -right-10"/>
               <img src={vector1} alt="" className="animate-pulse absolute drop-shadow-login-blob -bottom-32 -left-24"/>
               <div className="mt-4 mb-4 md:mb-10 ">
                   <img src={logo} alt="" className="mx-auto"/>
               </div>
               <form className="p-4  md:px-16 space-y-12 text-white">
                   <div className="relative flex">
                       <input type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className=" w-72 md:block p-1 md:w-[320px] peer appearance-none bg-transparent focus:outline focus:outline-0 border-b-2 border-white"
                              placeholder=""
                       />
                       <label htmlFor="email"
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
                           Email</label>
                   </div>
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
                   <div className="text-center">
                       <input type="submit"
                              onClick={() => navigate('/accueil')}
                              value="Se connecter"
                              className="cursor-pointer p-2 px-4 font-semibold border-2 rounded-2xl text-white drop-shadow-login-button bg-main-bg border-b-blue-300 border-r-blue-300"/>
                   </div>
               </form>
           </div>
            <nav className=" absolute bottom-6 flex flex-wrap space-x-3 text-white items-center">
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