import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';

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
        cookie.set('token' , token);
        cookie.set('user' ,user);

        navigate('/');
    }

    const logout = () => {
        cookie.remove('token');
        cookie.remove('user');
        navigate('/');
    }

    const http = axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });


    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout
    }
}