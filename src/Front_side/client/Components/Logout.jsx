import cookie from 'js-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../../../Assets/Images/WEBINA2.png';
import AuthUser from '../../context/AuthUser'





const Logout = () => {

    const navigate = useNavigate();

    const { csrf, sec_http, admin_http, user, admin } = AuthUser();

    useEffect(() => {


        if (user) {
            csrf();
            sec_http.post("/logout")
                .then((res) => {
                    cookie.remove('__ADMINISTRAOT_DATA');
                    cookie.remove('__USER_DATA');
                    cookie.remove('TOKEN_');
                    cookie.remove('__ACCESS_TOKEN');
                    navigate('/');
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: err.data.message,
                        icon: 'error',
                        showConfirmButton: false,
                        confirmButtonText: 'Sign up!',
                        showCancelButton: true,

                    })
                })
        } else if (admin) {
            csrf();
            admin_http.post("/logout")
                .then((res) => {
                    cookie.remove('__ADMINISTRAOT_DATA');
                    cookie.remove('__USER_DATA');
                    cookie.remove('__ACCESS_TOKEN');
                    navigate('/');
                })
                .catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        showConfirmButton: false,
                        confirmButtonText: 'Sign up!',
                        showCancelButton: true,

                    })
                })
        }
        else {
            navigate('/signin');
        }
    })

    return (
        <div className='loading-container'>
            <img src={Loading} alt="loading-web" />
        </div>
    )
}

export default Logout