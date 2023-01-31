import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AiOutlineClockCircle, AiOutlineGoogle } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'js-cookie';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdDone, MdErrorOutline } from 'react-icons/md';
import AuthUser from '../../AuthUser';
import Loading from '../../../Assets/Images/WEBINA2.png';


const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [verify_passwordInput, setVerPasswordInput] = useState('');
    const { http, getToken } = AuthUser();
    const [registerUrl, setRegisterUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const [id, setId] = useState('');
    const [token_checker, setTokenChecker] = useState('');

    useEffect(() => {
        const token = cookie.get('token')
        if (token) {
            navigate('/');
        }
        fetch('http://localhost:8000/api/auth/google', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    setLoading(false);
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setRegisterUrl(data.url))
            .catch((error) => console.error(error));
    }, [])

    const submitForm = function (e) {
        e.preventDefault();

        if (passwordInput === verify_passwordInput) {

            Swal.fire({
                title: 'Just a second...',
                html: '<img src="http://localhost:3000/Images/Infinity-1s-200px.gif">',
                customClass: {
                    icon: 'no-border'
                },
                showConfirmButton: false,
            })

            const formData = new FormData()

            formData.append('email', emailInput)
            formData.append('password', passwordInput)
            formData.append('password_confirmation', verify_passwordInput)
            formData.append('name', name)

            const checkEmailData = new FormData()




            try {
                http.post('/signup', formData)
                    .then(res => {
                        if (res.status === 200) {
                            checkEmailData.append('email', emailInput)
                            checkEmailData.append('token', res.data.access_token)

                            http.post('/email/verification', checkEmailData)
                                .then(res_ver => {
                                    if (res_ver.status === 200) {
                                        setId(res.data.id);
                                        setTokenChecker(res.data.access_token);


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
                            Swal.fire({
                                title: 'Registred!',
                                text: 'Please check your email to verify your account.',
                                icon: "warning",
                                showConfirmButton: true,
                                confirmButtonColor: '#000',
                                confirmButtonText: "I checked it!",
                            }).then(
                                checkVerification
                            );


                        } else if (res.status === 400) {
                            Swal.fire({
                                title: 'Error!',
                                text: res.data.message,
                                icon: <MdErrorOutline />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: true,

                            })

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
            } catch (error) {
                console.error(error);
            }

        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords does not match',
                icon: <RiLockPasswordFill />,
                showConfirmButton: false,
                confirmButtonText: 'Sign up!',
                showCancelButton: false,

            })
        }
    }


    const checkVerification = () => {
        http.post(`/email/verify/${id}/${token_checker}/${emailInput}`)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: 'Welcome To WebIna!',
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonColor: '#ffe662',
                        confirmButtonText: "OK!",
                    })
                    cookie.set('token', res.data.access_token, { secure: true, sameSite: 'none' });
                    cookie.set('user', JSON.stringify(res.data.user), { secure: true, sameSite: 'none' });
                    navigate(`/`);
                    setName('');
                    setEmailInput('');
                    setPasswordInput('');
                    setVerPasswordInput('');
                } else {
                    checkVerification();
                }
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error!',
                    text: error.data.message,
                    icon: <MdErrorOutline />,
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,

                })
            })
    }


    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div className='app__signup'>
                <a href='/' style={{ width: '50px', height: '50px' }}>
                    <img src='./Images/webinai.png' alt='logo' style={{ filter: 'invert(100%)', margin: '10px', position: 'absolute', width: '50px', height: '50px' }} />
                </a>

                <div className='app__signup__form'>
                    <form onSubmit={submitForm}>
                        <h2>SIGN UP</h2>


                        <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />


                        <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                        <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />

                        <input type="password" name="verify_pass" placeholder="Verify Password" value={verify_passwordInput} onChange={(e) => setVerPasswordInput(e.target.value)} />

                        <a type="submit" className='app__google__signup' href={registerUrl}><AiOutlineGoogle /></a>

                        <button type='submit'>Sign Up</button>

                        <p>Already Have An Account ? <a href='/signin'>Sign In</a></p>

                    </form>

                </div>
                <p style={{ position: 'absolute', bottom: 0, margin: '5px' }}>All rights reserved <sup>&copy;</sup> WebIna</p>


                <div className='app__signup__form__bg'>

                </div>
            </div>
    )
}

export default SignUp