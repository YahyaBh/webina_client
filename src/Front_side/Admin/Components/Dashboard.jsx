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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import AuthUser from "../../AuthUser";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
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

function Dashboard() {

    const navigate = useNavigate();

    const [Loading, setLoading] = useState(true);


    const { AdminChecker } = AuthUser();

    useEffect(() => {
        if (Cookies.get('admin_token')) {
            
            AdminChecker
            .then(res => {
                if(res.status === 200) {
                    setLoading(false);
                }
            })

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

                <div className="mt-5" style={{ width : '80%' , float: 'right' }}>
                    <Line options={options} data={data} />;

                </div>
            </div >);
}


export default Dashboard;