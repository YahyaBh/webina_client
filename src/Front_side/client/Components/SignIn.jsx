import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { MdDone, MdErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'js-cookie';
import AuthUser from '../../AuthUser';
import { useLayoutEffect } from 'react';
import Loading from '../../../Assets/Images/WEBINA2.png';
import Logo from '../../../Assets/Images/webinai.png';
import { FaSignInAlt} from 'react-icons/fa';

const SignIn = () => {

    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { http, setToken } = AuthUser();
    const [loginUrl, setLoginUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    



    useEffect(() => {
        const token = cookie.get('token')
        if (token) {
            navigate('/');
        }

        http('/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setLoading(false);
                    setLoginUrl(response.data.url);

                } else {
                    new Error('Something went wrong!')
                }
            })
            .catch((error) => console.error(error));
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



        http.post('/signin', formData)
            .then(res => {
                if (res.status === 200) {
                    cookie.set('user' , JSON.stringify(res.data.user) , { secure: true, sameSite: 'none' });
                    cookie.set('token', res.data.token , { secure: true, sameSite: 'none' });
                    navigate("/")
                    setEmailInput('');
                    setPasswordInput('');
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                }

            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Password or email is incorrect',
                    icon: <MdErrorOutline />,
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,
                })
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

                            <a className='app__google__signup' target='_top' href={loginUrl}><AiOutlineGoogle /></a>

                            <button type='submit'>Sign In <FaSignInAlt/></button>
                        </div>
                        <p>Don't Have An Account Yet ? <a href='/signup'>Sign Up</a></p>

                    </form>

                </div>
                <p style={{ position: 'absolute', bottom: 0, margin: '5px' , color : 'rgb(var(--white-color))' }}>All rights reserved <sup>&copy;</sup> WebIna</p>

            </div>

    )
}


export default SignIn