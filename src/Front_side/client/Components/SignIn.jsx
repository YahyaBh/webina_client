import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { MdErrorOutline } from 'react-icons/md';
import { redirect } from 'react-router-dom';
import { Navigate } from "react-router";
import Swal from 'sweetalert2';
import cookie from 'js-cookie';

const SignIn = () => {


    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');


    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)

        axios.post('http://localhost:8000/api/signin', formData)
            .then(res => {
                if (res.status === 200) {
                    cookie.set('token', res.data.access_token);
                    cookie.set('user', res.data.user);
                    redirect("/")
                    setEmailInput('');
                    setPasswordInput('');
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Sign In Failed! With Error: ' + res.data.message,
                        icon: <MdErrorOutline />,
                        showConfirmButton: false,
                        confirmButtonText: 'Sign up!',
                        showCancelButton: true,
                        showLoader: true,
                    })
                }
            })
    }



    return (
        <div className='app__signin'>


            <div className='app__signin__form'>
                <form onSubmit={submitForm}>
                    <h2>SIGN IN</h2>


                    <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                    <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />


                    <button type="submit" className='app__google__signup'><AiOutlineGoogle /></button>

                    <button type='submit'>Sign In</button>

                    <p>Don't Have An Account Yet ? <a href='/signup'>Sign Up</a></p>

                </form>

            </div>


            <div className='app__signin__form__bg'></div>
        </div>
    )
}


export default SignIn