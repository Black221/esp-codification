import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import logo from '../assets/ccee-logo.png';
import vector from '../assets/Vector.png';
import vector1 from '../assets/Vector(1).png';
import loading from '../assets/loading.gif';
import {ImYoutube2} from 'react-icons/im'
import {FiTwitter} from "react-icons/fi";
import {RiInstagramLine} from "react-icons/ri";
import {HOST, PORT} from "../config/host";
import {useAuthStateContext} from "../context/AuthContextProvider";


const Register = () => {

    const navigate = useNavigate();
    const [numCarte, setNumCarte] = useState("");
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const CHARACTER = "0123456789abcdefghijklmnopqrstuvwxyz!@#&*ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [isLoading, setIsLoading] = useState(false)
    const [canConnect, setCanConnect] = useState(false)
    const [messagePass, setMessagePass] = useState("");

    const randPassword = () => {
        let password = "";
        for (let i = 0; i <= 4; i++) {
            let randomNumber = Math.floor(Math.random() * CHARACTER.length);
            password += CHARACTER.substring(randomNumber, randomNumber +1);
        }
        return numCarte+password;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setPassword(randPassword());
        if (!numCarte) {
            setMessage("Veuillez saisir votre numéro de catre étudiant.")
            return null;
        }
        setIsLoading(true)
    }

    useEffect(() => {
        if (password)
            axios.post(`http://${HOST}:${PORT}/compte/inscription/${numCarte}`,
                {email,password},
            ).then((res) => {
                console.log(res.data)
                if (res.data.code ===400)
                    setMessage(res.data.msg)
                else if (res.data.code === 200)
                    if (res.data.msg)
                        setMessage(res.data.msg)
                    else {
                        setCanConnect(true);
                        setMessagePass("inscription réussie votre mot de passe : ");
                    }
                else
                    setMessage("Une erreur est survenue, veuillez réessayer plus tard")
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
                setIsLoading(false)
                setMessage("Une erreur est survenue, veuillez réessayer plus tard")
            })
    }, [password]);



    return (
        <div className=" min-h-screen flex items-center justify-center">
            <div className="bg-opacity-30 p-2 md:p-10 bg-main-bg drop-shadow-login mb-16   rounded-3xl overflow-hidden">
                <img src={vector} alt="" className="animate-pulse absolute drop-shadow-login-blob -top-20 -right-10"/>
                <img src={vector1} alt="" className="animate-pulse absolute drop-shadow-login-blob -bottom-32 -left-24"/>
                <div className="mt-4 mb-4 md:mb-10 ">
                    <img src={logo} alt="" className="mx-auto"/>
                </div>
                {message && <div className="text-red-500 text-center">
                    {message}
                </div>}
                <form className="p-4  md:px-16 space-y-10 text-white" onSubmit={handleSubmit}>
                    <div className="relative flex">
                        <input type="text"
                               id="num"
                               value={numCarte}
                               onChange={(e) => setNumCarte(e.target.value)}
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
                            Numéro de la carte étudiant</label>
                    </div>
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
                    {!canConnect && !isLoading && <div className="text-center">
                        <input type="submit"
                               value="S'inscrire"
                               className="cursor-pointer p-2 px-4 font-semibold border-2 rounded-2xl text-white drop-shadow-login-button bg-main-bg border-b-blue-300 border-r-blue-300"/>
                        <br/>
                        <span className="mt-2">ou</span>
                    </div>}
                    {canConnect && !isLoading && <p className="text-center text-green-500">
                        {messagePass}<br/><span className="text-xl text-black p-2 bg-cyan-300"> {password}</span>
                    </p>}
                    {isLoading && <div><img src={loading} className="w-20 mx-auto rounded-full" alt=""/></div>}

                </form>
                <div className="text-center text-white">
                    <span className="text-cyan-400 font-semibold cursor-pointer" onClick={() => navigate('/connexion')}>Se connecter.</span>
                </div>
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

export default Register;