import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div>
            <nav className='navbar'>
                <div>

                </div>

                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/">About</Link>
                    </li>
                    <li>
                        <Link to="/">Contact</Link>
                    </li>
                    <li>
                        <Link to="/">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/">Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar