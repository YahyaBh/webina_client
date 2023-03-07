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
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BsArrowLeftShort } from 'react-icons/bs';
import Footer from './Footer';


const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [loader, setLoader] = useState(true);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const [imageValue, setImageValue] = useState(null);
    const [selected, setSelected] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const { sec_http, image_upload, getUser, setUser, csrf } = AuthUser();


    useEffect(() => {
        if (getUser) {
            const formData = new FormData()

            formData.append('email', JSON.parse(getUser).email);

            try {
                csrf();
                sec_http.post('/api/profile', formData)
                    .then(res => {
                        if (res.status === 200) {
                            setUserData(res.data.user);
                            setName(res.data.user.full_name);
                            setEmail(res.data.user.email);
                            setImage(res.data.user.avatar);
                            setUser(res.data.user);
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


        formData.append('email', email);
        formData.append('full_name', name);
        formData.append('password', password);
        formData.append('new_password', newPass);
        formData.append('remember_token', cookie.get('token'));

        try {
            sec_http.post('/user/update', formData)
                .then(res => {
                    if (res.status === 200) {
                        setUserData(res.data.user);
                        setName(res.data.user.full_name);
                        setEmail(res.data.user.email);
                        setImage(res.data.user.avatar);
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

    const deletUser = (e) => {
        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            html: `<input type="text" id="password" className="swal2-input" placeholder="Password">`,
            confirmButtonText: 'Delete Account',
            confirmButtonColor: '#DD6B55',
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                const password = Swal.getPopup().querySelector('#password').value
                if (!password) {
                    Swal.showValidationMessage(`Please enter login and password`)
                }
                return { password: password }
            }
        }).then((result) => {
            deleteAccount(result.value.password)
        })


    }


    const deleteAccount = (e) => {
        const formData = new FormData()

        formData.append('email', email);
        formData.append('password_check', e);

        try {
            sec_http.post('/user/delete', formData)
                .then(res => {
                    if (res.status === 200) {
                        navigate('/logout');
                    } else if (res.status === 401) {
                        Swal.fire({
                            title: 'Error!',
                            text: res.data.message,
                            icon: <MdErrorOutline />,
                            showConfirmButton: false,
                            showCancelButton: true,

                        })
                    }

                })
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: <MdErrorOutline />,
                showConfirmButton: false,
                showCancelButton: true,
            })
        }
    }


    return (
        loader ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div style={{ backgroundColor: 'rgba(var(--mid-color) , 0.2)' }}>
                <div style={{ backgroundColor: 'black' }}>
                    <Navbar />
                </div>

                <div className='arrow-back'>
                    <a href={`http://localhost:3000/`}>
                        <BsArrowLeftShort /> <span>Home</span>
                    </a>
                </div>

                <div className="modal fade" id="modalImage" tabindex="-1" aria-labelledby="modalImageChange" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Change Profile Image</h5>
                            </div>
                            <form onSubmit={handleUpdateImage} encType='multipart/form-data'>
                                <div className="modal-body modal-body-profile">
                                    <img style={{ margin: 'auto' }} src={selected ? imageValue : `http://localhost:8000/uploads/users/${image}`} alt={userData.full_name} />
                                    <div className='imageUploadContainer' >
                                        <input type="file" accept="image/png, image/gif, image/jpeg" id='buttonChangeImage' onChange={handleChangeImage} /><FiUpload />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" disabled={selected ? false : true} className="btn btn-Secondary">Change Image</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modalImage">Close</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="modal fade" id="modalImage" tabindex="-1" aria-labelledby="modalImageChange" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Change Profile Image</h5>
                            </div>
                            <form onSubmit={handleUpdateImage} encType='multipart/form-data'>
                                <div className="modal-body modal-body-profile">
                                    <img style={{ margin: 'auto' }} src={selected ? imageValue : `http://localhost:8000/uploads/users/${image}`} alt={userData.full_name} />
                                    <div className='imageUploadContainer' >
                                        <input type="file" accept="image/png, image/gif, image/jpeg" id='buttonChangeImage' onChange={handleChangeImage} /><FiUpload />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" disabled={selected ? false : true} className="btn btn-Secondary">Change Image</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modalImage">Close</button>
                                </div>
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
                                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='name' />
                                    </div>
                                    <div>
                                        <label htmlFor="name" >Last Name</label>
                                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} name='name' />
                                    </div>
                                </div>
                                <label htmlFor="password">Email Address</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} name='email' />
                                <label htmlFor="phone">Phone Number</label>
                                <input type='tel' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} name='phone' />


                                <label htmlFor="phone">Phone Number</label>
                                <input type='tel' value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} name='phone' />

                                <button type="button" data-bs-toggle="modal" data-bs-target="#modalImage">Change Password</button>


                                <div>
                                    <button type='submit' >Save</button>
                                    <a href='/'>Cancel</a>
                                </div>
                                {/* <button className='app__profile__delete__accout' onClick={deletUser}>DELETE ACCOUNT</button> */}

                            </form>




                        </div>
                    </div>
                </div>


                <Footer />
            </div>
    )
}


export default Profile