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
        }
    }

    const getAdmin = async () => {
        const { data } = await http.get("/api/user");
        setUser(data);
    };

    const getUser = async () => {
        const { data } = await http.get("/api/user");
        setUser(data);
    };


    const AdminChecker = () => {

        const email = JSON.parse(cookie.get('admin')).email;

        axios.post("http://localhost:8000/api/admin/check", { admin_token: getAdminToken(), email: email })
    };



    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [admin, setAdmin] = useState(false);
    // const [admin_token, setAdminToken] = useState(getAdminToken());
    const [googleLink, setGoogleUrl] = useState(null);





    const http = axios.create({
        baseURL: 'http://localhost:8000',
        withCredentials: true,
    })

    const csrf = () => http.get('/sanctum/csrf-cookie');

    const sec_http = token ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
            "user_token": getToken()
        }
    }) : null;

    // const admin_http = admin_token ? axios.create({
    //     baseURL: "http://localhost:8000/api",
    //     headers: {
    //         "Content-type": "application/json",
    //         "Authorization": `Bearer ${token}`,
    //         "admin_token": getToken()
    //     }
    // }) : null;

    const image_upload = token ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`,
            "user_token": getToken()
        }
    }) : null;

    const googleLogin = async () => {
        http('/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setGoogleUrl(response.data.url);
                    console.log(response.data.url);
                    getUser();
                } else {
                    new Error('Something went wrong!')
                }
            })
            .catch((error) => console.error(error));
    }


    return {
        token,
        user,
        getToken,
        AdminChecker,
        // getAdminToken,
        googleLink,
        admin,
        http,
        csrf,
        sec_http,
        image_upload,
        // admin_http
    }
}