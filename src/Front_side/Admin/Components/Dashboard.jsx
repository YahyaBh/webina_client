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


    const [dataDashboard, setDataDashboard] = useState([]);


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Orders',
                data: labels.map(() => Math.floor(Math.random() * 100)),
                borderColor: '#ffe662',
                backgroundColor: '#ffe662',
            },
            {
                label: 'Users',
                data: labels.map(() => Math.floor(Math.random() * 100)),
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
            data: [dataDashboard ? 5 : dataDashboard.user_orders, dataDashboard ? 5 : dataDashboard.user_no_orders],
            backgroundColor: ['#2c2827', '#ffe662'],
            borderColor: ['#2c2827', '#ffe662'],
        }]
    }

    const doughnutOptions = {

    }

    const navigate = useNavigate();

    const [Loading, setLoading] = useState(true);


    const { AdminChecker } = AuthUser();

    useEffect(() => {
        if (Cookies.get('admin_token')) {

            AdminChecker()

            setLoading(false);


        } else {
            navigate('/signin');
        }
    }, [])

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
                        <Doughnut data={doughnutData} options={doughnutOptions}></Doughnut>
                    </div>
                </div>
            </div >);
}


export default Dashboard;