import './Navbar.scss'
import AuthUser from '../../context/AuthUser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import cookie from 'js-cookie';
import { useState } from 'react';
import WebInaLogo from '../../../Assets/Images/webinai.png'

const Navbar = () => {

    const navigate = useNavigate();
    const { getToken } = AuthUser();
    const { token } = AuthUser();

    const [userData, setUserData] = useState({});


    useEffect(() => {
        if (cookie.get('token')) {
            setUserData(JSON.parse(cookie.get('user')));
        }
    }, [])


    const logoutUser = (e) => {
        e.preventDefault();
        if (token !== undefined) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You will logout from this account!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#FFFF66',
                cancelButtonText: 'Not Yet',
                confirmButtonText: 'Yes, sign out!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/logout')
                }
            })
        }
    }

    return (
        <div>
            {!getToken() ?

                <nav className='m-navbar'>
                    <a href='/'>
                        <img className='navbar-logo' src={WebInaLogo} alt="logo" width='40px' />
                    </a>

                    <ul>
                        <li>
                            <a href='/'>About</a>
                        </li>
                        <li>
                            <a href='/'>Categories</a>
                        </li>
                        <li>
                            <a href='/'>Websites</a>
                        </li>
                        <li>
                            <a href='/'>Contact</a>
                        </li>

                        <li>
                            <a href="/signin">Sign In</a>
                        </li>
                        <li>
                            <a href="/signup">Sign Up</a>
                        </li>

                    </ul>

                </nav>

                :


                <nav className='m-navbar'>
                    <a href='/'>
                        <img className='navbar-logo' src={WebInaLogo} alt="logo" width='80px' />
                    </a>
                    <ul>
                        <li>
                            <a href='/'>About</a>
                        </li>
                        <li>
                            <a href='/'>Categories</a>
                        </li>
                        <li>
                            <a href='/websites'>Websites</a>
                        </li>
                        <li>
                            <a href='/'>Contact</a>
                        </li>

                        <div className="dropdown">
                            <span><img src={userData.avatar ? `http://localhost:8000/uploads/users/${userData.avatar}` : userData.avatar} alt={userData.name} /></span>
                            <div className="dropdown-content">
                                <li>
                                    <a href="/profile">Profile</a>
                                </li>
                                <li>
                                    <a href="/orders">Orders</a>
                                </li>
                                <li>
                                    <a href='/' onClick={logoutUser}>Log Out</a>
                                </li>
                            </div>
                        </div>

                    </ul>
                </nav>
            }
        </div>
    )
}

export default Navbar