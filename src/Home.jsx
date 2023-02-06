import React, { useEffect, useState } from 'react'

import videoHeader from './Assets/Videos/Blurred Video of Scripts Being Typed.mp4';
import ImageAbout from './Assets/Images/vector_about.png';
import ImageContact from './Assets/Images/vector_contact.png';

import YahyaBouhsine from './Assets/Images/profile.b5697fde8b8a45586598.png';
import Youness from './Assets/Images/youness.png';
import Moujahid from './Assets/Images/FRAZZIX.png';

import { Link, useNavigate } from 'react-router-dom';


import { AiFillHtml5, AiOutlineCamera, AiOutlineDatabase, AiOutlineCloudServer } from 'react-icons/ai';
import { TbBrandJavascript } from 'react-icons/tb';
import { FaLaravel } from 'react-icons/fa';
import { DiMysql, DiNodejsSmall, DiReact, DiCss3, DiSass, DiPhp, DiPhotoshop, DiIllustrator, DiVisualstudio } from 'react-icons/di';
import { SiTypescript, SiAdobepremierepro, SiAdobeaftereffects } from 'react-icons/si';
import { MdDone, MdError, MdOutlineDesignServices, MdOutlineMiscellaneousServices } from 'react-icons/md';
import { RiCustomerServiceLine, RiCustomerService2Line } from 'react-icons/ri';
import { BiDollarCircle, BiTimeFive } from 'react-icons/bi';

import './App.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";



import { CgWebsite } from 'react-icons/cg'
import { VscDebugAll } from 'react-icons/vsc'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
import NavbarHome from './Front_side/client/Components/NavbarHome';


import AOS from "aos";
import AuthUser from './Front_side/AuthUser';
import cookie from 'js-cookie';
import Swal from 'sweetalert2';
import Footer from './Front_side/client/Components/Footer';
import Loading from './Assets/Images/WEBINA2.png'





const Home = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setSent] = useState(false);
    const [acceptEmail, setAcceptEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const { getToken, http } = AuthUser();
    const [userData, setuserData] = useState({})
    const [testimonials, setTestiomonials] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {

        const user = cookie.get('user');

        if (user !== undefined && user !== null && user !== '') {
            setuserData(JSON.parse(cookie.get('user')))
        }

        http.get('/')
            .then((res) => {
                if (res.status === 200) {
                    setLoading(false);
                    setTestiomonials(res.data.testimonials);
                    setCategories(res.data.categories);

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                navigate('/');
                            }
                        })
                }
            })


    }, [])



    const submitForm = function (e) {

        if (name !== '' || emailInput !== '' || message !== '') {

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
                                cancelButtonText: 'Thanks!',
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
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
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


                            <p>We will help you make your dreams come true by <br /> making you the most professional website among the market</p>
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
                        <div className='app__about__para_image'>
                            <p>WebIna is a website that helps you make your dreams
                                easier and build you a full appliaction for your business , you can easly choose any website
                                from our lists and we will finish it as soon as possible to make your work go easier on you.</p>

                            <img src={ImageAbout} alt="about_us" width='500px' />
                        </div>
                        <div className="app__about__list">
                            <h4><BiDollarCircle /> Best Prices In The Market</h4>
                            <h4><BiTimeFive /> Fast Website Developing Time</h4>
                            <h4><RiCustomerService2Line /> 24/7 Customer Services Assistance</h4>
                        </div>
                    </div>
                </section>


                <section className="app__more__about">
                    <div className="app__more__about__content">
                        <h2>More About WebIna</h2>
                        <p>WebIna is a website that helps you make your dreams
                            easier and build you a full appliaction for your business , you can easly choose any website
                            from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
                        <div className='app__more__about__cards__container'>
                            <div className="app__more__about__card" data-aos="fade-right">
                                <CgWebsite /> <h3>Website Development</h3>
                            </div>

                            <div className="app__more__about__card" data-aos="fade-right">
                                <VscDebugAll /> <h3>Websites Debugging</h3>
                            </div>

                            <div className="app__more__about__card" data-aos="fade-right">
                                <AiOutlineDeploymentUnit /> <h3>Website Deployment</h3>
                            </div>
                        </div>
                    </div>
                </section>






                <section className="app__categories" id='categories'>
                    <div className="app__categories__content">
                        <div className="app__categories__title"><h2>WebIna Categories</h2></div>
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


                    </div>

                    <div className="show__container">
                        <a href='/websites' className="app__categories__show__button">Show All Websites</a>
                    </div>

                </section>

                <section className="app__skills" id='founders'>

                    <div className="app__skills__content">
                        <div className="app__skills__title"><h2>WebIna Founders</h2></div>
                    </div>

                    <div className="app__skills__cards">
                        <div className="app__skills__card">
                            <div className="app__skills__card__img">


                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <div className='app__skills__card__image__container'>
                                                <img src={YahyaBouhsine} alt="founder_yahya" />
                                            </div>
                                        </div>
                                        <div className="flip-box-back">
                                            <AiFillHtml5 /><TbBrandJavascript /><FaLaravel /><DiMysql /><DiNodejsSmall /><DiReact />
                                            <DiCss3 /><DiSass /><DiPhp /><SiTypescript />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="app__skills__card__content">
                                <h3 className="app__skills__card__content__title">Yahya Bouhsine</h3>
                                <p className="app__skills__card__content__description">Developer And Programmer of WebIna Company</p>
                            </div>
                        </div>


                        <div className="app__skills__card">
                            <div className="app__skills__card__img">

                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <div className='app__skills__card__image__container'>
                                                <img src={Moujahid} alt="founder_moujahid" />
                                            </div>
                                        </div>
                                        <div className="flip-box-back">
                                            <div className='app__skills__svgs'>
                                                <AiOutlineCamera /><DiPhotoshop /><DiIllustrator /><SiAdobepremierepro /><SiAdobeaftereffects /><DiReact />
                                                <MdOutlineDesignServices />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="app__skills__card__content">
                                <h3 className="app__skills__card__content__title">Moujahid Nejjar</h3>
                                <p className="app__skills__card__content__description">Designer & UX/UI Designer of WebIna Company</p>
                            </div>
                        </div>


                        <div className="app__skills__card">
                            <div className="app__skills__card__img">

                                <div className="flip-box">
                                    <div className="flip-box-inner">
                                        <div className="flip-box-front">
                                            <div className='app__skills__card__image__container'>
                                                <img src={Youness} alt="founder_youness" />
                                            </div>
                                        </div>
                                        <div className="flip-box-back">
                                            <div className='app__skills__svgs'>
                                                <AiOutlineDatabase /><AiOutlineCloudServer /><DiVisualstudio /><MdOutlineMiscellaneousServices /><RiCustomerServiceLine /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="app__skills__card__content">
                                <h3 className="app__skills__card__content__title">Youness Mekki</h3>
                                <p className="app__skills__card__content__description">Security & Database Managment</p>
                            </div>
                        </div>



                    </div >


                </section >


                <section className="app__testimonials" id='testimonials'>
                    <div className='app__testimonials__container'>
                        {testimonials > 0 ?
                            <Swiper loop={true} navigation={true} modules={[Navigation, Pagination]} className="testimonials">
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={index + testimonial.name}>
                                        <div className='testimonail__card'>
                                            <div className='testimonial__card__header'>
                                                {testimonial.image ?
                                                    <div className='image__holder'>
                                                        <img src={testimonial.image} alt={testimonial.name} />
                                                    </div> :
                                                    ''
                                                }
                                                <div className='testimonial__card__header__name'>
                                                    <h3>{testimonial.name}</h3>
                                                    <p>{testimonial.date}</p>
                                                </div>
                                            </div>


                                            <div className='testimonial__card__body'>
                                                <h4>{testimonial.feedback}</h4>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}

                            </Swiper>

                            :
                            <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <h2>Leave Us A FeedBack</h2>
                                <form>
                                    <input type="text" name='name' placeholder='name' />
                                    <input type="text" name='feedback' placeholder='name' />

                                </form>
                            </div>
                        }
                    </div>
                </section>


                <section className="app__contact" id='contact'>
                    <div className="app__contact__content">
                        <div className="app__contact__title"><h2>Conatct WebIna</h2></div>
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
                                        <input type="checkbox" name='accept_mails' onChange={(e) => setAcceptEmail(e.checked)} />
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





                    <Footer />

                </section>


            </div >
    )
}

export default Home