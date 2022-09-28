import React from "react";
import HeadComponent from '../components/HeadComponent';
import ListItem from "../components/ListItem";
import reservation from '../assets/reservation.png';

const Reservation = () => {

    return (
        <div className="text-white">
            <HeadComponent />
            <div className="mt-6 flex flex-col justify-center items-center">
                <div className=" flex flex-col items-center justify-center space-y-8 mb-4">
                   <h1 className="font-bold md:text-3xl text-2xl">Vous avez deja réservé  !</h1>
                    <img src={reservation} alt=""/>
                </div>
                <ListItem />
            </div>
        </div>
    )
}

export default Reservation;