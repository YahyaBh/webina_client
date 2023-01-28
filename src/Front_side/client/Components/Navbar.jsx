import React from 'react'
import './Navbar.scss'
import AuthUser from '../../AuthUser';


const Navbar = () => {


    const { getToken } = AuthUser();
    const { token, logout } = AuthUser();
    const logoutUser = () => {
        if (token !== undefined) {
            logout();
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
                        {/* <Link to="/websites"></Link> */}
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