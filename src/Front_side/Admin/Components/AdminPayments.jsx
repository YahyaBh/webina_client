import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'
import Loading from '../../pages/Loading'
import Swal from 'sweetalert2'

const AdminPayments = () => {

    const [positionPayments, setPositionPayments] = useState('all')
    const [payments, setPayments] = useState([])
    const [websites, setWebsites] = useState([]);
    const [users, setUsers] = useState([]);

    const params = useParams();

    const [loading, setLoading] = useState(true)


    const { getAdmin, admin_http, accessToken } = AuthUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (getAdmin && accessToken) {

            if (params) {
                setPositionPayments(params.type)
                getDataFromAPI(params);
            } else {
                getDataFromAPI();
            }

        } else {
            navigate('/signin', { replace: true })
        }
    }, [])


    const getDataFromAPI = async (e) => {
        await admin_http?.post('/api/admin/payments', e.type ? { type: e.type } : { type: positionPayments })
            .then(res => {
                setPayments(res.data.payments);
                setWebsites(res.data.websites);
                setUsers(res.data.users);
                setLoading(false);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
            })


    }

    const paymentStatus = (status) => {
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
        if (e === positionPayments) {
            return;
        } else {
            setLoading(true);
            await admin_http?.post(`/api/admin/payments/`, { type: e })
                .then(res => {
                    setPositionPayments(e);
                    setPayments(res.data.payments);
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

    console.log(users);

    return (
        loading ?
            <Loading />
            :
            <div>
                <SideBar />

                <div className="container-admin-orders">
                    <div className='head-admin-orders'>
                        <h2 style={{ textTransform: 'capitalize' }}>{positionPayments} payments</h2>
                    </div>

                    <div className='admin-order-table'>
                        <div className='admin-order-table-header'>
                            <div className='head-row row'>
                                <div className='col-lg-4'><h4>Payment Number</h4></div>
                                <div className='col-lg-1'><h4>User</h4></div>
                                <div className='col-lg-1'><h4>Product</h4></div>
                                <div className='col-lg-1'><h4>Is Paid</h4></div>
                                <div className='col-lg-1'><h4>Price</h4></div>
                                <div className='col-lg-2'><h4>Payment Method</h4></div>
                                <div className='col-lg-1'>
                                    <select className='select-input-orders' value={positionPayments} onChange={e => changeTheValue(e.target.value)}>
                                        <option value="all">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="decline">Declined</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='admin-order-table-body'>
                            {payments ? payments.map((payment, index) => (
                                <a href={`/admin/payment/${payment.payment_token}`} className='admin-order-table-row row' key={index}>
                                    <div className='col-lg-4'>
                                        <h5>
                                            {payment && payment?.payment_token !== null ? payment?.payment_token.length > 25 ?
                                                `${payment?.payment_token.substring(0, 25)}...` : payment?.payment_token
                                                : ''}
                                        </h5>
                                    </div>
                                    <div className='col-lg-1'><h5>{users?.find((user) =>  payment?.user_id == user?.id).first_name}</h5></div>
                                    <div className='col-lg-1'><h5>{websites?.find(website => website.token === payment.website_token).website_name}</h5></div>
                                    <div className='col-lg-1'><h5>{payment.is_paid === 1 ? 'Yes' : 'No'}</h5></div>
                                    <div className='col-lg-1'><h5>{payment.amount}$</h5></div>
                                    <div className='col-lg-2'><h5>{payment.method}</h5></div>
                                    <div className='col-lg-1'><h5 className={paymentStatus(payment.status)}>{payment.status}</h5></div>
                                </a>
                            )) :
                                <div className='admin-order-table-row row'>
                                    <div className='col-lg-12'><h3>No payments Matching This Type Found</h3></div>
                                </div>}
                        </div>
                    </div>
                </div>


            </div>
    )
}

export default AdminPayments