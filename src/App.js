import React, {useEffect} from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reservation from "./pages/Reservation";
import Background from "./components/Background";
import Register from "./pages/Register";
import {useAuthStateContext} from "./context/AuthContextProvider";
import {RequireAuth} from "./guards/AuthGard";
import {useStateContext} from "./context/ContexProvider";
import Footer from "./components/Footer";

function App() {

    const auth = useAuthStateContext();
    const {setRoomReserved, setCodifier} = useStateContext();

    useEffect(() => {
        const access = JSON.parse(localStorage.getItem('access-key'));
        setRoomReserved (JSON.parse(localStorage.getItem('room')));
        setCodifier(JSON.parse(localStorage.getItem('codifier')));

        if (!auth.user && access && access.token)
            auth.login(access)
        else if (!auth.user)
            auth.logout();

    }, [auth.user])


    return (
       <div className="bg-main-bg min-h-screen max-w-screen">
           <div className="absolute">
               <Background />
           </div>
           <div className="relative">
               <BrowserRouter>
                   <Routes>
                       <Route path="/" element={
                           <Register />} />
                       <Route path="/connexion" element={
                           <Login />} />
                       <Route path="/accueil" element={<RequireAuth>
                           <Home />
                       </RequireAuth>} />
                       <Route path="/reservation" element={<RequireAuth>
                           <Reservation />
                       </RequireAuth>} />
                   </Routes>
               </BrowserRouter>
           </div>
           {auth.user && <  Footer />}
       </div>
    );
}

export default App;
