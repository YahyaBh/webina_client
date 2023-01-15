import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div>
            <nav className='m-navbar'>
                <div>

                </div>

                <ul>
                    <li>
                        <Link to="/websites">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
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