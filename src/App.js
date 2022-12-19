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
import Admin from "./pages/Admin/Admin";
import {RequireAdmin} from "./guards/AdminGuard";
import axios from "axios";
import {API} from "./config/host";

function App() {


    const auth = useAuthStateContext();
    const {setRoomReserved, setCodifier} = useStateContext();


    useEffect(() => {
        const access = JSON.parse(localStorage.getItem('access-key'));
        setRoomReserved (JSON.parse(localStorage.getItem('room')));

        if (!auth.user && access && access.token) {
            axios.get(`${API}/compte/getCompte/${access.num_carte}`)
                .then((res) => {
                    if (res.data.code === 200)
                        setCodifier(res.data.compte.codifier)
                    else
                        setCodifier(false);
                })
                .catch((err) => {

                })
            auth.login(access)
        } else if (!auth.user)
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
                       <Route path="/admin" element={
                           <RequireAdmin>
                               <Admin />
                           </RequireAdmin>
                       } />
                       <Route path="*" element={
                           <div>
                               <h1 className="text-white text-[40px] text-center pt-24 font-bold">erreur 404</h1>
                           </div>
                       } />
                   </Routes>
               </BrowserRouter>
           </div>
           {auth.user && <Footer />}
       </div>
    );
}

export default App;
