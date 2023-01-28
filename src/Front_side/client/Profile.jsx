import cookie from 'js-cookie'
import React from 'react'
import { useState, useEffect, Fragment } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import moment from 'moment/moment'
import Navbar from './Components/Navbar'
import AuthUser from '../AuthUser'
import Swal from 'sweetalert2'
import { MdErrorOutline } from 'react-icons/md'

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [loader, setLoader] = useState(true);

    const token = cookie.get('token');
    const navigate = useNavigate();
    const { http } = AuthUser();

    useEffect(() => {
        if (token) {
            const formData = new FormData()

            formData.append('email', JSON.parse(cookie.get('user')).email);
            formData.append('remember_token', cookie.get('token'));
            try {
                http.post('/user', formData)
                    .then(res => {

                        if (res.status === 200) {
                            setUserData(res.data.user);
                            setLoader(false);
                        }

                        if (res.status === 401) {
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                            Swal.fire({
                                title: 'Error!',
                                text: res.data.message,
                                icon: <MdErrorOutline />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: true,

                            })
                        }

                    })
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: <MdErrorOutline />,
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,

                })
            }
        }
        else {
            navigate('/')
        }
    }, [])



    return (
        loader ?
            <div>Loading...</div>
            :
            <Fragment>
                <div style={{ backgroundColor: 'black' }}>
                    <Navbar />
                </div>



                <div className='app__profile__container'>
                    <div className='app__profile__container__left'>
                        <img className='app__profile__container__left__img' src={userData ? userData.avatar : ''} alt='profile' />
                        <h3>{userData ? userData.name : ''}</h3>
                        <h5>{userData ? moment(userData.created_at.split('T')[0] + ' ' + userData.created_at.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h5>
                    </div>
                    <div className='app__profile__container__right'>

                    </div>
                </div>
            </Fragment>
    )
}

export default Profile