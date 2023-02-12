import cookie from 'js-cookie';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import AuthUser from '../../AuthUser';
import Loading from '../../../Assets/Images/WEBINA2.png'
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
                cookie.set('token', JSON.stringify(data.data.access_token) , { secure: true, sameSite: 'none' });
                cookie.set('user', JSON.stringify(data.data.user) , { secure: true, sameSite: 'none' });
                setLoading(false);
                navigate('/');
            });

    }, []);

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