import axios from 'axios';
import React, { useState } from 'react'

const SignUp = () => {

    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    const submitForm = function (e) {
        e.preventDefault();

        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)
        formData.append('name', name)


        axios.post('http://localhost:8000/api/signup', formData)
            .then(res => {
                console.log(res.data)
            })
    }


    return (
        <div>
            <form onSubmit={submitForm}>

                <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />


                <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />


                <button type='submit'>Sign In</button>


            </form>

        </div>
    )
}

export default SignUp