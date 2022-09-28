import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import Background from "./components/Background";

function App() {
    return (
       <div className="bg-main-bg min-h-screen w-screen">
           <div className="absolute">
               <Background />
           </div>
           <div className="relative">
               <BrowserRouter>
                   <Routes>
                       <Route path="/" element={<Login />} />
                       <Route path="/accueil" element={<Home />} />
                       <Route path="/reservation" element={<Reservation />} />
                   </Routes>
               </BrowserRouter>
           </div>
       </div>
    );
}

export default App;
