import axios from 'axios';
import cookie from 'js-cookie';
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser'

const VerifyEmail = () => {

    const { http } = AuthUser();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        postFetching();

    })


    const postFetching = async () => {


        await http.get(`/email/verify/${params.email}/${params.token}`)
            .then(res => {
                navigate(`/email/check-verify/${params.email}/${params.token}`);
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div>Loading...</div>
    )
}

export default VerifyEmail