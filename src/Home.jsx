import React, { useEffect, useState } from 'react'

import Navbar from "./Front_side/client/Components/NavbarHome";
import videoHeader from './Assets/Videos/Blurred Video of Scripts Being Typed.mp4';
import ImageAbout from './Assets/Images/vector_about.png';
import ImageContact from './Assets/Images/vector_contact.png';

import YahyaBouhsine from './Assets/Images/profile.b5697fde8b8a45586598.png';
import Youness from './Assets/Images/youness.png';
import Moujahid from './Assets/Images/FRAZZIX.png';

import { Link } from 'react-router-dom';


import { AiFillHtml5, AiOutlineCamera, AiOutlineDatabase, AiOutlineCloudServer } from 'react-icons/ai';
import { TbBrandJavascript } from 'react-icons/tb';
import { FaLaravel } from 'react-icons/fa';
import { DiMysql, DiNodejsSmall, DiReact, DiCss3, DiSass, DiPhp, DiPhotoshop, DiIllustrator, DiVisualstudio } from 'react-icons/di';
import { SiTypescript, SiAdobepremierepro, SiAdobeaftereffects } from 'react-icons/si';
import { MdDone, MdError, MdOutlineDesignServices, MdOutlineMiscellaneousServices } from 'react-icons/md';
import { RiCustomerServiceLine, RiLockPasswordFill } from 'react-icons/ri';

import './App.scss'


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";




import { CgWebsite } from 'react-icons/cg'
import { VscDebugAll } from 'react-icons/vsc'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
import NavbarHome from './Front_side/client/Components/NavbarHome';


import AOS from "aos";
import AuthUser from './Front_side/AuthUser';
import cookie from 'js-cookie';
import Swal from 'sweetalert2';





const Home = () => {


    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setSent] = useState(false);
    const [acceptEmail, setAcceptEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const { getToken, http } = AuthUser();
    const [userData, setuserData] = useState({})

    useEffect(() => {

        const user = cookie.get('user');
        if (user !== undefined && user !== null && user !== '') {
            setuserData(JSON.parse(cookie.get('user')))
        }
        const onPageLoad = () => {
            setLoading(false);
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }

        



    }, [])



    const submitForm = function (e) {

        if (1 === 1) {
            e.preventDefault();

            const formData = new FormData()

            formData.append('name', name)
            formData.append('email', emailInput)
            formData.append('message', message)

            try {
                http.post('/message/contact', formData)
                    .then(res => {
                        if (res.status === 200) {
                            setName('');
                            setEmailInput('');
                            setMessage('');
                            setSent(true);

                            Swal.fire({
                                title: 'Success!',
                                text: res.data.message,
                                icon: <MdDone />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: true,

                            })
                        } else if (res.status === 401) {
                            Swal.fire({
                                title: 'Error!',
                                text: res.data.message,
                                icon: <MdError />,
                                showConfirmButton: false,
                                confirmButtonText: 'Sign up!',
                                showCancelButton: true,

                            })

                        }



                    })
            } catch (error) {
                console.error(error);
            }

        }
        else {
            e.preventDefault();

            Swal.fire({
                title: 'Error!',
                text: 'Must not be empty!',
                icon: <MdError />,
                showConfirmButton: false,
                confirmButtonText: 'Sign up!',
                showCancelButton: true,

            })
        }
    }


    AOS.init();


    return (
        loading ?
            <div>Loading...</div>
            :
            <div>
                <header className="app__header" id="home">
                    <NavbarHome userData={userData} />


                    <div className="app__header__content">

                        <div className="app__header__title">
                            {!getToken() ?

                                <div className="wrapper">

                                    <h1>Make Your Sales </h1>
                                    <div className="words">
                                        <span>Easier</span>
                                        <span>Better</span>
                                        <span>Safer</span>
                                        <span>Faster</span>
                                    </div>
                                </div>
                                :
                                <div className="wrapper">
                                    <h1>Welcome Back <span style={{ color: "rgb(var(--mid-color))" }}>

                                        {userData !== {} ? userData.name.length > 7 ?
                                            `${userData.name.substring(0, 7)}...` : userData.name
                                            : ''}

                                    </span></h1>
                                </div>

                            }


                            <p>We will help you react your dreams by <br /> making you the most professional website among the market</p>
                            {!getToken() ?
                                <Link to='/signup' className="app__header__title__sign">
                                    <span className="app__header__title__sign__get">GET STARTED</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </Link> :
                                <Link to='/websites' className="app__header__title__sign">
                                    <span className="app__header__title__sign__get">MAKE ME A WEBSITE</span>
                                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                                        <path d="M1,5 L11,5"></path>
                                        <polyline points="8 1 12 5 8 9"></polyline>
                                    </svg>
                                </Link>}

                        </div>

                        <video className="app__video" loop autoPlay={true}>
                            <source src={videoHeader} type="video/mp4" />
                            <source src={videoHeader} type="video/ogg" />
                        </video>
                    </div>


                </header>


                <section className="app__about" id="about">
                    <div className="app__about__content">
                        <h2>What Is WebIna ?</h2>
                        <p>WebIna is a website that helps you make your dreams
                            easier and build you a full appliaction for your business , you can easly choose any website
                            from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
                    </div>

                    <div className="app__about__image">
                        <img src={ImageAbout} alt="about_us" width='500px' />
                    </div>
                </section>


                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2c2827" fillOpacity="3" d="M0,32L0,224L240,224L240,288L480,288L480,288L720,288L720,192L960,192L960,160L1200,160L1200,192L1440,192L1440,320L1200,320L1200,320L960,320L960,320L720,320L720,320L480,320L480,320L240,320L240,320L0,320L0,320Z"></path></svg>            <section className="app__more__about">
                    <div className="app__more__about__image"></div>
                    <div className="app__more__about__content">
                        <h2>More About WebIna</h2>
                        <p>WebIna is a website that helps you make your dreams
                            easier and build you a full appliaction for your business , you can easly choose any website
                            from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
                        <div className="app__more__about__card" data-aos="fade-right">
                            <CgWebsite /> <h2>Website Development</h2>
                        </div>

                        <div className="app__more__about__card" data-aos="fade-right">
                            <VscDebugAll /> <h2>Websites Debugging</h2>
                        </div>

                        <div className="app__more__about__card" data-aos="fade-right">
                            <AiOutlineDeploymentUnit /> <h2>Website Deployment</h2>
                        </div>
                    </div>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2c2827" fillOpacity="3" d="M0,0L0,160L288,160L288,64L576,64L576,96L864,96L864,64L1152,64L1152,32L1440,32L1440,0L1152,0L1152,0L864,0L864,0L576,0L576,0L288,0L288,0L0,0L0,0Z"></path></svg>






                <section className="app__categories mt-5" id='categories'>
                    <div className="app__categories__content">
                        <div className="app__categories__title"><h2>WebIna_Categories</h2></div>
                    </div>


                    <div className="app__categories__cards">
                        <div className="app__categories__cards__sep">
                            <div className="app__categories__card">
                                <div className="app__categories__card__content">
                                    <div className="app__categories__card__content__image">
                                        <img className="app__categories__card__content" src="./Images/e-commerce.jpg" alt="e-commerce" />
                                        <div className="app__categories__card__content__title">E-Commerce Website</div>
                                        <div className="app__categories__card__content__description">Make an e-ceommerce website for your produts to make it easier for customers</div>

                                    </div>
                                </div>
                            </div>
                            <div className="app__categories__card">
                                <div className="app__categories__card__content">
                                    <div className="app__categories__card__content__image">
                                        <img className="app__categories__card__content" src="./Images/landing.jpg" alt="landing-page" />
                                        <div className="app__categories__card__content__title">Landing Page</div>
                                        <div className="app__categories__card__content__description">Make single web page that appears marketing promotion, marketing email or an online advertisement.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="app__categories__card">
                                <div className="app__categories__card__content">
                                    <div className="app__categories__card__content__image">
                                        <img className="app__categories__card__content" src="./Images/blog.jpg" alt="blog" />
                                        <div className="app__categories__card__content__title">Blog/News Page</div>
                                        <div className="app__categories__card__content__description">Make single web page that appears marketing promotion, marketing email or an online advertisement.</div>
                                    </div>
                                </div>
                            </div>

                            <div className="app__categories__card">
                                <div className="app__categories__card__content">
                                    <div className="app__categories__card__content__image">
                                        <img className="app__categories__card__content" src="./Images/portfolio.jpg" alt="portfolio" />
                                        <div className="app__categories__card__content__title">Portfolio Website</div>
                                        <div className="app__categories__card__content__description">Make single web page that appears marketing promotion, marketing email or an online advertisement.</div>
                                    </div>
                                </div>
                            </div>



                            {/* <SwiperCategories /> */}
                        </div>

                        <div className="show__container">
                            <button className="app__categories__show__button">Show All</button>
                        </div>
                    </div>

                </section>

                <section className="app__skills mt-5" id='founders'>

                    <div className="app__skills__content">
                        <div className="app__skills__title"><h2>WebIna_Founders</h2></div>
                    </div>

                    <div className="app__skills__cards">
                        <div className="app__skills__card">
                            <div className="app__skills__card__img">
                                <h2 className="app__skills__card__name">YAHYA BOUHSINE</h2>
                                <p className="app__skills__card__content__role">Developer And Programmer of WebIna Company</p>
                                <img src={YahyaBouhsine} alt="founders" />
                            </div>

                            <div className="app__skills__card__content">
                                <h3 className="app__skills__card__content__title">Yahya Bouhsine</h3>
                                <p className="app__skills__card__content__description">Developer And Programmer of WebIna Company</p>
                                <AiFillHtml5 /><TbBrandJavascript /><FaLaravel /><DiMysql /><DiNodejsSmall /><DiReact />
                                <DiCss3 /><DiSass /><DiPhp /><SiTypescript />
                                <hr />
                            </div>
                        </div>

                        <hr />

                        <div className="app__skills__card">
                            <div className="app__skills__card__img">
                                <h2 className="app__skills__card__name">MOUJAHID NEJJAR</h2>
                                <p className="app__skills__card__content__role">Designer & UX/UI Designer of WebIna Company</p>
                                <img className="moujahid" src={Moujahid} alt="founders" />
                            </div>

                            <div className="app__skills__card__content">
                                <h3 className="app__skills__card__content__title">Moujahid Nejjar</h3>
                                <p className="app__skills__card__content__description">Designer & UX/UI Designer of WebIna Company</p>
                                <AiOutlineCamera /><DiPhotoshop /><DiIllustrator /><SiAdobepremierepro /><SiAdobeaftereffects /><DiReact />
                                <MdOutlineDesignServices />
                                <hr />
                            </div>
                        </div>

                        <hr />

                        <div className="app__skills__card">
                            <div className="app__skills__card__img">
                                <h2 className="app__skills__card__name">YOUNESS MEKKI</h2>
                                <p className="app__skills__card__content__role">Security & Database Managment</p>
                                <img src={Youness} alt="founders" />
                            </div>

                            <div className="app__skills__card__content">
                                <h3 className="app__skills__card__content__title">Youness Mekki</h3>
                                <p className="app__skills__card__content__description">Security & Database Managment</p>
                                <AiOutlineDatabase /><AiOutlineCloudServer /><DiVisualstudio /><MdOutlineMiscellaneousServices /><RiCustomerServiceLine />
                                <hr />
                            </div>
                        </div>

                        <hr />
                    </div>


                </section >


                <section className="app__contact mt-5" id='contact'>
                    <div className="app__contact__content">
                        <div className="app__contact__title"><h2>Conatct_WebIna</h2></div>
                    </div>

                    <div className="app__contact__content__form__image">
                        <div className="app__contact__image">
                            <img src={ImageContact} alt="contact" style={{ width: '700px' }} />
                        </div>


                        {!emailSent ?
                            <div className="app__contact__form">
                                <form onSubmit={submitForm}>
                                    <input type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                    <input type="email" name="email" placeholder="Email" onChange={(e) => setEmailInput(e.target.value)} />
                                    <textarea placeholder="Message" name="message" onChange={(e) => setMessage(e.target.value)} ></textarea>

                                    <label className="b-contain">
                                        <span>I Accept Receiving Marketing Emails</span>
                                        <input type="checkbox" name='accept_mails' onChange={(e) => setAcceptEmail(e.checked, console.log(e.target.checked))} />
                                        <div className="b-input"></div>
                                    </label>

                                    <button type="submit">SEND MESSAGE</button>
                                </form>
                            </div> :
                            <div style={{ textAlign: 'center' }}>
                                <h2>Thank You For Sending Your Message</h2>
                                <p>We Will Contact You Soon</p>
                            </div>
                        }
                    </div>
                </section>


                <footer className="app__footer">
                    <div className="app__footer__content">
                        <ul>
                            <h3>Page You Should Visit</h3>
                            <li><Link to="/">Home</Link></li>
                            <li><a href="/privacy&policy">Privacy & Policy</a></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    </div>

                    <div className="app__footer__content">
                        <ul>
                            <h3>Most Popular</h3>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    </div>

                    <div className="app__footer__content">
                        <ul>
                            <h3>Subscribe To Us</h3>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    </div>
                </footer>
            </div>
    )
}

export default Home