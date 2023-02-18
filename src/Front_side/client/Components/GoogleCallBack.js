import cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import AuthUser from '../../context/AuthUser';
import Loading from '../../../Assets/Images/WEBINA2.png'
function GoogleCallback() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { http, setUser, setToken } = AuthUser();
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
                setToken(data.data.access_token);
                setUser(data.data.user);
                setLoading(false);
                navigate('/');
            });

    });

    if (loading) {
        return <DisplayLoading />
    }
}

function DisplayLoading() {
    return <div className='loading-container'>
        <img src={Loading} alt="loading-web" />
    </div>
        ;
}


export default GoogleCallback;