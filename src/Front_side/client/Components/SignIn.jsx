import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../Admin/Components/UserContext';

const SignIn = () => {


    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const submitForm = function (e) {
        e.preventDefault();

        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)

        axios.post('http://localhost:8000/api/signin', formData)
            .then(res => {
                console.log(res.data)
            })
    }

    const auth = useContext(AuthContext);
    const token = auth.token;


    return (
        <div>

            <form onSubmit={submitForm}>

                <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />


                <button type='submit'>Sign In</button>


            </form>

        </div>
    )
}

export default SignIn