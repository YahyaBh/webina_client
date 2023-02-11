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
import { BsArrowLeftShort } from 'react-icons/bs';
import moment from 'moment';
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
                console.log(orders);

            }).catch(err => {
                Swal.fire({
                    title: 'Error',
                    text: err.message,
                    icon: 'error'
                })
            });
        setLoading(false);



    }

    const orderStatus = (status) => {
        if (status === 'completed') {
            return 'col col-4 completed';
        } else if (status === 'pending') {
            return 'col col-4 pending';
        } else if (status === 'processing') {
            return 'col col-4 processing';
        } else if (status === 'decline') {
            return 'col col-4 decline';
        }
    }


    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div >
            :
            <Fragment>
                <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                    <Navbar userData={JSON.parse(cookie.get('user'))} />
                </div>

                <div className='arrow-back'>
                    <a href={`/`}>
                        <BsArrowLeftShort />
                    </a>
                </div>


                <div className="orders-container">

                    <div className="container">
                        <h2>Orders History</h2>
                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Order Number</div>
                                <div className="col col-2">Website Name</div>
                                <div className="col col-3">Total Price</div>
                                <div className="col col-4">Order Status</div>
                                <div className="col col-4">Order Date</div>
                            </li>
                            {orders && orders.length > 0 ?
                                orders.map((order, index) => (
                                    <a href={`/order/${order.order_number}/${cookie.get('token')}/${JSON.parse(cookie.get('user')).id}`}>

                                        <li className="table-row" >
                                            <div className="col col-1" data-label="Order Number">{order.order_number}</div>
                                            <div className="col col-2" data-label="Website Name">{order?.notes}</div>
                                            <div className="col col-3" data-label="Total Price">{order?.grand_total ? order.grand_total + '$' : ''}</div>
                                            <div className={orderStatus(order.status)} data-label="Order Status">{order.status}</div>
                                            <div className="col col-5" data-label="Order Date">{order ? moment(order.created_at.split('T')[0] + ' ' + order.created_at.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</div>
                                        </li>
                                    </a>

                                ))
                                :
                                <div className='no-orders-container'>
                                    You have no orders Yet
                                </div>}


                        </ul>
                    </div>
                </div>



            </Fragment >
    )
}

export default Orders