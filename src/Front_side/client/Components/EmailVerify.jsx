import axios from 'axios';
import cookie from 'js-cookie';
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser'

const EmailVerify = () => {

    const { http } = AuthUser();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        getFetching();

    })


    const getFetching = async () => {
        await http.get(`/email/check-verify/${params.email}/${params.token}`)
            .then(res => {
                cookie.set('token', params.token , { secure: true, sameSite: 'none' });
                cookie.set('user', JSON.stringify(res.data.user) , { secure: true, sameSite: 'none' });
                navigate('/');
                Swal.fire({
                    icon : 'success',
                    title : 'Email Verified',
                    text : res.data.message
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div>Loading...</div>
    )
}

export default EmailVerify