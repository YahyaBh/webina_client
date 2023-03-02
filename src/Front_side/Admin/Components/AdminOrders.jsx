import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'
import Loading from '../../pages/Loading'
import Swal from 'sweetalert2'

const AdminOrders = () => {

    const [positionOrders, setPositionOrders] = useState('All')
    const [orders, setOrders] = useState([])
    const [websites, setWebsites] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersOrders, setUsersOrders] = useState([])

    const [loading, setLoading] = useState(true)


    const { getAdmin, admin_http, accessToken } = AuthUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (!getAdmin && accessToken) {
            getDataFromAPI();
        } else {
            navigate('/signin', { replace: true })
        }
    }, [])


    const getDataFromAPI = async () => {

        await admin_http?.post('/api/admin/orders', { type: positionOrders })
            .then(res => {
                setOrders(res.data.orders);
                setWebsites(res.data.websites);
                setUsers(res.data.users);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
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

    const changeTheValue = async (e) => {
        if (e === positionOrders) {
            return
        } else {
            setPositionOrders(e);
            setLoading(true);
            await admin_http?.post(`/api/admin/orders/`, { type: positionOrders })
                .then(res => {
                    setOrders(res.data.orders);
                    setLoading(false);
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        text: err.message,
                        title: 'Oops...',
                    })
                })
        }
    }

    return (
        loading ?
            <Loading />
            :
            <div>
                <SideBar />

                <div className="container-admin-orders">
                    <div className='head-admin-orders'>
                        <h2>{positionOrders} Orders</h2>
                    </div>

                    <div className='admin-order-table'>
                        <div className='admin-order-table-header'>
                            <div className='head-row row'>
                                <div className='col-lg-4'><h4>Order Number</h4></div>
                                <div className='col-lg-1'><h4>User</h4></div>
                                <div className='col-lg-1'><h4>Product</h4></div>
                                <div className='col-lg-1'><h4>Is Paid</h4></div>
                                <div className='col-lg-1'><h4>Price</h4></div>
                                <div className='col-lg-2'><h4>Payment Method</h4></div>
                                <div className='col-lg-1'>
                                    <select className='select-input-orders' value={positionOrders} onChange={e => changeTheValue(e.target.value)}>
                                        <option value="All">All</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Decline">Declined</option>
                                        <option value="Confirmed">Confirmed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='admin-order-table-body'>
                            {orders ? orders.map((order, index) => (
                                <a href={`/admin/order/${order.order_number}`} className='admin-order-table-row row' key={index}>
                                    <div className='col-lg-4'><h5>{order.order_number}</h5></div>
                                    <div className='col-lg-1'><h5>{users?.find(user => user.id === order.user_id).first_name}</h5></div>
                                    <div className='col-lg-1'><h5>{websites?.find(website => website.token === order.website_token).website_name}</h5></div>
                                    <div className='col-lg-1'><h5>{order.is_paid === 1 ? 'Yes' : 'No'}</h5></div>
                                    <div className='col-lg-1'><h5>{order.grand_total}$</h5></div>
                                    <div className='col-lg-2'><h5>{order.payment_method}</h5></div>
                                    <div className='col-lg-1'><h5 className={orderStatus(order.status)}>{order.status}</h5></div>
                                </a>
                            )) :
                                positionOrders === 'All' ?
                                    <div className='admin-order-table-row row'>
                                        <div className='col-lg-12'><h3>No orders Availabele Yet</h3></div>
                                    </div> :
                                    <div className='admin-order-table-row row'>
                                        <div className='col-lg-12'><h3>No orders Matching This Type Found</h3></div>
                                    </div>}
                        </div>
                    </div>
                </div>


            </div>
    )
}

export default AdminOrders