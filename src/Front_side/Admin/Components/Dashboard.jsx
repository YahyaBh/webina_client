import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import LoadingIMG from './../../../Assets/Images/WEBINA2.png'

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




    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data: [orders_num],
                borderColor: '#ffe662',
                backgroundColor: '#ffe662',
            },
            {
                label: 'Users',
                data: [users_num],
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
                text: 'Users and orders with latest 12 months',

            },
        },
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////


    const doughnutData = {
        labels: ['Users with orders', 'Users without orders'],
        datasets: [{
            label: 'Quantity',
            data: [orders_num, users_num],
            backgroundColor: ['#2c2827', '#ffe662'],
            borderColor: ['#2c2827', '#ffe662'],
        }]
    }

    const navigate = useNavigate();

    const [Loading, setLoading] = useState(true);

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
                setordersNum(res.data.orders);
                setusersNum(res.data.users);
                setcanceledOrders(res.data.canceled_orders);
                setpendingOrders(res.data.pending_orders);
                setlatestOrders(res.data.recently_orders);
                setlatestUsers(res.data.recently_users);
                console.log(res.data);

            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    return (
        Loading ?
            <div className='loading-container'>
                <img src={LoadingIMG} alt="loading-web" />
            </div>
            :
            <div className="app__dashboard" >

                <SideBar />

                <div className="dashboard-main-container">


                    <div className="dashboard-first-container">

                        <div className="orders-head-dashboard">
                            <div className="last-orders-container">
                                <h3>{orders_num} Orders</h3>
                                {latest_orders.map((order, index) => (
                                    <div className="last-orders-cards-container">
                                        <div className="last-order-card">
                                            <div className="last-order-card-content-title">
                                                <h3>WIX WEBSITE</h3>
                                                <p>2023-24-02 18:02:02</p>
                                            </div>
                                            <div className="last-order-card-content-price">
                                                <h4>25$</h4>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>


                        </div>

                        <div className="users-head-dashboard">
                            <div className="last-users-container">
                                <h3>{users_num} Users</h3>
                                <div className="last-users-cards-container">
                                    <div className="last-user-card">
                                        <img src="../Images/user_1.png" alt="" />

                                        <div className="last-order-card-content-title">
                                            <h3>YAHYA BOUHSINE</h3>
                                            <p>gamesy865@gmail.com</p>
                                        </div>

                                        <p>4 hours ago</p>
                                    </div>
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
                                    <h4>Orders</h4> <ProgressBar variant="success" max={20000} now={orders_num + 10000} label={`${orders_num + 10000}`} />
                                </div>
                                <p>20.000</p>
                            </div>

                            <div className="goals-orders-dashboard">
                                <div className="order-goal-title-prog">
                                    <h4>Users</h4> <ProgressBar variant="info" max={5000} now={users_num + 4000} label={`${users_num + 4000}`} />
                                </div>
                                <p>5.000</p>
                            </div>
                        </div>


                        <div className="orders-c-p-dashboard">
                            <div className="order-c-p-container">
                                <div className="orders-c-container">
                                    <h4>Pending Orders : </h4>
                                    <div className="orders-c-button-link">
                                        <h4 className="pending-or">{pending_orders}</h4>
                                        <a href="/orders">Visit</a>
                                    </div>
                                </div>

                                <div className="orders-c-container">
                                    <h4>Canceled Orders : </h4>
                                    <div className="orders-c-button-link">
                                        <h4 className="canceled-or">{canceled_orders}</h4>
                                        <a href="/orders">Visit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>



                </div>

            </div >

    )
}


export default Dashboard;