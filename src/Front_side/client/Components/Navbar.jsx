import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import Scroll from 'react-scroll-to-element';


const Navbar = () => {
    return (
        <div>
            <nav className='m-navbar'>
                <div>
                    <img className='navbar-logo' src="./Images/webinai.png" alt="logo" width='80px' />
                </div>

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
                    <Scroll type="id" element="contact" offset={-100} timeout={100}>
                            <button>Contact</button>
                        </Scroll>
                    </li>

                </ul>

                <ul>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar