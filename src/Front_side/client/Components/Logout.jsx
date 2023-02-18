import axios from 'axios'
import cookie from 'js-cookie'
import { useEffect } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../../../Assets/Images/WEBINA2.png';
import AuthUser from '../../context/AuthUser'





const Logout = () => {

    const navigate = useNavigate();

    const { csrf, sec_http } = AuthUser();

    useEffect(() => {

        csrf();
        sec_http.post("/logout")
            .then((res) => {
                navigate('/');
                cookie.remove('token');
                cookie.remove('user');
                cookie.remove('access_token');
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.data.message,
                    icon: <MdErrorOutline />,
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,

                })
            })

    })

    return (
        <div className='loading-container'>
            <img src={Loading} alt="loading-web" />
        </div>
    )
}

export default Logout