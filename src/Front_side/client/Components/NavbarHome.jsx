import './Navbar.scss'
import Scroll from 'react-scroll-to-element';
import AuthUser from '../../context/AuthUser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import WebInaLogo from '../../../Assets/Images/WEBINA2.png';
import { useEffect } from 'react';
import { useState } from 'react';
import { MdOutlineSegment } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';


const NavbarHome = (props) => {


    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const { user } = AuthUser();

    useEffect(() => {
        if (user) {
            setUserData(user);
        }
    }, [])




    const logoutUser = (e) => {
        e.preventDefault();
        if (user !== undefined) {
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


    const openCloseSide = (e) => {
        e.preventDefault();


        if (isOpen) {
            setIsOpen(false);
            document.getElementById("mySidebar").style.width = "0";
        } else {
            setIsOpen(true);
            document.getElementById("mySidebar").style.width = "250px";
        }
    }




    return (
        <div>
            {!user ?

                <>

                    <nav className={props.navDark ? 'm-navbar dark' : 'm-navbar'} >
                        <a href='/'>
                            <img className='navbar-logo' src={WebInaLogo} alt="logo" width='40px' />
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
                                <a href='/blogs'>Blogs</a>
                            </li>
                            <li>
                                <a href='/announcements'>Announcements</a>
                            </li>
                            <li>
                                <a href='/frequent-asked-questions'>FAQ</a>
                            </li>
                            <li>
                                <a href='/' className='disabled' disabled={'disabled'}>Hire Me</a>
                            </li>
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
                        <MdOutlineSegment onClick={openCloseSide} />
                    </nav>

                    <div id="mySidebar" className="sidebar-nav">
                        <AiOutlineClose onClick={openCloseSide} />
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
                                <a href='/blogs'>Blogs</a>
                            </li>
                            <li>
                                <a href='/announcements'>Announcements</a>
                            </li>
                            <li>
                                <a href='/frequent-asked-questions'>FAQs</a>
                            </li>
                            <li>
                                <a href='/' className='disabled' disabled={'disabled'}>Hire Me</a>
                            </li>
                            <li>
                                <Scroll type="id" element="contact" offset={-100} timeout={100}>
                                    <button>Contact</button>
                                </Scroll>
                            </li>

                        </ul>
                    </div>

                </>





                :

                <>
                    <nav className={props.navDark ? 'm-navbar dark' : 'm-navbar'}>
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
                                <a href='/blogs'>Blogs</a>
                            </li>
                            <li>
                                <a href='/announcements'>Announcements</a>
                            </li>
                            <li>
                                <a href='/frequent-asked-questions'>FAQ</a>
                            </li>
                            <li>
                                <a href='/' className='disabled' disabled={'disabled'}>Hire Me</a>
                            </li>
                            <li>
                                <Scroll type="id" element="contact" offset={-100} timeout={100}>
                                    <button>Contact</button>
                                </Scroll>
                            </li>

                            <div className="dropdown">
                                <span><img src={userData.avatar ? `http://localhost:8000/uploads/users/${userData.avatar}` : userData.avatar} alt={userData.full_name} /></span>
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

                        <MdOutlineSegment onClick={openCloseSide} />
                    </nav>

                    <div id="mySidebar" className="sidebar-nav">
                        <AiOutlineClose onClick={openCloseSide} />
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
                                <a href='/blogs'>Blogs</a>
                            </li>
                            <li>
                                <a href='/announcements'>Announcements</a>
                            </li>
                            <li>
                                <a href='/frequent-asked-questions'>FAQs</a>
                            </li>
                            <li>
                                <a href='/' className='disabled' disabled={'disabled'}>Hire Me</a>
                            </li>
                            <li>
                                <Scroll type="id" element="contact" offset={-100} timeout={100}>
                                    <button>Contact</button>
                                </Scroll>
                            </li>

                            {/* <div className="dropdown">
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
                            </div> */}

                        </ul>
                    </div>
                </>
            }
        </div>
    )
}

export default NavbarHome