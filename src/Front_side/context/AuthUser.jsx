import axios from 'axios';
import cookie from 'js-cookie';
import { useState } from 'react';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = "true";
axios.defaults.headers.common["Access-Control-Max-Age"] = "1800";
axios.defaults.headers.common["Access-Control-Allow-Headers"] = "content-type";
axios.defaults.headers.common["Access-Control-Allow-Methods"] = "PUT, POST, GET, DELETE, PATCH, OPTIONS";

export default function AuthUser() {

    const getAdmin = cookie.get('__ADMINISTRAOT_DATA') ? cookie.get('__ADMINISTRAOT_DATA') : null;
    const setAdmin = (data) => { cookie.set('__ADMINISTRAOT_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }


    const getUser = cookie.get('__USER_DATA') ? (cookie.get('__USER_DATA')) : null;
    const setUser = (data) => { cookie.set('__USER_DATA', JSON.stringify(data), { sameSite: 'Lax', secure: true, expires: 3 }) }

    const [user, setuser] = useState(getUser ? JSON.parse(getUser) : null);
    const [admin, setuseradmin] = useState(getAdmin ? JSON.parse(getAdmin) : null);



    const getToken = cookie.get('TOKEN_') ? cookie.get('TOKEN_') : null;
    const setToken = (data) => { cookie.set('TOKEN_', data, { sameSite: 'Lax', secure: true, expires: 3 }) }

    const accessToken = cookie.get('__ACCESS_TOKEN') ? cookie.get('__ACCESS_TOKEN') : null;
    const setAccessToken = (data) => { cookie.set('__ACCESS_TOKEN', data, { sameSite: 'Lax', secure: true, expires: 3 }) };


    const http = axios.create({
        baseURL: 'http://localhost:8000',
    })

    const csrf = async () => await http.get('/sanctum/csrf-cookie');


    const sec_http = getUser ? axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;

    const image_upload = getUser || getAdmin ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;

    const admin_http = getAdmin ? axios.create({
        baseURL: "http://localhost:8000/",
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }) : null;



    return {
        http,
        csrf,
        sec_http,
        image_upload,
        user,
        getUser,
        setUser,
        getToken,
        setToken,
        setAccessToken,
        admin,
        setAdmin,
        admin_http

    }
}