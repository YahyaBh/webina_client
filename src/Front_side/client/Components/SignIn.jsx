import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext';

const SignIn = () => {


    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');



    const submitForm = async (e) => {
        e.preventDefault();

        const formData = new FormData()

        try {
            formData.append('email', emailInput)
            formData.append('password', passwordInput)

            axios.post('http://localhost:8000/api/signin', formData)
                .then(res => {
                    console.log(res.data)
                    Navigate('/')
                })
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
            }

        }

        // const auth = useContext(AuthContext);
        // const token = auth.token;
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