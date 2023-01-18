import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import Scroll from 'react-scroll-to-element';


const NavbarHome = () => {
    return (
        <div>
            <nav className='m-navbar'>
                <a href='/'>
                    <img className='navbar-logo' src="./Images/webinai.png" alt="logo" width='80px' />
                </a>

                <ul>
                    <li>
                        <Scroll type="id" element="home" offset={-100} timeout={100}>
                            <button>Home</button>
                        </Scroll>
                        {/* <Link to="/websites"></Link> */}
                    </li>
                    <li>
                        <Scroll type="id" element="about" offset={-100} timeout={100}>
                            <button>About</button>
                        </Scroll>
                    </li>
                    <li>
                        <Scroll type="id" element="founders" offset={-100} timeout={100}>
                            <button>Founders</button>
                        </Scroll>
                    </li>
                    <li>
                        <Scroll type="id" element="contact" offset={-100} timeout={100}>
                            <button>Contact</button>
                        </Scroll>
                    </li>

                </ul>

                <ul>
                    <li>
                        <a href="/signin">Sign In</a>
                    </li>
                    <li>
                        <a href="/signup">Sign Up</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavbarHome