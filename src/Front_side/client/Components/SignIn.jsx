import { useState, useEffect } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Loading from '../../../Assets/Images/WEBINA2.png';
import Logo from '../../../Assets/Images/webinai.png';
import { FaSignInAlt } from 'react-icons/fa';

const SignIn = () => {

    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const { http, csrf , googleLink , getUser} = AuthUser();
    const [loginUrl, setLoginUrl] = useState(null);
    const [loading, setLoading] = useState(true);




    useEffect(() => {


        
    }, []);



    const submitForm = async (e) => {
        e.preventDefault();


        const formData = new FormData()

        formData.append('email', emailInput)
        formData.append('password', passwordInput)

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        await csrf();

        await http.post('/login', formData)
            .then(res => {
                if (res.data.admin) {
                    navigate("/admin/dashboard");
                    getUser();
                    setEmailInput('');
                    setPasswordInput('');
                    Toast.fire({
                        icon: 'success',
                        title: 'Welcome Back Admin!'
                    })
                } else {
                    navigate("/");
                    getUser();
                    setEmailInput('');
                    setPasswordInput('');
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    })
                }
                console.log(res.data)
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,
                })
                // setPasswordInput('');
            })
    }


    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :


            <div className='app__signin'>


                <nav>
                    <img src={Logo} alt="logo" />
                </nav>




                <div className='app__signin__form'>

                    <div className='app__signin__title'>
                        <h2>Log In To Your Account</h2>
                    </div>

                    <form onSubmit={submitForm}>

                        <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                        <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />

                        <div className='app__signin__form__buttons'>

                            <button type='submit'>Sign In <FaSignInAlt /></button>

                            <a className='app__google__signup' target='_top' href={googleLink}><AiOutlineGoogle /></a>

                        </div>
                        <p>Don't Have An Account Yet ? <a href='/signup'>Sign Up</a></p>

                    </form>

                </div>
                <p style={{ position: 'absolute', bottom: 0, margin: '5px', color: 'rgb(var(--white-color))' }}>All rights reserved <sup>&copy;</sup> WebIna</p>

            </div>

    )
}


export default SignIn