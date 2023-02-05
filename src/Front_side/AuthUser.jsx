import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import Swal from 'sweetalert2';
import { MdErrorOutline } from 'react-icons/md';

export default function AuthUser() {
    const navigate = useNavigate();

    const getToken = () => {
        return cookie.get('token');
    }

    const getUser = () => {
        return cookie.get('user');
    }



    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user, token) => {
        cookie.set('token', token, { secure: true, sameSite: 'none' });
        cookie.set('user', user, { secure: true, sameSite: 'none' });

        navigate('/');
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });


    const sec_http = cookie.get('token') ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
            "user_token": getToken()
        }
    }) : axios.delete;



    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        sec_http
    }
}