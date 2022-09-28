import React from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/ccee-logo.png";
import logout from "../assets/logout.png";
import {FaPowerOff} from "react-icons/fa";


const HeadComponent = () => {

    const navigate = useNavigate();

    return(
        <div className="flex justify-between items-center p-4 relative">
            <div className="">
                <img src={logo} alt="" className="mx-auto"/>
            </div>
            <div onClick={() => navigate("/")} className="relative cursor-pointer flex items-center justify-center drop-shadow-login p-4 text-white">
                <img src={logout} alt="logout" className="absolute -z-10"/>
                <span className="mr-2 font-bold">Déconnexion</span>
                <FaPowerOff />
            </div>
        </div>
    )
}

export default HeadComponent;