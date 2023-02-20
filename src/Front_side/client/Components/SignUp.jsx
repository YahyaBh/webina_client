import { useEffect, useLayoutEffect, useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { MdErrorOutline } from 'react-icons/md';
import AuthUser from '../../context/AuthUser';
import Loading from '../../../Assets/Images/WEBINA2.png';
import Logo from '../../../Assets/Images/webinai.png';
import { FaSignInAlt } from 'react-icons/fa';


const SignUp = () => {
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [verify_passwordInput, setVerPasswordInput] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const { http, csrf, getToken, setToken, setUser, setAccessToken, setAdmin } = AuthUser();
    const [registerUrl, setRegisterUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    const [id, setId] = useState('');

    useLayoutEffect(() => {
        if (getToken) {
            navigate('/');
        }
    })


    useEffect(() => {
        if (registerUrl) {
            return;
        } else {
            getGoogleUrl()
        }
    })

    const getGoogleUrl = async function () {
        await http.get('http://localhost:8000/api/auth')
            .then((response) => {
                if (response.status === 200) {
                    setRegisterUrl(response.data.url);
                    setLoading(false);
                }
            })
            .catch((error) => console.error(error.message));
    }


    const submitForm = async function (e) {
        e.preventDefault();

        if (passwordInput === verify_passwordInput) {
            Swal.fire({
                title: 'Just a second...',
                html: '<img src="http://localhost:3000/Images/Infinity-1s-200px.gif">',
                customClass: {
                    icon: 'no-border'
                },
                showConfirmButton: false,
                background: '#f1f2f3'
            })

            const formData = new FormData()

            formData.append('email', emailInput)
            formData.append('password', passwordInput)
            formData.append('password_confirmation', verify_passwordInput)
            formData.append('first_name', firstName)
            formData.append('last_name', lastName)


            const checkEmailData = new FormData()


            await http.post('/api/signup', formData)
                .then(res => {
                    if (res.status === 200) {
                        checkEmailData.append('email', emailInput)
                        checkEmailData.append('token', res.data.token)
                        csrf();
                        http.post('/api/email/verifiction', checkEmailData)
                            .then(res_ver => {
                                if (res_ver.status === 200) {
                                    setId(res.data.id);

                                    Swal.fire({
                                        title: 'Registred!',
                                        text: 'Please check your email to verify your account.',
                                        icon: "warning",
                                        showConfirmButton: true,
                                        confirmButtonColor: '#000',
                                        confirmButtonText: "I checked it!",
                                    }).then((res) => {
                                        if (res.isConfirmed) {
                                            checkVerification()
                                        }
                                    });
                                } else {
                                    Swal.fire({
                                        title: 'Error!',
                                        text: res.data.message,
                                        icon: <MdErrorOutline />,
                                        showConfirmButton: false,
                                        confirmButtonText: 'Sign up!',
                                        showCancelButton: true,

                                    })
                                }
                            })
                    }
                })
                .catch((err) => {
                    if (err.status === 400) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Email already exists!',
                            text: 'Looks like this email is already in use.',
                            confirmButtonText: 'Sign in!',
                            confirmButtonColor: '#2c2827'
                        })
                            .then((res) => {
                                if (res.isConfirmed) {
                                    navigate('/signin')
                                }
                            })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.response.data.message,
                            confirmButtonColor: '#000',
                            style: 'background-color: #f44336;',
                        })
                            .then(res => {
                                if (res.isConfirmed) {
                                    setPasswordInput('');
                                    setVerPasswordInput('');
                                }
                            })
                    }
                })

        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords does not match',
                icon: 'error',
                showConfirmButton: false,
                confirmButtonText: 'Sign up!',
                showCancelButton: false,
            })
        }
    }


    const checkVerification = async () => {

        const checkEmail = new FormData();

        checkEmail.append('email', emailInput)


        await http.post(`/api/email/verifiction/check`, checkEmail)
            .then(res => {
                if (res.status === 200) {
                    if (res.data.user.role === 'admin') {
                        setAccessToken(res.data.access_token);
                        setAdmin(res.data.user);
                        navigate(`/admin/dashboard`);

                    } else {
                        setAccessToken(res.data.access_token)
                        setUser(res.data.user);
                        navigate(`/`);
                    }

                    Swal.fire({
                        title: 'Welcome To WebIna!',
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonColor: '#ffe662',
                        confirmButtonText: "OK!",
                    })
                    setFirstName('');
                    setLastName('');
                    setEmailInput('');
                    setPasswordInput('');
                    setVerPasswordInput('');
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Email not verified',
                    text: 'Please try to verify your email before signing up',
                    confirmButtonText: 'I Verified it!',
                    confirmButtonColor: '#000',
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            checkVerification();
                        }
                    })
            })
    }


    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div className='app__signup'>

                <nav>
                    <img src={Logo} alt="logo" />
                </nav>

                <div className='app__signup__form'>

                    <div className='app__signup__title'>
                        <h2>Log In To Your Account</h2>
                    </div>

                    <form onSubmit={submitForm}>

                        <div className='app__signup__form__name'>
                            <input type="text" name="first_name" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
                            <input type="text" name="last_name" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />


                        </div>

                        <input type="email" name="email" placeholder="Email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />

                        <input type="password" name="password" placeholder="Password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} />

                        <input type="password" name="verify_pass" placeholder="Verify Password" value={verify_passwordInput} onChange={(e) => setVerPasswordInput(e.target.value)} />


                        <div className='app__signup__form__buttons'>

                            <button type='submit' disabled={firstName === '' || lastName === '' || emailInput === '' || passwordInput === '' || verify_passwordInput === '' ? true : false} >Sign Up <FaSignInAlt /></button>

                            <a className='app__google__signup' target='_top' href={registerUrl}><AiOutlineGoogle /></a>

                        </div>
                        <p>Already Have An Account ? <a href='/signin'>Sign In</a></p>

                    </form>

                </div>
                <p style={{ position: 'absolute', bottom: 0, margin: '5px', color: 'rgb(var(--white-color))' }}>All rights reserved <sup>&copy;</sup> WebIna</p>


            </div>
    )
}

export default SignUp