import React from "react";
import com from "../assets/community.png"

const Footer = () => {

    return(
        <div className="flex flex-col justify-center items-center mt-10 pb-10 text-white">
            <img src={com} alt="" className="w-52"/>
            <div className="text-sm">Design by wilfred, jayjay and LHackSRT</div>
        </div>
    )
}

export default Footer;