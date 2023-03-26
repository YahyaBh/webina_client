import { Fragment, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";


import Users from "./Front_side/Admin/Components/Users";
import Discounts from "./Front_side/Admin/Components/Discounts";
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
import AdminContact from "./Front_side/Admin/Components/AdminContact";
import AdminNews from "./Front_side/Admin/Components/AdminNews";
import AdminBlogs from "./Front_side/Admin/Components/AdminBlogs";
import PaymentWestMoney from "./Front_side/client/Components/PaymentWestMoney";
import AuthUser from "./Front_side/context/AuthUser";
import Pusher from "pusher-js";
import Swal from "sweetalert2";




function App() {


  const { getAdmin } = AuthUser()

  const navigate = useNavigate()

  useEffect(() => {
    if (getAdmin) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      const pusher = new Pusher("0b92bbc5466ff479ab62", {
        cluster: "eu",
        encrypted: true
      });

      const channel = pusher.subscribe("WebIna");
      channel.bind('new-order', function (data) {
        Toast.fire({
          icon: 'info',
          title: 'New Order',
          showConfirmButton: true,
          confirmButtonAriaLabel: 'Check Order',
          timer: 3000
        })
          .then((res) => {
            if (res.isConfirmed) {
              navigate(`/admin/order/${data.order.token}`)
            }
          })
      });

      channel.bind('new-user', function (data) {
        Toast.fire({
          icon: 'info',
          title: 'New User',
          showConfirmButton: true,
          confirmButtonAriaLabel: 'Check User',
          timer: 3000
        })
          .then((res) => {
            if (res.isConfirmed) {
              navigate(`/admin/user/${data.user.token}`)
            }
          })
      });


      channel.bind('new-payment', function (data) {
        Toast.fire({
          icon: 'info',
          title: 'New Payment',
          showConfirmButton: true,
          confirmButtonAriaLabel : 'Check Payment',
          timer: 3000
        })
        .then((res) => {
          if(res.isConfirmed) {
            navigate(`/admin/payment/${data.payment.token}`)
          }
        })
      });


      
    }
  }, [])



  return (
    <Fragment>



      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/admin/*' element={<Dashboard />} />
        <Route exact path='/admin/dashboard' element={<Dashboard />} />
        <Route exact path='/admin/Discounts' element={<Discounts />} />
        <Route exact path='/admin/orders' element={<AdminOrders />} />
        <Route exact path='/admin/orders/:type' element={<AdminOrders />} />
        <Route exact path='/admin/order/:id' element={<AdminOrder />} />
        <Route exact path='/admin/users' element={<Users />} />
        <Route exact path='/admin/user/:id' element={<User />} />
        <Route exact path='/admin/chat' element={<ChatAdmin />} />
        <Route exact path='/admin/chat/:token' element={<ChatAdminUser />} />
        <Route exact path='/admin/websites' element={<AdminWebsites />} />
        <Route exact path='/admin/website/create' element={<AdminWebsiteCreate />} />
        <Route exact path='/admin/contact/messages' element={<AdminContact />} />
        <Route exact path='/admin/news-letters' element={<AdminNews />} />
        <Route exact path='/admin/blogs' element={<AdminBlogs />} />
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
        <Route exact path="/checkout/:method/:cash_token" element={<PaymentWestMoney />} />
        <Route exact path="/payment/:result" element={<PaymentSuccess />} />
        <Route exact path='/chat' element={<Chat />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path='*' element={<Error />} />
      </Routes>
    </Fragment >


  );
}

export default App;

