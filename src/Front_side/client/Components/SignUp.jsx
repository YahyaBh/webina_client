import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'js-cookie';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdDone, MdErrorOutline } from 'react-icons/md';
import AuthUser from '../../AuthUser';

const SignUp = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [verify_passwordInput, setVerPasswordInput] = useState('');

    const { http, getToken } = AuthUser();

    useLayoutEffect(() => {
        const token = cookie.get('token')
        if (token) {
            navigate('/');
        }
    }, [])

    const submitForm = function (e) {

        if (passwordInput === verify_passwordInput) {

            e.preventDefault();

            const formData = new FormData()

            formData.append('email', emailInput)
            formData.append('password', passwordInput)
            formData.append('password_confirmation', verify_passwordInput)
            formData.append('name', name)

            try {
                http.post('/signup', formData)
                    .then(res => {
                        if (res.status === 200) {
                            cookie.set('token', res.data.access_token);
                            cookie.set('user', JSON.stringify(res.data.user));
                            navigate(`/`);
                            setName('');
                            setEmailInput('');
                            setPasswordInput('');
                            setVerPasswordInput('');

                            Swal.fire({
                                title: 'Success!',
                                text: res.data.message,
                                icon: <MdDone />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: true,
                                showLoader: true,
                            })
                        } else if (res.status === 400) {
                            Swal.fire({
                                title: 'Error!',
                                text: res.data.message,
                                icon: <MdErrorOutline />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: true,
                                showLoader: true,
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
                showLoader: true,
            })
        }




    }


    return (
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

                    <button type="submit" className='app__google__signup'><AiOutlineGoogle /></button>

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