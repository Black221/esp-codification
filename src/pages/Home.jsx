import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import HeadComponent from '../components/HeadComponent';
import ListItem from "../components/ListItem";

const Home = () => {

    const navigate = useNavigate();
    const [activate, setActivate] = useState("");
    const activeClass = "whitespace-nowrap p-5 py-2 border border-orange-500 rounded bg-orange-600";
    const defaultClass = "whitespace-nowrap p-5 py-2 border border-orange-500 rounded";

    return (
        <div className="text-white overflow-hidden">
            <HeadComponent />
            <div className="w-screen mt-6 flex flex-col justify-center items-center">
                <div className="w-full flex flex-col items-center justify-center space-y-8 ">
                    <div className="p-6 w-full md:w-auto flex md:block  overflow-x-scroll md:overflow-hidden space-x-8 font-bold text-xl">
                        <button className={activate === "a" ? activeClass : defaultClass}
                                onClick={() => setActivate("a")}>
                            Pav A</button>
                        <button className={activate === "b" ? activeClass : defaultClass}
                                onClick={() => setActivate("b")}>
                            Pav B</button>
                        <button className={activate === "c" ? activeClass : defaultClass}
                                onClick={() => setActivate("c")}>
                            Pav C</button>
                        <button className={activate === "g" ? activeClass : defaultClass}
                                onClick={() => setActivate("g")}>
                            Pav G</button>
                        <button className={activate === "f" ? activeClass : defaultClass}
                                onClick={() => setActivate("f")}>
                            Pav F</button>
                    </div>
                    <div className="space-x-8 space-y-4 md:space-x-8 md:space-y-0  text-center ">
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer">
                            <option value="">Choisir étage</option>
                            <option value="">1er étage</option>
                            <option value="">2éme étage</option>
                            <option value="">3éme étage</option>
                        </select>
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer">
                            <option value="">Choisir vue</option>
                            <option value="">Sur campus</option>
                            <option value="">Sur mer</option>
                            <option value="">Sur autre</option>
                        </select>
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded cursor-pointer">
                            <option value="">Choisir chambre</option>
                        </select>
                    </div>
                </div>
                <div className="mt-10 md:mt-20 w-screen">
                    <ListItem  />
                </div>
                <div className=" mt-6">
                    <button onClick={() => navigate('/reservation')} className="py-1 px-6 border rounded-full">Réserver</button>
                </div>
            </div>
        </div>
    )
}

export default Home;