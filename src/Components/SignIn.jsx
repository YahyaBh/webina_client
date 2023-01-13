import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

const SignIn = () => {


    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const submitForm = function (e) {
        e.preventDefault();

        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)

        axios.post('/api/auth/signin', formData)
            .then(res => {
                console.log(res.data)
            })
    }


    return (
        <div>
            <Navbar />

            <form onSubmit={submitForm}>

                <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />


                <button type='submit'>Sign In</button>


            </form>

        </div>
    )
}

export default SignIn