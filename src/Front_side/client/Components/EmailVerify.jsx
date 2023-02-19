import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser'
import Loading from '../../../Assets/Images/WEBINA2.png'

const EmailVerify = () => {

    const { http, setToken, setAdmin, setAccessToken, setUser } = AuthUser();
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {

        getFetching();

    })


    const getFetching = async () => {
        await http.get(`/api/email/verify/${params.email}/${params.token}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(res => {
                if (res.data.user.role === 'admin') {
                    navigate('/admin/dashboard', { replace: true });
                    setAdmin(res.data.user);
                } else {
                    setUser(res.data.user);
                }
                setToken(res.data.token);
                setAccessToken(res.data.token);
                Swal.fire({
                    icon: 'success',
                    title: 'Email Verified',
                    text: res.data.message
                })
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong',
                    text: err.message
                })
                    .then(res => {
                        if (res.isConfirmed) {
                            navigate('/signin', { replace: true });
                        }
                    })
            })
    }

    return (
        <div className='loading-container'>
            <img src={Loading} alt="loading-web" />
        </div>
    )
}

export default EmailVerify