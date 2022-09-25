import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";


function App() {
    return (
       <div className="bg-main-bg min-h-screen ">
           <BrowserRouter>
               <Routes>
                   <Route path="/" element={<Login />} />
                   <Route path="/accueil" element={<Home />} />
                   <Route path="/reservation" element={<Reservation />} />
               </Routes>
           </BrowserRouter>
       </div>
    );
}

export default App;
