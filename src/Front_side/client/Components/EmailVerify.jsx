import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser'
import Loading from '../../../Assets/Images/WEBINA2.png'

const EmailVerify = () => {

    const { http, setToken, setUser } = AuthUser();
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
                setToken(res.data.token);
                setUser(res.data.user);
                navigate('/');
                Swal.fire({
                    icon: 'success',
                    title: 'Email Verified',
                    text: res.data.message
                })
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div className='loading-container'>
            <img src={Loading} alt="loading-web" />
        </div>
    )
}

export default EmailVerify