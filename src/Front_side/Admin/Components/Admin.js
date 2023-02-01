import React, { Fragment } from "react";

import { Routes, Route, Link } from "react-router-dom";

// import EditProduct from "./Components/product/edit.component";
import WebsitesList from "./Show";
import CreateWebsite from "./CreateWebsite";
import SideBar from "./SideBar";
import Services from "./Services";
import Users from "./Users";
import Orders from "../../client/Components/Orders";
import Chat from "./Chat";



function Admin() {

    const auth = {
        token: localStorage.getItem('token'),
        setToken: (token) => {
            localStorage.setItem('token', token);
        },
    };

    return (
        <Fragment>

            <SideBar />

            <div className="mt-5" style={{ marginLeft: '7%', marginTop: '2%' }}>


            </div>
        </Fragment>);
}

export default Admin;