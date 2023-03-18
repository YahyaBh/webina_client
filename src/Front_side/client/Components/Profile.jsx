import cookie from 'js-cookie'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment'
import Navbar from './Navbar'
import AuthUser from '../../context/AuthUser'
import Swal from 'sweetalert2'
import { MdErrorOutline } from 'react-icons/md'
import { AiFillCamera } from 'react-icons/ai'
import { FiUpload } from 'react-icons/fi'
import Loading from '../../../Assets/Images/WEBINA2.png';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { BsArrowLeftShort } from 'react-icons/bs';
import Footer from './Footer';
import swal from 'sweetalert2';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [loader, setLoader] = useState(true);
    const [email, setEmail] = useState(null);
    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmnewPass, setConfirmNewPass] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [imageValue, setImageValue] = useState(null);
    const [selected, setSelected] = useState(false);


    const navigate = useNavigate();

    const { sec_http, image_upload, getUser, setUser, csrf, user, setAccessToken } = AuthUser();


    useEffect(() => {
        if (getUser) {
            const formData = new FormData()

            formData.append('email', user.email);

            try {
                csrf();
                sec_http.post('/api/profile', formData)
                    .then(res => {
                        if (res.status === 200) {
                            setUserData(res.data.user);

                            setFirstName(res.data.user.first_name);
                            setLastName(res.data.user.last_name);
                            setEmail(res.data.user.email);
                            setImage(res.data.user.avatar);
                            setUser(res.data.user);
                            setPhoneNumber(res.data.phonenumber);

                            setLoader(false);
                        }

                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            text: err.response.data.message,
                            title: 'Oops...',
                        })
                    })
            } catch (error) {
                setTimeout(() => {
                    navigate('/');
                }, 2000);
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong!',
                    icon: 'error',
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,

                })
            }
        } else {
            navigate('/')
        }
    }, [])

    const formData = new FormData()

    const updateUser = (e) => {
        e.preventDefault();

        if (email !== userData.email || phonenumber !== userData.phone || firstname !== userData.first_name || lastname !== userData.last_name) {
            formData.append('email', userData.email);
            formData.append('new_email' , email)
            formData.append('phone', phonenumber);
            formData.append('first_name' , firstname)
            formData.append('last_name' , lastname)

            try {
                sec_http.post('/api/user/update', formData)
                    .then(res => {
                        setUserData(res.data.user);
                        setFirstName(res.data.user.first_name);
                        setLastName(res.data.user.last_name);
                        setEmail(res.data.user.email);
                        setImage(res.data.user.avatar);
                        setUser(res.data.user);
                        setPhoneNumber(res.data.user.phone);

                        setLoader(false);
                    })
            } catch (err) {
                console.error(err);
            }


        } else {
            Swal.fire({
                icon: 'info',
                text: 'Please provide different informations!',
                title: 'Empty Fields!',
            })
        }


        try {
            sec_http.post('api/user/update', formData)
                .then(res => {
                    if (res.status === 200) {
                        setUserData(res.data.user);
                        setUser(res.data.user);
                        setFirstName(res.data.user.first_name);
                        setLastName(res.data.user.last_name);
                        setEmail(res.data.user.email);
                        setImage(res.data.user.avatar);

                        if (res.status === 400) {
                            Swal.fire({
                                icon: 'info',
                                title: 'Email Verification!',
                                text: 'Please check your email inbox , and verify your account!',
                                showCancelButton: true,
                                confirmButtonAriaLabel: 'I Verified!'
                            })
                                .then(res => {
                                    if (res.isDenied) {
                                        navigate('/logout');
                                    } else if (res.isConfirmed) {
                                        checkVerification();
                                    }

                                })
                        }

                        navigate('/')
                    }
                })
        } catch (error) {
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: <MdErrorOutline />,
                showConfirmButton: false,
                confirmButtonText: 'Sign up!',
                showCancelButton: true,

            })
        }
    }

    const checkVerification = async () => {

        const checkEmail = new FormData();

        checkEmail.append('email', user.email)


        await sec_http.post(`/api/email/verifiction/check`, checkEmail)
            .then(res => {
                if (res.status === 200) {
                    setAccessToken(res.data.access_token)
                    setUser(res.data.user);
                    navigate(`/profile`);
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

    const handleChangeImage = (e) => {
        e.preventDefault();
        setImageValue(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
        setSelected(true);
    }

    const handleUpdateImage = async (e) => {
        e.preventDefault();

        const imageData = new FormData();

        imageData.append('avatar', image);
        imageData.append('user_id', userData.id);

        try {
            await image_upload.post('/user/update/avatar', imageData)
                .then((res) => {
                    setUserData({ avatar: res.data.avatar });
                    setUser(res.data.user);
                    window.location.reload(true)
                })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: error.message,
            })
        }
    }


    const changePassword = (e) => {
        if (confirmnewPass === newPassword && confirmnewPass !== '' && newPassword !== '') {
            setLoader(true);
            sec_http.post('/user/update/password', { passowrd: password, new_password: newPassword })
                .then(res => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Password changed successfully!',
                        icon: 'success',
                        showCancelButton: true
                    })
                        .then(res => {
                            if (res.isConfirmed) {
                                navigate('/');
                            } else {
                                setLoader(false);
                            }
                        })
                })
                .catch(err => {
                    swal.fire('error', err.message);
                    navigate('/profile');
                })
        }
    }


    return (
        loader ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div className='app__profile'>
                <div style={{ backgroundColor: 'black' }}>
                    <Navbar />
                </div>

                <div className='arrow-back'>
                    <a href={`http://localhost:3000/`}>
                        <BsArrowLeftShort /> <span>Home</span>
                    </a>
                </div>

                <div className="modal fade" id="modalImage" tabIndex="-1" aria-labelledby="modalImageChange" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalImageItitle">Change Profile Image</h5>
                            </div>
                            <form onSubmit={handleUpdateImage} encType='multipart/form-data'>
                                <div className="modal-body modal-body-profile">
                                    <img style={{ margin: 'auto' }} src={selected ? imageValue : `http://localhost:8000/uploads/users/${image}`} alt={userData.full_name} />
                                    <div className='imageUploadContainer' >
                                        <input type="file" accept="image/*" id='buttonChangeImage' onChange={handleChangeImage} /><FiUpload />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" disabled={selected ? false : true} className="btn btn-Secondary">Change Image</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modalPassword" tabIndex="-1" aria-labelledby="modalPasswordLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Change Account Password</h5>
                            </div>
                            <form onSubmit={changePassword} className="new-pass-form">
                                <label htmlFor="password">Password</label>
                                <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />

                                <label htmlFor="new-password">New Password</label>
                                <input type="password" name='new-password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />

                                <label htmlFor="new-password">Confrim New Password</label>
                                <input type="password" name='confirm-new-password' value={confirmnewPass} onChange={e => setConfirmNewPass(e.target.value)} />


                                <button type="submit" className="btn btn-Secondary">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>


                <div className='app__profile__container'>
                    <div className='app__profile__container__left'>
                        <div className='app__profile__container__left__title' >
                            <h2>Edit Profile</h2>
                        </div>
                        <div type="button" data-bs-toggle="modal" data-bs-target="#modalImage" className='app__profile__container__left__img__container'>
                            <img className='app__profile__container__left__img' src={userData ? `http://localhost:8000/uploads/users/${userData?.avatar}` : ''} alt='profile' />
                            <AiFillCamera title='Change picture' />
                        </div>
                    </div>
                    <div className='app__profile__container__right'>
                        <div className='app__profile__container__right__form__container'>
                            <form onSubmit={updateUser}>
                                <div className='app__profile__container__right__form__container__input__name'>
                                    <div>
                                        <label htmlFor="name" >First Name</label>
                                        <input type='text' value={firstname} onChange={(e) => setFirstName(e.target.value)} name='name' />
                                    </div>
                                    <div>
                                        <label htmlFor="name" >Last Name</label>
                                        <input type='text' value={lastname} onChange={(e) => setLastName(e.target.value)} name='name' />
                                    </div>
                                </div>
                                <label htmlFor="password">Email Address</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' />

                                <div className='phonenumber-input'>
                                    <label htmlFor="phone">Phone Number</label>
                                    <PhoneInput limitMaxLength={true} addInternationalOption={false} defaultCountry="MA" flagUrl='./Images/Flags/{XX}.svg' value={phonenumber} onChange={setPhoneNumber} name='phone' />
                                </div>

                                <button data-bs-toggle="modal" data-bs-target="#modalPassword" className='change-pass-but' type="button" >Change Password</button>


                                <div className="buttons-save-canc-profile">
                                    <button type='submit' onClick={e => updateUser} >Save</button>
                                    <a href='/'>Cancel</a>
                                </div>

                            </form>




                        </div>
                    </div>
                </div>


                <Footer />
            </div>
    )
}


export default Profile