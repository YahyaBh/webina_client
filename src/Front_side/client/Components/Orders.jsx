import cookie from 'js-cookie';
import React from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser'
import Navbar from './Navbar';
import Loading from '../../../Assets/Images/WEBINA2.png'
import Cookies from 'js-cookie';
const Orders = () => {

    const navigate = useNavigate();
    // const params = useParams();

    const { sec_http } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    const [websites, setwebsites] = useState(null);
    const [id, setId] = useState(1);

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
            getOrders();
        }


    }, [])


    const getOrders = async () => {

        const userData = new FormData();

        userData.append('user_token', Cookies.get('token'));

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
                            <a href={`/order/${order.order_number}/${cookie.get('token')}/${JSON.parse(cookie.get('user')).id}`} className='order-item' key={index}>

                                {/* <img src={order.image} alt='order-image' /> */}
                                <div className='order-item-header'>
                                    <p>Order : {order.order_number}</p>

                                    <div className='sec-order-item-details'>
                                        <p>Website name : {order?.notes}</p>
                                        <p>{order?.grand_total ? order.grand_total + '$' : ''}</p>
                                    </div>
                                </div>
                            </a>

                        ))

                        : <div className='no-orders-container'>
                            You have no orders Yet</div>}
                </div>
            </Fragment>
    )
}

export default Orders