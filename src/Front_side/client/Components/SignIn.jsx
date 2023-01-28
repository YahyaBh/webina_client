import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { MdDone, MdErrorOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'js-cookie';
import AuthUser from '../../AuthUser';
import { useLayoutEffect } from 'react';

const SignIn = () => {

    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { http, setToken } = AuthUser();




    const [loginUrl, setLoginUrl] = useState(null);


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
                    return response.json();
                }
                throw new Error('Something went wrong!');
            })
            .then((data) => setLoginUrl(data.url))
            .catch((error) => console.error(error));
    }, []);



    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)

        http.post('/signin', formData)
            .then(res => {
                if (res.status === 200) {
                    setToken(JSON.stringify(res.data.user), res.data.access_token);
                    navigate("/")
                    setEmailInput('');
                    setPasswordInput('');
                    Swal.fire({
                        title: 'Success!',
                        text: res.data.message,
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Let's go!",
                        
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
                    setPasswordInput('');
                    alert(res.data.message);

                }

            })



    }



    return (
        <div className='app__signin'>
            <a href='/' style={{ width: '50px', height: '50px' }}>
                <img src='./Images/webinai.png' alt='logo' style={{ filter: 'invert(100%)', margin: '10px', position: 'absolute', width: '50px', height: '50px' }} />
            </a>

            <div className='app__signin__form'>
                <form onSubmit={submitForm}>
                    <h2>SIGN IN</h2>


                    <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                    <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />


                    <a type="submit" className='app__google__signup' href={loginUrl}><AiOutlineGoogle /></a>

                    <button type='submit'>Sign In</button>

                    <p>Don't Have An Account Yet ? <a href='/signup'>Sign Up</a></p>

                </form>

            </div>
            <p style={{ position: 'absolute', bottom: 0, margin: '5px' }}>All rights reserved <sup>&copy;</sup> WebIna</p>

            <div className='app__signin__form__bg'></div>

        </div>
    )
}


export default SignIn