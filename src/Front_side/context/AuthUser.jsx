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
// axios.defaults.headers.common["Content-Type", "application/json;charset=utf-8"]; // Opening this comment will cause problems

export default function AuthUser() {



    const getUser = cookie.get('user') ? (cookie.get('user')) : null;
    const setUser = (data) => { cookie.set('user', JSON.stringify(data), { sameSite: 'Lax', secure: true }) }

    const [user , setuser] = useState(getUser ? JSON.parse(getUser) : null);


    const getToken = cookie.get('token') ? cookie.get('token') : null;
    const setToken = (data) => { cookie.set('token', data, { sameSite: 'Lax', secure: true }) }

    const accessToken = cookie.get('access_token') ? cookie.get('access_token') : null;
    const setAccessToken = (data) => { cookie.set('access_token', data, { sameSite: 'Lax', secure: true }) };


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

    const image_upload = getUser ? axios.create({
        baseURL: "http://localhost:8000/api",
        headers: {
            'content-type': 'multipart/form-data',
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
        setAccessToken
    }
}