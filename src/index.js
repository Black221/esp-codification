import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ContextProvider} from "./context/ContexProvider";
import {AuthContextProvider} from "./context/AuthContextProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <ContextProvider>
            <App />
        </ContextProvider>
    </AuthContextProvider>
);

