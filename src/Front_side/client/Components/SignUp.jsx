import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';


const SignUp = () => {

    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [verify_passwordInput, setVerPasswordInput] = useState('');


    const submitForm = function (e) {

        if (passwordInput === verify_passwordInput) {

            e.preventDefault();

            const formData = new FormData()

            formData.append('email', emailInput)
            formData.append('password', passwordInput)
            formData.append('name', name)


            axios.post('http://localhost:8000/api/signup', formData)
                .then(res => {
                    console.log(res.data)
                })
        } else {
            e.preventDefault();

            console.log('Passwords do not match');

        }
    }


    return (
        <div className='app__signup'>


            <div className='app__signup__form'>
                <form onSubmit={submitForm}>
                    <h2>SIGN UP</h2>


                    <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />


                    <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                    <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />

                    <input type="password" name="verify_pass" placeholder="Verify Password" value={verify_passwordInput} onChange={(e) => setVerPasswordInput(e.target.value)} />

                    <button type="submit" className='app__google__signup'><AiOutlineGoogle /></button>

                    <button type='submit'>Sign In</button>

                    <p>Already Have An Account ? <a href='/signin'>Sign In</a></p>

                </form>

            </div>


            <div className='app__signup__form__bg'>

            </div>
        </div>
    )
}

export default SignUp