import { Fragment, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";


import Users from "./Front_side/Admin/Components/Users";
import Services from "./Front_side/Admin/Components/Services";
import Dashboard from "./Front_side/Admin/Components/Dashboard";
import ChatAdmin from "./Front_side/Admin/Components/ChatAdmin";


import Orders from "./Front_side/client/Components/Orders";
import SignIn from "./Front_side/client/Components/SignIn";
import SignUp from "./Front_side/client/Components/SignUp";
import PrivacyPolicy from "./Front_side/client/Components/PrivacyPolicy";
import Home from "./Home";
import Error from "./Error";
import GoogleCallBack from "./Front_side/client/Components/GoogleCallBack";
import Profile from "./Front_side/client/Components/Profile";
import Logout from "./Front_side/client/Components/Logout";
import Websites from "./Front_side/client/Components/Websites";
import Website from "./Front_side/client/Components/Website";
import Payment from "./Front_side/client/Components/Payment";
import Blogs from "./Front_side/client/Components/Blogs";
import EmailVerify from "./Front_side/client/Components/EmailVerify";
import PaymentSuccess from "./Front_side/client/Components/CreditCard/PaymentSuccess";
import Order from "./Front_side/client/Components/Order";
import Chat from "./Front_side/client/Components/Chat";
import ChatAdminUser from "./Front_side/Admin/Components/ChatAdminUser";
import Hire from "./Front_side/client/Components/Hire";
import AboutUs from "./Front_side/client/Components/AboutUs";
import AdminOrders from "./Front_side/Admin/Components/AdminOrders";
import AdminOrder from "./Front_side/Admin/Components/AdminOrder";
import User from "./Front_side/Admin/Components/User";
import AdminWebsites from "./Front_side/Admin/Components/AdminWebsites";
import AdminWebsiteCreate from "./Front_side/Admin/Components/AdminWebsiteCreate";

import AuthUser from "./Front_side/context/AuthUser";




function App() {




  


  return (
      <Fragment>



        <Routes>
          <Route exact path='/' element={<Home />} />

          <Route exact path='/admin/dashboard' element={<Dashboard />} />
          <Route exact path='/admin/services' element={<Services />} />
          <Route exact path='/admin/orders' element={<AdminOrders />} />
          <Route exact path='/admin/orders/:type' element={<AdminOrders />} />
          <Route exact path='/admin/order/:id' element={<AdminOrder />} />
          <Route exact path='/admin/users' element={<Users />} />
          <Route exact path='/admin/user/:id' element={<User />} />
          <Route exact path='/admin/chat' element={<ChatAdmin />} />
          <Route exact path='/admin/chat/:token' element={<ChatAdminUser />} />
          <Route exact path='/admin/websites' element={<AdminWebsites />} />
          <Route exact path='/admin/website/create' element={<AdminWebsiteCreate />} />

          <Route exact path="/privacy&policy" element={<PrivacyPolicy />} />


          <Route exact path='/websites' element={<Websites />} />
          <Route exact path='/website/:token' element={<Website />} />
          <Route exact path='/blogs' element={<Blogs />} />
          <Route exact path='/hiring' element={<Hire />} />
          <Route exact path='/about' element={<AboutUs />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="/email/verify/:email/:token" element={<EmailVerify />} />
          <Route path="/auth/google" element={<GoogleCallBack />}></Route>
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/order/:order_token" element={<Order />} />
          <Route exact path="/buy/website/:token" element={<Payment />} />
          <Route exact path="/payment/:result" element={<PaymentSuccess />} />
          <Route exact path='/chat' element={<Chat />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path='*' element={<Error />} />

        </Routes>
      </Fragment >

      
  );
}

export default App;

