import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'
import Loading from '../../pages/Loading'
import Swal from 'sweetalert2'
import moment from 'moment'

const Users = () => {

    const [loading, setLoading] = useState(true)
    const [orderBy, setOrderBy] = useState('name');
    const [users, setUsers] = useState([]);

    const { getAdmin, admin_http, accessToken } = AuthUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (getAdmin && accessToken) {
            getDataFromAPI();
        } else {
            navigate('/signin', { replace: true })
        }
    }, [])


    const getDataFromAPI = async () => {

        await admin_http?.post('/api/admin/users', { orderBy: orderBy })
            .then(res => {
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

    const changeTheValue = async (e) => {
        if (e === orderBy) {
            return;
        } else {
            setLoading(true);
            await admin_http?.post(`/api/admin/users`, { orderBy: e })
                .then(res => {
                    setOrderBy(e);
                    setUsers(res.data.orders);
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
                        <h2 style={{ textTransform: 'capitalize' }}>{orderBy} users</h2>
                    </div>
                    <div style={{ float: 'right' }}>
                        <select className='select-input-orders' value={orderBy} onChange={e => changeTheValue(e.target.value)}>
                            <option value="name">Name</option>
                            <option value="newest">Newest</option>
                            <option value="orders">Orders</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>
                    <div className='admin-order-table'>

                        <div className='admin-order-table-header'>

                            <div className='head-row row'>
                                <div className='col-lg-2'></div>
                                <div className='col-lg-1'><h4>Id</h4></div>
                                <div className='col-lg-1'><h4>Name</h4></div>
                                <div className='col-lg-2'><h4>Email</h4></div>
                                <div className='col-lg-2'><h4>Phone Number</h4></div>
                                <div className='col-lg-1'><h4>Orders</h4></div>
                                <div className='col-lg-2'><h4>Created At</h4></div>
                                <div className='col-lg-1'><h4>Banned</h4></div>
                            </div>
                        </div>
                        <div className='admin-order-table-body'>
                            {users ? users.map((user, index) => (
                                <a href={`/admin/user/${user.id}`} className='admin-order-table-row row' key={index}>
                                    <div className='col-lg-2'><img width={'60px'} src={`http://localhost:8000/uploads/users/${user.avatar}`} alt={user.full_name} /></div>
                                    <div className='col-lg-1'><h5>{user.id}</h5></div>
                                    <div className='col-lg-1'><h5>{user.first_name}</h5></div>
                                    <div className='col-lg-2'><h5>{user.email}</h5></div>
                                    <div className='col-lg-2'><h5>{user.phone_number ? user.phone_number : 'Not Available'}</h5></div>
                                    <div className='col-lg-1'><h5>{user.id}$</h5></div>
                                    <div className='col-lg-2'><h5>{user ? moment(user?.created_at?.split('T')[0] + ' ' + user?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h5></div>
                                    <div className='col-lg-1'><h5>{user.is_banned ? 'Yes' : 'No'}</h5></div>
                                </a>
                            )) :
                                <div className='admin-order-table-row row'>
                                    <div className='col-lg-12'><h3>No orders Matching This Type Found</h3></div>
                                </div>}
                        </div>
                    </div>
                </div>


            </div>
    )
}

export default Users