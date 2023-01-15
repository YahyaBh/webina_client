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

            <div className="mt-5" style={{ marginLeft: '7%', marginTop: '2%' }}>
                <AuthContext.Provider value={auth}>



                    <Routes>

                        {/* Client Space */}

                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route exact path='/chat/:id' element={<Chat />} />


                    </Routes>
                </AuthContext.Provider>

            </div>
        </Fragment>);
}

export default App;