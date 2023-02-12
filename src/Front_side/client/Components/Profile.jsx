import cookie from 'js-cookie'
import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment'
import Navbar from './Navbar'
import AuthUser from '../../AuthUser'
import Swal from 'sweetalert2'
import { MdErrorOutline } from 'react-icons/md'
import { AiFillCamera } from 'react-icons/ai'
import Loading from '../../../Assets/Images/WEBINA2.png';
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie'

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const [loader, setLoader] = useState(true);
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState('');
    const [newPass, setNewPass] = useState('');
    const [image, setImage] = useState(null);
    const [imageValue, setImageValue] = useState(null);




    const token = cookie.get('token');
    const navigate = useNavigate();
    const { sec_http , image_upload} = AuthUser();

    useEffect(() => {
        if (token) {
            const formData = new FormData()

            formData.append('email', JSON.parse(cookie.get('user')).email);
            formData.append('remember_token', cookie.get('token'));
            try {
                sec_http.post('/user', formData)
                    .then(res => {

                        if (res.status === 200) {
                            setUserData(res.data.user);
                            setName(res.data.user.name);
                            setEmail(res.data.user.email);
                            setImage(res.data.user.avatar);
                            setLoader(false);
                        }

                        if (res.status === 401) {
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
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
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: <MdErrorOutline />,
                    showConfirmButton: false,
                    confirmButtonText: 'Sign up!',
                    showCancelButton: true,

                })
            }
        }
        else {
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

                    if (res.status === 401) {
                        setTimeout(() => {
                            navigate('/profile');
                        }, 2000);
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
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.message,
                icon: <MdErrorOutline />,
                showConfirmButton: false,
                confirmButtonText: 'Sign up!',
                showCancelButton: true,

            })
        }
    }

    const imageSwal = withReactContent(Swal);

    const handleChangeImage = (e) => {
        e.preventDefault();
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageValue(e.target.files[0].name);
    }

    const handleUpdateImage = async (e) => {
        e.preventDefault();

        const imageData = new FormData();

        imageData.append('avatar', image);
        imageData.append('user_id', userData.id);
        imageData.append('user_token', Cookies.get('token'));
        console.log(image);
        

        try {
            await image_upload.post('/user/update/avatar', imageData)
                .then((res) => {
                    setImage(res.data.avatar);
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
            <Fragment>
                <div style={{ backgroundColor: 'black' }}>
                    <Navbar />
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body modal-body-profile">
                                <img style={{ margin: 'auto' }} src={image} alt={userData.full_name} />
                                <input type="file" name='image' onChange={handleChangeImage} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={handleUpdateImage} className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='app__profile__container'>
                    <div className='app__profile__container__left'>
                        <div data-toggle="modal" data-target="#exampleModalCenter" className='app__profile__container__left__img__container'>
                            <img className='app__profile__container__left__img' src={userData ? userData.avatar : ''} alt='profile' />
                            <AiFillCamera title='Change picture' />
                        </div>
                        <h3>{userData ? userData.full_name : ''}</h3>
                        <h5>Created {userData ? moment(userData.created_at.split('T')[0] + ' ' + userData.created_at.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</h5>
                    </div>
                    <div className='app__profile__container__right'>
                        <div className='app__profile__container__right__form__container'>
                            <form onSubmit={updateUser}>

                                <label htmlFor="name" >Username</label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' name='name' />
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' name='email' />
                                <label htmlFor="password">Change Password</label>
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' name='password' />
                                <input type='password' value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder='New Password' name='new_password' />

                                <button type='submit' >UPDATE USER</button>

                                <button className='app__profile__delete__accout' onClick={deletUser}>DELETE ACCOUNT</button>

                            </form>




                        </div>
                    </div>
                </div>
            </Fragment>
    )
}


const ImageUpdating = () => {
    <p>Welcome to Sweet Alert and React</p>
}

export default Profile