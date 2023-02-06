import cookie from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import AuthUser from '../../AuthUser';

function GoogleCallback() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const { http } = AuthUser();
    useEffect(() => {
        http(`/auth/callback${location.search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                return response;
            })
            .then((data) => {
                cookie.set('token', JSON.stringify(data.data.access_token));
                cookie.set('user', JSON.stringify(data.data.user));
                setLoading(false);
                navigate('/');
            });

    }, []);

    if (loading) {
        return <DisplayLoading />
    }
}

function DisplayLoading() {
    return <div>Loading....</div>;
}


export default GoogleCallback;