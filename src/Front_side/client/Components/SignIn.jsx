import { useState, useEffect } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Loading from '../../../Assets/Images/WEBINA2.png';
import Logo from '../../../Assets/Images/webinai.png';
import { FaSignInAlt } from 'react-icons/fa';

const SignIn = () => {

    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { http, csrf, setAccessToken, getUser, setUser, setAdmin } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [googleURL, setGoogleURL] = useState('');



    useEffect(() => {

        if (getUser) {
            navigate('/');
        } else {
            try {

                setLoading(false);
            } catch (error) {
                Swal.fire({
                    text: error.message,
                });
            }
        }
    }, []);



    const submitForm = async (e) => {
        e.preventDefault();


        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        await csrf();

        await http.post('/api/signin', formData)
            .then(res => {

                if (res.data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                    setAdmin(res.data.user);
                    setAccessToken(res.data.access_token);
                } else {
                    navigate("/");
                    setUser(res.data.user);
                    setAccessToken(res.data.access_token);
                }

                setEmailInput('');
                setPasswordInput('');
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                })
            })
            .catch(err => {
                if (err.status === 401) {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Account not found , sign up ?',
                        icon: 'error',
                        showConfirmButton: true,
                        confirmButtonText: 'Sign up!',
                        confirmButtonColor: 'rgb(var(--heavy-color))',
                        showCancelButton: true,
                        cancelButtonText: 'Cancel',
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                navigate('/signup')
                            }
                        })
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: err.response.data.message,
                        icon: 'error',
                        showConfirmButton: false,
                        confirmButtonText: 'Sign up!',
                        showCancelButton: true,
                    })
                }
                setPasswordInput('');
            })
    }


    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :


            <div className='app__signin'>


                <nav>
                    <img src={Logo} alt="logo" />
                </nav>




                <div className='app__signin__form'>

                    <div className='app__signin__title'>
                        <h2>Log In To Your Account</h2>
                    </div>

                    <form onSubmit={submitForm}>

                        <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                        <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />

                        <div className='app__signin__form__buttons'>

                            <button type='submit' disabled={emailInput === '' || passwordInput === '' ? true : false}>Sign In <FaSignInAlt /></button>

                            <a className='app__google__signup' target='_top' href={googleURL}><AiOutlineGoogle /></a>

                        </div>
                        <p>Don't Have An Account Yet ? <a href='/signup'>Sign Up</a></p>
                        <p>You Forgot Your Account Password ? <a href='/password-reset'>Reset Password</a></p>

                    </form>

                </div>
                <p className='app__copyright__bottom' >All rights reserved <sup>&copy;</sup> WebIna</p>

            </div>

    )
}


export default SignIn