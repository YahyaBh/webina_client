import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import Loading from "../../pages/Loading";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';
import { useEffect } from "react";
import { useState } from "react";
import AuthUser from "../../context/AuthUser";
import ProgressBar from 'react-bootstrap/ProgressBar'
import moment from "moment";
import Swal from "sweetalert2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export




    function Dashboard() {


    const [orders_num, setordersNum] = useState(1);
    const [users_num, setusersNum] = useState(1);

    const [latest_orders, setlatestOrders] = useState([]);
    const [latest_users, setlatestUsers] = useState([]);

    const [canceled_orders, setcanceledOrders] = useState([]);
    const [pending_orders, setpendingOrders] = useState([]);

    const [var_orders, setvarOrders] = useState([]);
    const [var_users, setvarUsers] = useState([]);

    const [websites, setWebsites] = useState([]);


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data: [var_orders?.January, var_orders?.February, var_orders?.March, var_orders?.April, var_orders?.May, var_orders?.June, var_orders?.July, var_orders?.August, var_orders?.September, var_orders?.October, var_orders?.November, var_orders?.December],
                borderColor: '#ffe662',
                backgroundColor: '#ffe662',
            },
            {
                label: 'Users',
                data: [var_users?.January, var_users?.February, var_users?.March, var_users?.April, var_users?.May, var_users?.June, var_users?.July, var_users?.August, var_users?.September, var_users?.October, var_users?.November, var_users?.December],
                borderColor: '#2c2827',
                backgroundColor: '#2c2827',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Users and orders , ${var_orders?.year && var_orders?.year === var_users.year ? var_orders?.year : '12 months'}`,

            },
        },
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////


    const doughnutData = {
        labels: ['Users with orders', 'Users without orders'],
        datasets: [{
            label: 'Number',
            data: [orders_num, users_num],
            backgroundColor: ['#2c2827', '#ffe662'],
            borderColor: ['#2c2827', '#ffe662'],
        }]
    }

    const navigate = useNavigate();

    const [LoadingS, setLoading] = useState(true);

    const { admin, admin_http } = AuthUser();

    useEffect(() => {
        if (admin) {
            getDashboardData();
        } else {
            navigate('/signin');
        }
    }, [])


    const getDashboardData = async () => {
        admin_http.post('/api/admin/dashboard')
            .then(res => {
                setLoading(false);
                setordersNum(res.data.total_orders);
                setusersNum(res.data.total_users);
                setcanceledOrders(res.data.canceled_orders);
                setpendingOrders(res.data.pending_orders);
                setlatestOrders(res.data.recenetly_orders);
                setlatestUsers(res.data.recenetly_users);
                setvarOrders(res.data.var_orders[0]);
                setvarUsers(res.data.var_users[0]);
                setWebsites(res.data.websites)
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }

    const orderStatus = (status) => {
        if (status === 'completed') {
            return 'completed';
        } else if (status === 'pending') {
            return 'pending';
        } else if (status === 'processing') {
            return 'processing';
        } else if (status === 'decline') {
            return 'decline';
        }
    }

    return (
        LoadingS ?
            <Loading />
            :
            <div className="app__dashboard" >

                <SideBar />

                <div className="dashboard-main-container">


                    <div className="dashboard-first-container">
                        <div className="orders-head-dashboard">
                            <div className="last-orders-container">
                                <h3>{orders_num} Orders</h3>
                                {latest_orders ? latest_orders.map((order, index) => (
                                    <a href={`/admin/order/${order.order_number}`} className="last-orders-cards-container" key={index}>
                                        <div className="last-order-card">
                                            <div className="last-order-card-content-title">
                                                <h3>{order.order_number}</h3>
                                                <p>{order ? moment(order?.created_at?.split('T')[0] + ' ' + order?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''} <span className={orderStatus(order.status)}>{order.status}</span></p>
                                            </div>
                                            <div className="last-order-card-content-price">
                                                <h4>{order.grand_total}$</h4>
                                            </div>
                                        </div>
                                    </a>
                                )) :
                                    <div className="last-orders-cards-container">
                                        <div className="last-order-card">
                                            <div className="last-order-card-content-title">
                                                <p>No orders yet</p>
                                            </div>
                                        </div>
                                    </div>}
                            </div>


                        </div>

                        <div className="users-head-dashboard">
                            <div className="last-users-container">
                                <div className="header"> 
                                    <h3>{users_num} Users</h3>
                                    <a href="/admin/users">Check Users</a>
                                </div>
                                <div className="last-users-cards-container">
                                    {latest_users?.map((user, index) => (
                                        <a href={`/admin/user/${user.id}`} key={index} className="last-user-card">
                                            <img src="../Images/user_1.png" alt="" />
                                            <div className="last-order-card-content-title">
                                                <h3>{user.full_name}</h3>
                                                <p>{user.email}</p>
                                            </div>

                                            <p>{user ? moment(user?.created_at?.split('T')[0] + ' ' + user?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="second-head-dashboard">
                        <div className="line-data-ana">
                            <Line options={options} data={data} />;
                        </div>

                        <div className="dougnut-data-ana">
                            <Doughnut data={doughnutData}></Doughnut>
                        </div>
                    </div>

                    <div className="third-head-dashboard">

                        <div className="goals-container">
                            <div className="goals-orders-dashboard">
                                <div className="order-goal-title-prog">
                                    <h4>Orders</h4> <ProgressBar backgroundColor="rgb(var(--heavy-color))" max={500} now={orders_num} label={`${orders_num}`} />
                                </div>
                                <p>500</p>
                            </div>

                            <div className="goals-orders-dashboard">
                                <div className="order-goal-title-prog">
                                    <h4>Users</h4> <ProgressBar backgroundColor="rgb(var(--mid-color))" max={500} now={users_num} label={`${users_num}`} />
                                </div>
                                <p>500</p>
                            </div>
                        </div>


                        <div className="orders-c-p-dashboard">
                            <div className="order-c-p-container">
                                <div className="orders-c-container">
                                    <h4>Pending Orders : </h4>
                                    <div className="orders-c-button-link">
                                        <h4 className="pending-or">{pending_orders}</h4>
                                        <a href="/admin/orders/pending">Visit</a>
                                    </div>
                                </div>

                                <div className="orders-c-container">
                                    <h4>Canceled Orders : </h4>
                                    <div className="orders-c-button-link">
                                        <h4 className="canceled-or">{canceled_orders}</h4>
                                        <a href="/admin/orders/decline">Visit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <hr />

                    <div className="dashboard-first-container">
                        <div className="orders-head-dashboard">
                            <div className="last-orders-container">
                                <div className="header">
                                    <h3>{websites.length} Websites </h3>
                                    <a className="add-website-button" href="/admin/website/create">Add Website</a>
                                </div>
                                {websites.length > 0 ? websites.map((website, index) => (
                                    <a href={`/admin/website/${website.token}`} className="last-orders-cards-container" key={index}>
                                        <div className="last-order-card">
                                            <div className="last-order-card-content-title">
                                                <img src={`http://localhost:8000/uploads/websites/${website.image}`} alt={website.website_name} />
                                                <p>{website ? moment(website?.created_at?.split('T')[0] + ' ' + website?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</p>
                                            </div>
                                            <div className="last-order-card-content-price">
                                                <h4>{website.price}$</h4>
                                            </div>
                                        </div>
                                    </a>
                                )) :
                                    <div className="last-orders-cards-container">
                                        <div className="last-order-card">
                                            <div className="last-order-card-content-title">
                                                <p>No websites found</p>
                                            </div>
                                        </div>
                                    </div>}
                            </div>


                        </div>

                        <div className="-head-dashboard">
                            
                        </div>

                    </div>

                </div>

            </div >

    )
}


export default Dashboard;