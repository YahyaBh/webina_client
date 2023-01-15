import React, { Fragment } from "react";

import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "../../UserContext";



import Navbar from "./Navbar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Chat from "../../Admin/Components/Chat";





function App() {

    const auth = {
        token: localStorage.getItem('token'),
        setToken: (token) => {
            localStorage.setItem('token', token);
        },
    };

    return (
        <Fragment>
            <Navbar />

            
        </Fragment>);
}

export default App;