import moment from 'moment';
import React, { useEffect, useState, } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Loading from '../../pages/Loading';
import SideBar from './SideBar';


const AdminOrder = () => {

    const { id } = useParams();
    const { admin_http, getAdmin, accessToken, file_upload } = AuthUser();

    const navigate = useNavigate();

    const [order, setOrder] = useState([]);
    const [client, setClient] = useState([]);
    const [website, setWebsite] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && getAdmin && accessToken) {
            getOrderData(id);
            setLoading(false);
        } else {
            navigate('/login');
        }
    }, [])


    const getOrderData = async (id) => {
        await admin_http.post(`/api/admin/order`, { id: id })
            .then((res) => {
                setOrder(res.data.order);
                setClient(res.data.client);
                setWebsite(res.data.website);
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            navigate('/admin/orders')
                        }
                    })
            })
    }

    const setStatus = async (id, status) => {
        setLoading(true);

        const orderData = new FormData();

        orderData.append('id', id);
        orderData.append('status', status);

        await admin_http.post(`/api/admin/order/status`, orderData)
            .then(res => {
                setOrder(res.data.order);
                setLoading(false);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            navigate('/admin/orders')
                        }
                    })
            })
    }


    const uploadFile = async (e) => {
        setLoading(true);

        const fileData = new FormData();

        fileData.append('order_token', order.order_number)
        fileData.append('file', e.target.files[0])



        file_upload.post('/admin/sendFile/order', fileData)
            .then(res => {
                if (order.status !== 'completed') {
                    setStatus(order.id, 'completed')
                } else {
                    Swal.fire({
                        title: 'Success',
                        text: 'File Successfully Uploaded'
                    })
                }
                setLoading(false);
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message,
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            navigate('/admin/orders')
                        }
                    })
            })

    }

    return (
        loading ?
            <Loading />
            :
            <div>
                <SideBar />


                <div className='order-container'>
                    <div className='order-header'>
                        <h2>Order Detials</h2>
                        <div className='order-details'>
                            <h4>Order Id : {order?.id}</h4>
                            <h4>Order Number : {order?.order_number}</h4>
                            <h4>Order Price : {order?.grand_total}$</h4>
                            <h4>Order Is Paid : {order?.is_paid && order?.is_paid === 1 ? 'Yes' : 'No'}</h4>
                            <h4>Order Status : {order?.status}</h4>
                            <h4>Order Payment Method : {order?.payment_method}</h4>
                            <h4>Client Registration Date : {order ? moment(order?.created_at?.split('T')[0] + ' ' + order?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h4>
                            <h3 style={{ color: 'green', fontFamily: 'Louis-Bold' }}>{order?.status === 'completed' ? 'Order is successfuly completed' : ''}</h3>
                            <div className='order-buttons'>
                                <button className='confirmation-button' onClick={order?.status === 'processing' ? e => setStatus(order?.id, 'completed') : ''} disabled={order?.status === 'processing' ? order?.status === 'completed' ? true : false : true}>Confirm Order</button>
                                <button className='process-button' onClick={order?.status === 'processing' || order?.status === 'pending' ? e => setStatus(order?.id, 'processing') : 'nutt'} disabled={order?.status === 'processing' || order?.status === 'completed' ? true : false}>Process Order</button>
                                <button className='cancel-button' onClick={e => setStatus(order?.id, 'decline')} disabled={order?.status === 'completed' || order?.status === 'processing' ? true : false}>Cancel Order</button>
                            </div>

                            {order?.status === 'processing' ? <input className='file' type="file" name='file-website' id='file-website' onChange={e => uploadFile(e)} /> : ''}
                        </div>
                    </div>
                    <div className='client-web-informations'>
                        <div className='client-container'>
                            <h2>Client Informations</h2>
                            <div className="client-details">
                                <img src={`http://localhost:8000/uploads/users/${client?.avatar}`} alt='client-avatar' width={'100px'} />
                                <h4>Client Id : {client?.id}</h4>
                                <h4>Client Name : {client?.full_name}</h4>
                                <h4>Client Email : {client?.email}</h4>
                                <h4>Client Phone : {client?.phone ? client.phone : 'Not Available'}</h4>
                                <h4>Client Registration Date : {client ? moment(client?.created_at?.split('T')[0] + ' ' + client?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h4>
                            </div>
                        </div>
                        <div className='website-informations'>
                            <h2>Website Informations</h2>
                            <div className="website_details">
                                <img src={`${website?.image}`} alt='website-avatar' width={'300px'} />
                                <h4>Website Id : {website?.id}</h4>
                                <h4>Website Name : {website?.website_name}</h4>
                                <h4>Website Description : {website?.description}</h4>
                                <h4>Website Category : {website?.category}</h4>
                                <h4>Website Price : {website?.price}$</h4>
                                <h4>Website Dev Time : {website?.developing_Time}</h4>
                                <h4>Website Status : {website?.status}</h4>
                                <h4>Website Specifications : {website?.specifications}</h4>
                                <h4>Website Creating Date : {website ? moment(website?.created_at?.split('T')[0] + ' ' + website?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h4>
                                <button onClick={() => { }}>View Website</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
    )
}

export default AdminOrder