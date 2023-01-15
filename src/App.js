import React, { Fragment } from "react";

import { Routes, Route, Link } from "react-router-dom";

import Client from './Front_side/client/Components/Client';
import Admin from "./Front_side/Admin/Components/Admin";
import Show from "./Front_side/Admin/Components/Show";
import Services from "./Front_side/Admin/Components/Services";
import Orders from "./Front_side/Admin/Components/Orders";
import CreateWebsite from "./Front_side/Admin/Components/CreateWebsite";
import Chat from "./Front_side/Admin/Components/Chat";
import Users from "./Front_side/Admin/Components/Users";
import SignIn from "./Front_side/client/Components/SignIn";
import SignUp from "./Front_side/client/Components/SignUp";
import Navbar from "./Front_side/client/Components/Navbar";
import videoHeader from './Assets/Blurred Video of Scripts Being Typed.mp4';
import './App.scss'

function App() {


  return (
    <Fragment>

      <header className="app__header">
        <Navbar />


        <div className="app__header__content">

          <div className="app__header__title">
            <h1>Make Your<br/> Selling <span> Easier</span></h1>
            <p>We will help you react your dreams by <br /> making you the most professional website among the market</p>
          </div>

          <video className="app__video" loop autoPlay={true}>
            <source src={videoHeader} type="video/mp4" />
            <source src={videoHeader} type="video/ogg" />
          </video>
        </div>


      </header>






      <Routes>

        {/* Admin Space */}
        {/* <Route exact path='/' element={<Client />} /> */}
        <Route exact path='/admin' element={<Admin />} />



        <Route exact path='/admin/services' element={<Services />} />

        <Route exact path='/admin/orders' element={<Orders />} />
        <Route exact path='/admin/order/:id' element={<Orders />} />

        <Route exact path='/admin/chats' element={<Chat />} />
        <Route exact path='/admin/chat/:id' element={<Chat />} />

        <Route exact path='/admin/users' element={<Users />} />
        <Route exact path='/admin/user/:id' element={<Users />} />

        <Route exact path='/admin/websites' element={<Show />} />
        <Route exact path='/admin/website/:id' element={<Show />} />

        <Route exact path='/admin/createWebsite' element={<CreateWebsite />} />


        {/* Client Space */}
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />

      </Routes>
    </Fragment>);
}

export default App;