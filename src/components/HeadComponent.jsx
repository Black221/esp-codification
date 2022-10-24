import React from "react";
import {useNavigate} from "react-router-dom";
import logo from "../assets/ccee-logo.png";
// import logout from "../assets/logout.png";
import {FaPowerOff} from "react-icons/fa";
import {useAuthStateContext} from "../context/AuthContextProvider";


const HeadComponent = () => {

    const navigate = useNavigate();
    const auth = useAuthStateContext();

    return(
        <div className="flex justify-between items-center p-4 relative">
            <div className="">
                <img src={logo} alt="" className="mx-auto w-16 md:w-auto"/>
            </div>
            <div className="flex space-x-3 items-center">

                <div onClick={() => {
                    auth.logout()
                    navigate("/connexion")
                }} className=" relative cursor-pointer flex items-center justify-center drop-shadow-login p-4 text-white">
                    {/*<img src={logout} alt="logout" className="absolute -z-10 hidden md:flex"/>*/}
                    <span className="hidden md:flex mr-2 font-bold">Déconnexion</span>
                    <FaPowerOff size={20} />
                </div>
            </div>
        </div>
    )
}

export default HeadComponent;