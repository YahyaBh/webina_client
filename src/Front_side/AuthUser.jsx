import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import Swal from 'sweetalert2';
import { MdErrorOutline } from 'react-icons/md';

export default function AuthUser() {

    const navigate = useNavigate();

    const getToken = () => {
        if (cookie.get('token')) {
            return cookie.get('token');
        } else {
            return cookie.get('admin_token');
        }
    }

    const getUser = () => {
        return cookie.get('user');
    }


    const AdminChecker = axios.post("http://localhost:8000/api/admin/check", { admin_token : getToken() , email : 'yahyabouhsine@protonmail.com' });



    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [admin, setAdmin] = useState(false);



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
    }) : null;

    const admin_http = cookie.get('admin_token') ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
            "admin_token": getToken()
        }
    }) : null;

    const image_upload = cookie.get('token') ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`,
            "user_token": getToken()
        }
    }) : null;



    return {
        token,
        user,
        getToken,
        AdminChecker,
        admin,
        http,
        sec_http,
        image_upload,
        admin_http
    }
}