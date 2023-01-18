import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineGoogle } from 'react-icons/ai';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import cookie from 'js-cookie';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdDone, MdErrorOutline } from 'react-icons/md';

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

            try {
                axios.post('http://localhost:8000/api/signup', formData)
                    .then(res => {
                        if (res.status === 200) {
                            cookie.set('token', res.data.access_token);
                            cookie.set('user', JSON.stringify(res.data.user));
                            Navigate(`/`);
                            setName('');
                            setEmailInput('');
                            setPasswordInput('');
                            setVerPasswordInput('');

                            Swal.fire({
                                title: 'Success!',
                                text: res.data.user + " has been registered successfully",
                                icon: <MdDone />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: false,
                                showLoader: true,
                            })
                        } else if (res.status === 400) {
                            console.error(res.data.message);

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


            <div className='app__signup__form__bg'>

            </div>
        </div>
    )
}

export default SignUp