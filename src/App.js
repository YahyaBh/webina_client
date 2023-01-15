import React, { Fragment } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { Routes, Route, Link } from "react-router-dom";

// import EditProduct from "./Components/product/edit.component";
import WebsitesList from "./Front_side/Admin/Components/Show";
import CreateWebsite from "./Front_side/Admin/Components/CreateWebsite";
import Navbar from "./client/Components/Navbar";
import SideBar from "./Front_side/Admin/Components/SideBar";
import SignIn from "./client/Components/SignIn";
import Services from "./Front_side/Admin/Components/Services";
import Users from "./Front_side/Admin/Components/Users";
import Orders from "./Front_side/Admin/Components/Orders";
import Chat from "./Front_side/Admin/Components/Chat";
import SignUp from "./Front_side/Admin/Components/SignUp";
import { AuthContext } from "./Front_side/Admin/Components/UserContext";



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

      <SideBar />

      <div className="mt-5" style={{ marginLeft: '7%', marginTop: '2%' }}>
        <AuthContext.Provider value={auth}>



          <Routes>
          {/* Admin Space */}

            
            <Route exact path='/admin/websites' element={<WebsitesList />} />
            <Route exact path='/admin/services' element={<Services />} />
            <Route exact path='/admin/users' element={<Users />} />
            <Route exact path='/admin/orders' element={<Orders />} />
            <Route exact path='/admin/website/create' element={<CreateWebsite />} />
            <Route exact path='/admin/chat' element={<Chat />} />


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