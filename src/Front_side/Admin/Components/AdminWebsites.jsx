import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'
import Loading from '../../pages/Loading'
import Swal from 'sweetalert2'

const AdminWebsites = () => {

    const [positionWebsites, setPositionWebsites] = useState('all')
    const [websites, setWebsites] = useState([]);
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true)


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

        await admin_http?.post('/api/admin/websites', { type: positionWebsites })
            .then(res => {
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
        if (e === positionWebsites) {
            return;
        } else {
            setLoading(true);
            await admin_http?.post(`/api/admin/websites/`, { type: e })
                .then(res => {
                    setPositionWebsites(e);
                    setWebsites(res.data.websites);
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
                        <h2 style={{ textTransform: 'capitalize' }}>{positionWebsites} orders</h2>
                    </div>

                    <div className='admin-order-table'>
                        <a href='/admin/website/create'>
                            Add New Website
                        </a>
                        <div className='admin-order-table-header'>
                            <div className='head-row row'>
                                <div className='col-lg-1'><h4>Image</h4></div>
                                <div className='col-lg-4'><h4>Token</h4></div>
                                <div className='col-lg-1'><h4>Name</h4></div>
                                <div className='col-lg-1'><h4>Price</h4></div>
                                <div className='col-lg-1'><h4>Available</h4></div>
                                <div className='col-lg-1'><h4>Category</h4></div>
                                <div className='col-lg-1'><h4>Developing Time</h4></div>
                                <div className='col-lg-1'>
                                    <select className='select-input-orders' value={positionWebsites} onChange={e => changeTheValue(e.target.value)}>
                                        <option value="all">All</option>
                                        <option value="pending">Sold Out</option>
                                        <option value="processing">Low To High</option>
                                        <option value="decline">High To Low</option>
                                        <option value="confirmed">Ordered</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='admin-order-table-body'>
                            {websites ? websites.map((website, index) => (
                                <a href={`/admin/website/${website.token}`} className='admin-order-table-row row' key={index}>
                                    <div className='col-lg-1'><img src={`http://localhost:8000/uploads/websites/${website.image}`} alt={website.website_name} width={'60px'} /></div>
                                    <div className='col-lg-4'><h5>{website.token}</h5></div>
                                    <div className='col-lg-1'><h5>{website.website_name}</h5></div>
                                    <div className='col-lg-1'><h5>${website.price}</h5></div>
                                    <div className='col-lg-1'><h5>{website.status === 'available' ? 'Yes' : 'No'}</h5></div>
                                    <div className='col-lg-1'><h5>{website.category}</h5></div>
                                    <div className='col-lg-1'><h5>{website.developing_Time}</h5></div>
                                    <div className='col-lg-1'><h5 className={orderStatus(website.status)}>{website.status}</h5></div>
                                </a>
                            )) :
                                <div className='admin-order-table-row row'>
                                    <div className='col-lg-12'><h3>No website Matching This Type Found</h3></div>
                                </div>}
                        </div>
                    </div>
                </div>


            </div>
    )
}

export default AdminWebsites