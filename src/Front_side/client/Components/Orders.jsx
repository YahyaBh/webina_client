import cookie from 'js-cookie';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser'
import Navbar from './Navbar';
import Loading from '../../../Assets/Images/WEBINA2.png'
const Orders = () => {

    const navigate = useNavigate();

    const { sec_http } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);



    useEffect(() => {

        if (!cookie.get('token')) {
            Swal.fire({
                title: 'Your are not logged in',
                text: 'Please login in order continue',
                icon: 'info',
                confirmButtonText: 'Login',
                confirmButtonColor: 'rgb(var(--heavy-color))'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    navigate('/signin');
                    cookie.remove('token');
                }
            });
        }

        getOrders();

    }, [])


    const getOrders = async () => {

        const userData = new FormData();

        userData.append('token', cookie.get('token'));
        userData.append('user_id', JSON.parse(cookie.get('user')).id)
        console.log(userData);

        await sec_http.post('/orders', userData)
            .then(res => {
                setOrders(res.data.orders);
            }).catch(err => {
                Swal.fire({
                    title: 'Error',
                    text: err,
                    icon: 'error'
                })
            });
        setLoading(false);



    }


    return (
        loading ?
            <div className='loading-container'>
                < img src={Loading} alt="loading-web" />
            </div >
            :
            <Fragment>
                <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                    <Navbar userData={JSON.parse(cookie.get('user'))} />
                </div>


                {orders && orders.length > 0 ?

                    orders.map((order, index) => {
                        <div>{order.number}</div>
                    })

                    : <div className='no-orders-container'>
                        You have no orders Yet</div>}

            </Fragment>
    )
}

export default Orders