import React from 'react'
import './Navbar.scss'
import AuthUser from '../../AuthUser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

    const navigate = useNavigate();
    const { getToken } = AuthUser();
    const { token } = AuthUser();


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
            <nav className='m-navbar'>
                <a href='/'>
                    <img className='navbar-logo' src="./Images/webinai.png" alt="logo" width='80px' />
                </a>

                <ul>
                    <li>
                        <a href='/'>
                            <button>Home</button>
                        </a>
                    </li>
                    <li>
                        <a href='/#about'>
                            <button>About</button>
                        </a>
                    </li>

                    <li>
                        <a href="/#categroies">
                            <button>Categories</button>
                        </a>
                    </li>
                    <li>
                        <a href='/#founders'>
                            <button>Founders</button>
                        </a>
                    </li>
                    <li>
                        <a href='/#contact'>
                            <button>Contact</button>
                        </a>
                    </li>

                </ul>

                {!getToken ?

                    <ul>
                        <li>
                            <a href="/signin">Sign In</a>
                        </li>
                        <li>
                            <a href="/signup">Sign Up</a>
                        </li>
                    </ul>
                    :

                    <ul>
                        <li>
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a href="/orders">Orders</a>
                        </li>
                        <li>
                            <a href="/" onClick={logoutUser}>Log Out</a>
                        </li>
                    </ul>}
            </nav>
        </div>
    )
}

export default Navbar