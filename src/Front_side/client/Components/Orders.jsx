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
    const [websites, setwebsites] = useState(null);
    const [id, setId] = useState(1);
    const userData = new FormData()

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
        } else {


            userData.append('user_id', id);

            getOrders();

        }


    }, [])


    const getOrders = async () => {


        await sec_http.post(`/orders`, userData)
            .then(res => {
                setOrders(res.data.orders);
                setwebsites(res.data.websites);
            }).catch(err => {
                Swal.fire({
                    title: 'Error',
                    text: err.message,
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

                <div className='orders-container'>
                    {orders && orders.length > 0 ?
                        orders.map((order, index) => (
                            <div className='order-item' key={index}>

                                {/* <img src={order.image} alt='order-image' /> */}
                                <div className='order-item-header'>
                                    <p>Order : {order.token}</p>
                                    <p>Website name : {order?.website?.website_name}</p>
                                    <p>{order?.website?.price ? order.website.price + '$' : ''}</p>
                                </div>
                            </div>

                        ))

                        : <div className='no-orders-container'>
                            You have no orders Yet</div>}
                </div>
            </Fragment>
    )
}

export default Orders