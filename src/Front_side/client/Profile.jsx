import cookie from 'js-cookie'
import React from 'react'
import { useState , useEffect , Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'

const Profile = () => {

    const [userData, setUserData] = useState(null);
    const token = cookie.get('token');

    useEffect(() => {
        if (token) {
            setUserData(JSON.parse(cookie.get('user')));
            console.log(JSON.parse(cookie.get('user')));
        }
    }, [])


    return (
        <Fragment>
            <Navbar />



            <div className='app__profile__container'>
                <div className='app__profile__container__left'>
                    <img className='app__profile__container__left__img' src={userData ?userData.avatar : ''} alt='profile' />
                    <h3>{userData ?userData.name : ''}</h3>
                </div>
                <div className='app__profile__container__right'>

                </div>
            </div>
        </Fragment>
    )
}

export default Profile