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

function App() {


  return (
    <Fragment>


      <Routes>
        <Route exact path='/' element={<Client />} />
        <Route exact path='/admin' element={<Admin />} />



        <Route exact path='/admin/services' element={<Services />} />

        <Route exact path='/admin/orders' element={<Orders />} />
        <Route exact path='/admin/order/:id' element={<Orders />} />

        <Route exact path='/admin/chats' element={<Chat />} />
        <Route exact path='/admin/chat/:id' element={<Chat />} />

        <Route exact path='/admin/users' element={<Users />} />
        <Route exact path='/admin/user/:id' element={<Users />} />

        <Route exact path='/admin/shows' element={<Show />} />
        <Route exact path='/admin/show/:id' element={<Show />} />
        
        <Route exact path='/admin/createWebsite' element={<CreateWebsite />} />
        
      </Routes>
    </Fragment>);
}

export default App;