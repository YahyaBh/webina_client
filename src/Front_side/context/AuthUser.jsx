import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import Swal from 'sweetalert2';
import { MdErrorOutline } from 'react-icons/md';

export default function AuthUser() {

    const navigate = useNavigate();



    const http = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true,
    })


    const getUser = cookie.get('user') ? JSON.parse(cookie.get('user')) : null;
    const setUser = (data) => { cookie.set('user', JSON.stringify(data)) }

    const [admin, setAdmin] = useState(false);
    const [googleLink, setGoogleUrl] = useState(null);


    const csrf = () => http.get('/sanctum/csrf-cookie');

    const sec_http = getUser ? axios.create({
        baseURL: "http://localhost:8000/api",
        withCredentials: true,
    }) : null;

    const image_upload = getUser ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'content-type': 'multipart/form-data',
        },
        withCredentials: true,
    }) : null;

    const googleLogin = () => http('/api/auth', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then((response) => {
        if (response.data.status === 'success') {
            return response.data.url
        } else {
            new Error('Something went wrong!')
        }
    })
        .catch((error) => console.error(error));



    return {
        googleLogin,
        admin,
        http,
        csrf,
        sec_http,
        image_upload,
        getUser,
        setUser
    }
}