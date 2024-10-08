import moment from 'moment';
import Pusher from 'pusher-js';
import { Fragment, useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { AiOutlineDownload } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loading from '../../../Assets/Images/WEBINA2.png';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';

const Orders = () => {

    const navigate = useNavigate();

    const { sec_http, user } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState(null);
    const [websites, setwebsites] = useState(null);

    useEffect(() => {

        if (!user) {
            Swal.fire({
                title: 'Your are not logged in',
                text: 'Please login in order continue',
                icon: 'info',
                confirmButtonText: 'Login',
                confirmButtonColor: 'rgb(var(--heavy-color))'
            }).then(function (isConfirm) {
                if (isConfirm) {
                    navigate('/signin');
                }
            });





        } else {
            getOrders();

            sec_http.post("/api/orders", { user_id: user.id })
                .then(res => {
                    setOrders(res.data.orders);
                })

            const pusher = new Pusher("0b92bbc5466ff479ab62", {
                cluster: "eu",
                encrypted: true
            });

            const channel = pusher.subscribe("WebIna");
            channel.bind('orders-changed', function (data) {
                setOrders(data.order);
            });
        }


    }, [])


    const getOrders = async () => {

        const userData = new FormData();

        userData.append('user_id', user.id);

        await sec_http.post(`/api/orders`, userData)
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

    const orderStatus = (status) => {
        if (status === 'completed') {
            return ' col-lg-2 completed';
        } else if (status === 'pending') {
            return ' col-lg-2 pending';
        } else if (status === 'processing') {
            return ' col-lg-2 processing';
        } else if (status === 'decline') {
            return ' col-lg-2 decline';
        }
    }


    const donwloadWebsite = async (e, order) => {
        setLoading(true);
        const orderData = new FormData();

        e.stopPropagation();

        orderData.append('order_token', order.order_number);

        sec_http.post('/api/order/download', orderData, {
            responseType: 'blob'
        })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${order.file}`); //or any other extension
                document.body.appendChild(link);
                link.click();
                setLoading(false);
                Swal.fire({
                    title: 'Downloaded Successfully',
                    text: 'You have successfully downloaded your website to this computer !',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: 'Okay !',
                    customClass: {
                        confirmButton: 'confirm-button-class',
                        title: 'title-class',
                        icon: 'icon-class'
                    },
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error downloading',
                    text: err.message,
                })
            })
    }

    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div >
            :
            <Fragment>
                <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                    <Navbar userData={user} />
                </div>

                <div className='arrow-back'>
                    <a href={`/`}>
                        <BsArrowLeftShort />
                    </a>
                </div>


                <div className="orders-container">

                    <div className="container">
                        <h2>Orders History</h2>
                        <div>

                            <div className='header-orders row'>
                                <h4 className='col-lg-4 col-md-12'>Order Number</h4>
                                <h4 className='col-lg-2 col-md-12'>Website Name</h4>
                                <h4 className='col-lg-2 col-md-12'>Total Price</h4>
                                <h4 className='col-lg-2 col-md-12'>Order Status</h4>
                                <h4 className='col-lg-2 col-md-12'>Order Date</h4>
                            </div>
                            {orders && orders.length > 0 ?
                                orders.map((order, index) => (
                                    <>
                                        <a key={index} className="order-data-each row" href={`/order/${order.order_number}`}>
                                            <h4 className='col-lg-4 col-md-12'><span className='small-screens'>Order Number : </span>{order.order_number}</h4>
                                            <h4 className='col-lg-2 col-md-12'><span className='small-screens'>Website Name : </span>{order?.notes}</h4>
                                            <h4 className='col-lg-2 col-md-12'><span className='small-screens'>Total Price : </span>{order?.grand_total ? order.grand_total + '$' : ''}</h4>
                                            <h4 className={orderStatus(order.status)}><span className='small-screens'>Order Status : </span>{order.status}</h4>
                                            <h4 className='col-lg-2 col-md-12' ><span className='small-screens'>Order Date : </span>{order ? moment(order.created_at.split('T')[0] + ' ' + order.created_at.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h4>
                                        </a>
                                        {order.status === 'completed' ? <button className='download-project-button' onClick={e => donwloadWebsite(e, order)}>Download <span>{order?.notes}</span> <AiOutlineDownload /></button> : ''}
                                    </>

                                ))
                                :

                                <div className='no-orders-container'>
                                    You have no orders Yet
                                </div>}


                        </div>
                    </div>
                </div>


            </Fragment >
    )
}

export default Orders