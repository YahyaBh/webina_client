import axios from 'axios'
import cookie from 'js-cookie'
import { useEffect } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loading from '../../../Assets/Images/WEBINA2.png';





const Logout = () => {

    const navigate = useNavigate();


    useEffect(() => {
        if (cookie.get('token')) {
            axios.post('http://localhost:8000/api/logout')
                .then((res) => {
                    if (res.status === 200) {

                        navigate('/');
                        cookie.remove('token');
                        cookie.remove('user');
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: res.data.message,
                            icon: <MdErrorOutline />,
                            showConfirmButton: false,
                            confirmButtonText: 'Sign up!',
                            showCancelButton: true,

                        })
                    }
                })

        }
    })

    return (
        <div className='loading-container'>
            <img src={Loading} alt="loading-web" />
        </div>
    )
}

export default Logout