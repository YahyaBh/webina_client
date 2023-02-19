import React, { Fragment } from "react";

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
import Cookies from "js-cookie";
import { useState } from "react";
import AuthUser from "../../context/AuthUser";



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
                text: 'Chart.js Line Chart',
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
        admin_http.post('/admin/dashboard')
            .then(res => {
                setLoading(false);
                setordersNum(res.data.orders);
                setusersNum(res.data.users);
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
                    <div>
                        <Line options={options} data={data} />;
                    </div>

                    <div>
                        <Doughnut data={doughnutData}></Doughnut>
                    </div>
                </div>
            </div >);
}


export default Dashboard;