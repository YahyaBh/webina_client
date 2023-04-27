import React, { useEffect, useState } from 'react'
import AuthUser from '../../context/AuthUser';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import SideBar from './SideBar';

const User = () => {

    const params = useParams();
    const navigate = useNavigate()

    const { admin_http, getAdmin } = AuthUser()
    const [user, setUser] = useState()

    useEffect(() => {
        if (getAdmin) {
            getUser();
        } else {
            navigate('/signin', { replace: true })
        }
    }, [])


    const getUser = async () => {

        admin_http.get(`/api/admin/user/${params.id}`)
            .then(res => {
                setUser(res.data.user)
            })
            .catch(err => {
                Swal.fire({
                    title: 'Something went wrong',
                    text: `Oops! ${err.message}`
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            navigate('/admin/users');
                        }
                    })
            })

    }

    const banUser = async () => {

        admin_http.post(`/api/admin/user/ban/${params.id}`)
            .then(res => {
                navigate('/admin/users/')
            })
            .catch(err => {
                Swal.fire({
                    title: 'Something went wrong',
                    text: `Oops! ${err.message}`
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            navigate('/admin/users');
                        }
                    })
            })
    }

    const deleteUser = async () => {
        admin_http.delete(`/api/admin/user/${params.id}`)
            .then(res => {
                navigate('/admin/users')
            })
            .catch(err => {
                Swal.fire({
                    title: 'Something went wrong',
                    text: `Oops! ${err.message}`
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            navigate('/admin/users');
                        }
                    })
            })
    }



    return (
        <div>
            <SideBar />



            <div className="user-container">
                <header>
                    <h1>User Details :</h1>
                </header>


                <section>

                    <img src={`http://localhost:8000/uploads/users/${user?.avatar}`} alt={user?.full_name} />
                    <h3><span>Full Name :</span> {user?.full_name}</h3>
                    <h3><span>First Name :</span> {user?.first_name}</h3>
                    <h3><span>Last Name :</span> {user?.last_name}</h3>
                    <h3><span>Phone Number :</span> {user?.phone ? user.phone : 'Not Available'}</h3>
                    <h3><span>Email :</span> {user?.email}</h3>
                    <h3 style={user?.role === 'admin' ? { color: 'green' } : {}} ><span>Role :</span> {user?.role}</h3>
                    <h3><span>Joined At :</span> {user?.created_at}</h3>
                    <h3><span>Verified At :</span> {user?.email_verified_at}</h3>

                    <button className='ban-button' onClick={banUser}>Ban User</button>
                    <button className='del-button' onClick={deleteUser}>Delete User</button>

                </section>
            </div>

        </div>
    )
}

export default User