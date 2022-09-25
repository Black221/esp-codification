import React from "react";
import {useNavigate} from "react-router-dom";
import HeadComponent from '../components/HeadComponent';
import ListItem from "../components/ListItem";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="text-white">
            <HeadComponent />
            <div className=" flex flex-col justify-center items-center">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <div className=" space-x-8 font-bold text-xl">
                        <button className="p-5 py-2 border border-orange-500 rounded">Pav A</button>
                        <button className="p-5 py-2 border border-orange-500 rounded">Pav B</button>
                        <button className="p-5 py-2 border border-orange-500 rounded">Pav C</button>
                        <button className="p-5 py-2 border border-orange-500 rounded">Pav G</button>
                        <button className="p-5 py-2 border border-orange-500 rounded">Pav F</button>
                    </div>
                    <div className="space-x-8">
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded">
                            <option value="">Choisir étage</option>
                            <option value="">1er étage</option>
                            <option value="">2éme étage</option>
                            <option value="">3éme étage</option>
                        </select>
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded">
                            <option value="">Choisir vue</option>
                            <option value="">Sur campus</option>
                            <option value="">Sur mer</option>
                            <option value="">Sur autre</option>
                        </select>
                        <select  className="bg-[rgba(0,0,0,0.5)] p-2 py-1 rounded">
                            <option value="">Choisir chambre</option>
                        </select>
                    </div>
                </div>
                <div className="mt-20">
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