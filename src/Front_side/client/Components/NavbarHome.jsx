import React from 'react'
import './Navbar.scss'
import Scroll from 'react-scroll-to-element';
import AuthUser from '../../AuthUser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import WebInaLogo from '../../../Assets/Images/webinai.png';


const NavbarHome = ({ userData }) => {


    const navigate = useNavigate();
    const { getToken } = AuthUser();
    const { token, logout } = AuthUser();

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
                        <img className='navbar-logo' src={WebInaLogo} alt="logo" width='80px' />
                    </a>

                    <ul>
                        <li>
                            <Scroll type="id" element="about" offset={-100} timeout={100}>
                                <button>About</button>
                            </Scroll>
                        </li>
                        <li>
                            <Scroll type="id" element="categories" offset={-100} timeout={100}>
                                <button>Categories</button>
                            </Scroll>
                        </li>
                        {/* <li>
                            <Scroll type="id" element="founders" offset={-100} timeout={100}>
                                <button>Founders</button>
                            </Scroll>
                        </li> */}
                        <li>
                            <Scroll type="id" element="contact" offset={-100} timeout={100}>
                                <button>Contact</button>
                            </Scroll>
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
                            <Scroll type="id" element="about" offset={-100} timeout={100}>
                                <button>About</button>
                            </Scroll>
                        </li>
                        <li>
                            <Scroll type="id" element="categories" offset={-100} timeout={100}>
                                <button>Categories</button>
                            </Scroll>
                        </li>
                        <li>
                                <a href='/websites'>Websites</a>
                        </li>
                        <li>
                            <Scroll type="id" element="contact" offset={-100} timeout={100}>
                                <button>Contact</button>
                            </Scroll>
                        </li>

                        <div className="dropdown">
                            <span><img src={userData.avatar} alt={userData.name} /></span>
                            <div className="dropdown-content">
                                <li>
                                    <a href="/profile">Profile</a>
                                </li>
                                <li>
                                    <a href="/orders">Orders</a>
                                </li>
                                <li>
                                    <a href="/" onClick={logoutUser}>Log Out</a>
                                </li>
                            </div>
                        </div>

                    </ul>
                </nav>
            }
        </div>
    )
}

export default NavbarHome