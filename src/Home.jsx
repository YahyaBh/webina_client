import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHtml5, AiOutlineCamera, AiOutlineDatabase, AiOutlineCloudServer } from 'react-icons/ai';
import { TbBrandJavascript } from 'react-icons/tb';
import { FaLaravel } from 'react-icons/fa';
import { DiMysql, DiNodejsSmall, DiReact, DiCss3, DiSass, DiPhp, DiPhotoshop, DiIllustrator, DiVisualstudio } from 'react-icons/di';
import { SiTypescript, SiAdobepremierepro, SiAdobeaftereffects } from 'react-icons/si';
import { MdDone, MdError, MdOutlineDesignServices, MdOutlineMiscellaneousServices } from 'react-icons/md';
import { RiCustomerServiceLine, RiCustomerService2Line } from 'react-icons/ri';
import { BiChat, BiDollarCircle, BiTimeFive } from 'react-icons/bi';
import { CgWebsite } from 'react-icons/cg'
import { VscDebugAll } from 'react-icons/vsc'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import AOS from "aos";
import "aos/dist/aos.css";
import cookie from 'js-cookie';
import Swal from 'sweetalert2';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useInView } from 'react-intersection-observer';




import videoHeader from './Assets/Videos/Blurred Video of Scripts Being Typed.mp4';
import ImageAbout from './Assets/Images/vector_about.png';
import ImageContact from './Assets/Images/vector_contact.png';
import YahyaBouhsine from './Assets/Images/profile.b5697fde8b8a45586598.png';
import Youness from './Assets/Images/youness.png';
import Moujahid from './Assets/Images/FRAZZIX.png';


import './App.scss'
import NavbarHome from './Front_side/client/Components/NavbarHome';
import AuthUser from './Front_side/context/AuthUser';
import Footer from './Front_side/client/Components/Footer';
import Loading from './Assets/Images/WEBINA2.png'


const Home = () => {
    const { ref: svgRefCustomWebsite, inView: websiteSvgVisible } = useInView();

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setSent] = useState(false);
    const [acceptEmail, setAcceptEmail] = useState(false);
    const [loading, setLoading] = useState(true);
    const { http , getUser} = AuthUser();
    const [userData, setuserData] = useState({})
    const [testimonials, setTestiomonials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [chatShown, setChatShown] = useState(false);



    useEffect(() => {

        getTestimonials_Categories();
        AOS.init();
        setLoading(false);

    }, [])


    const getTestimonials_Categories = async () => {

        // await http.get('/homepagetesti')
        //     .then((res) => {
        //         if (res.status === 200) {
        //             setLoading(false);
        //             setTestiomonials(res.data.testimonials);
        //             setCategories(res.data.categories);

        //         } else {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: 'Something went wrong!',
        //             })
        //                 .then((result) => {
        //                     if (result.isConfirmed) {
        //                         navigate('/');
        //                     }
        //                 })
        //         }
        //     })
    }

    useLayoutEffect(() => {

        const user = cookie.get('user');

        if (user !== undefined && user !== null && user !== '') {
            setuserData(JSON.parse(user));
        }
    }, [])


    const submitForm = function (e) {

        if (name !== '' || emailInput !== '' || message !== '' || acceptEmail.checked !== false) {

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

    const showChatSection = () => {
        if (chatShown) {
            setChatShown(false);
        } else {
            setChatShown(true);
        }
    }



    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div>
                <section className='chat-with-us'>
                    <div className={chatShown ? 'chat-section' : 'chat-section-hidden'}>
                        Hello There ,
                        <br />
                        How We Can Help You?
                    </div>
                    <div onClick={showChatSection} className='float-button-chat'>

                        <BiChat />
                    </div>
                </section>

                <div className='wrapper-sidebar'>
                    <header className="app__header" id="home">


                        <NavbarHome userData={userData} />


                        <div className="app__header__content">

                            <div className="app__header__title">
                                {!getUser ?

                                    <div className="wrapper">

                                        <div className='only-res'>
                                            <h1>TIRED OF THOSE BORING WEBSITES ?</h1>
                                        </div>

                                        <h2 data-aos="fade-right">WE WEILL HELP YOU</h2>
                                        <h1 data-aos="fade-right" className='only-res-title'>Make Your Sales </h1>
                                        <div className="words">
                                            <span>Easier</span>
                                            <span>Better</span>
                                            <span>Safer</span>
                                            <span>Faster</span>
                                        </div>
                                    </div>
                                    :
                                    <div className="wrapper" data-aos="fade-right">
                                        <h1>Welcome Back <span style={{ color: "rgb(var(--mid-color))" }}>

                                            {userData && userData?.full_name !== null ? userData?.full_name.length > 7 ?
                                                `${userData?.full_name.substring(0, 7)}...` : userData?.full_name
                                                : ''}

                                        </span></h1>
                                    </div>

                                }


                                <p>We will help you make your dreams come true by <br /> making you the most professional website among the market</p>
                                {!cookie.get('user') ?
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
                                <p>WebIna is a comapny that helps you make your dreams
                                    easier and build you a full appliaction for your business , you can easly choose any website
                                    from our lists and we will finish it as soon as possible to make your work go easier on you.</p>

                                <img src={ImageAbout} alt="about_us" width='500px' />
                            </div>
                            <div className="app__about__list">
                                <h4 data-aos="fade-right" ><BiDollarCircle /> Best Prices In The Market</h4>
                                <h4 data-aos="fade-right" data-aos-duration="500"><BiTimeFive /> Fast Website Developing Time</h4>
                                <h4 data-aos="fade-right" data-aos-duration="1000"><RiCustomerService2Line /> 24/7 Customer Services Assistance</h4>
                            </div>
                        </div>
                    </section>


                    <section className="app__more__about">
                        <div className="app__more__about__content">
                            <h2 data-aos="fade-down">More About WebIna</h2>
                            <p data-aos="fade-right">WebIna is a company that helps you make your dreams
                                easier and build you a full appliaction for your business , you can easly choose any website
                                from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
                            <div className='app__more__about__cards__container'>


                                <div data-aos="fade-right" id="website-development" className="app__more__about__card">
                                    <CgWebsite /> <h3>Website Development</h3>
                                </div>
                                <ReactTooltip style={{ backgroundColor: '#fff', color: '#000', width: '200px', flexWrap: 'wrap' }} place='top' anchorId="website-development" multiline={true} disableInteractive>
                                    Developing Perfect Full stack /<br /> Front End / Back End / UI-UX Website .
                                </ReactTooltip>


                                <div data-aos="fade-right" data-aos-duration="500" id='website-debugging' className="app__more__about__card" >
                                    <VscDebugAll /> <h3>Websites Debugging</h3>
                                </div>
                                <ReactTooltip style={{ backgroundColor: '#fff', color: '#000', width: '200px', flexWrap: 'wrap' }} place='top' anchorId="website-debugging" multiline={true} disableInteractive>
                                    Having Issues With Debugging ?<br /> WebIna Always Here .

                                </ReactTooltip>


                                <div data-aos="fade-right" data-aos-duration="750" id='website-deployment' className="app__more__about__card" >
                                    <AiOutlineDeploymentUnit /> <h3>Website Deployment</h3>
                                </div>
                                <ReactTooltip style={{ backgroundColor: '#fff', color: '#000', width: '200px', flexWrap: 'wrap' }} place='top' anchorId="website-deployment" multiline={true} disableInteractive>
                                    Your Website Is Ready To Use .<br /> Let Us Handle The Rest Of It .
                                </ReactTooltip>
                            </div>
                        </div>
                    </section>


                    <section className="app__custom__edit" id="custom">

                        <div className='free-to-edit'>
                            <svg ref={svgRefCustomWebsite} id='custom-website' width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="Windows-pana 1">
                                    <g className={websiteSvgVisible ? 'move-from-top' : ''} id="freepik--background-complete--inject-10">
                                        <path id="Vector" d="M142.09 427.75C157.99 416 161 395.07 159.75 376.39C159.54 373.27 159.75 369.96 158.19 367.28C156.63 364.6 153.02 362.83 150.19 364.28C147.88 365.45 146.94 368.18 145.7 370.45C144.034 373.493 141.541 376.003 138.51 377.69C136.51 378.79 134.05 379.51 132.03 378.49C129.25 377.09 128.81 373.38 128.73 370.28L128.28 352.91C128.19 349.8 128.1 346.63 127.03 343.72C125.96 340.81 123.7 338.14 120.68 337.41C117.66 336.68 114.02 338.51 113.48 341.57C113.39 342.858 113.39 344.152 113.48 345.44C113.48 346.73 112.87 348.18 111.64 348.58C110.41 348.98 109.11 348.14 108.14 347.27C104.79 344.27 102.46 340.27 100.27 336.32C98.08 332.37 95.94 328.32 92.89 325.01C89.84 321.7 85.66 319.11 81.15 319.01C76.64 318.91 71.93 321.81 70.93 326.21C69.93 330.61 72.66 334.98 75.59 338.43C79.9478 343.559 85.0235 348.032 90.66 351.71C91.7504 352.254 92.6372 353.134 93.19 354.22C94.09 356.23 92.09 358.35 90.09 359.1C87.77 359.95 85.22 359.79 82.78 360.16C80.34 360.53 77.71 361.68 76.85 364C75.67 367.22 78.47 370.45 81.18 372.54C86.6384 376.736 92.7732 379.969 99.32 382.1C101.66 382.86 104.12 383.51 106.04 385.05C107.96 386.59 109.17 389.35 108.12 391.58C107.07 393.81 104.19 394.58 101.75 394.23C99.31 393.88 97.1 392.64 94.75 391.86C90.38 390.39 84.75 390.86 82.15 394.65C81.3484 395.944 80.8604 397.407 80.7249 398.923C80.5895 400.438 80.8104 401.965 81.37 403.38C82.5191 406.192 84.2191 408.745 86.37 410.89C93.5176 418.808 102.633 424.693 112.79 427.95C122.93 431.05 132.25 431.68 142.1 427.75" fill="#EBEBEB" />
                                        <path id="Vector_2" d="M75.44 321.76L75.75 322.04L76.75 322.83C77.6 323.52 78.85 324.54 80.42 325.89C84.8792 329.701 89.0413 333.846 92.87 338.29C95.31 341.08 97.87 344.29 100.52 347.72C103.17 351.15 105.99 354.91 108.8 358.93C111.773 363.108 114.51 367.448 117 371.93C118.29 374.26 119.46 376.71 120.64 379.21L124.23 386.8C128.846 396.401 132.913 406.257 136.41 416.32C139.228 424.546 141.26 433.021 142.48 441.63C143.271 447.441 143.552 453.31 143.32 459.17C143.22 461.24 143.11 462.85 142.99 463.94C142.99 464.47 142.91 464.88 142.88 465.18C142.85 465.48 142.88 465.6 142.88 465.6C142.88 465.6 143.27 463.33 143.52 459.18C143.827 453.308 143.593 447.419 142.82 441.59C141.648 432.946 139.638 424.436 136.82 416.18C133.339 406.094 129.279 396.218 124.66 386.6C123.44 384.04 122.25 381.51 121.06 379.01C119.87 376.51 118.71 374.01 117.41 371.71C114.879 367.216 112.102 362.866 109.09 358.68C106.26 354.68 103.43 350.94 100.75 347.48C98.07 344.02 95.51 340.86 93.05 338.07C89.2037 333.637 85.0104 329.517 80.51 325.75C78.92 324.42 77.65 323.42 76.78 322.75L75.78 321.99L75.44 321.76Z" fill="#E0E0E0" />
                                        <path id="Vector_3" d="M117.26 371.69C117.374 371.25 117.454 370.802 117.5 370.35C117.63 369.48 117.78 368.23 117.95 366.67C118.28 363.57 118.6 359.26 118.95 354.51C119.3 349.76 119.68 345.51 120.09 342.38C120.28 340.83 120.46 339.58 120.59 338.72C120.682 338.276 120.732 337.824 120.74 337.37C120.589 337.799 120.478 338.241 120.41 338.69C120.22 339.54 120 340.79 119.76 342.33C119.27 345.42 118.82 349.72 118.48 354.48C118.14 359.24 117.84 363.48 117.62 366.64C117.5 368.13 117.4 369.37 117.32 370.33C117.254 370.78 117.233 371.236 117.26 371.69Z" fill="#E0E0E0" />
                                        <path id="Vector_4" d="M76.56 365.55C76.6955 365.594 76.8376 365.614 76.98 365.61L78.18 365.67C79.18 365.72 80.73 365.79 82.59 365.93C86.31 366.2 91.44 366.74 97.06 367.6C102.68 368.46 107.74 369.47 111.38 370.3C113.2 370.71 114.66 371.07 115.67 371.3L116.84 371.59C116.977 371.63 117.118 371.653 117.26 371.66C117.139 371.587 117.008 371.533 116.87 371.5L115.72 371.13C114.72 370.82 113.27 370.41 111.45 369.96C107.83 369.04 102.77 367.96 97.13 367.11C91.49 366.26 86.35 365.76 82.61 365.58C80.75 365.48 79.23 365.46 78.19 365.47H76.98C76.8373 365.48 76.6963 365.507 76.56 365.55Z" fill="#E0E0E0" />
                                        <path id="Vector_5" d="M136.32 415.47C136.416 415.31 136.5 415.143 136.57 414.97C136.73 414.58 136.95 414.1 137.21 413.5C137.75 412.22 138.5 410.35 139.4 408.03C141.19 403.39 143.47 396.9 145.9 389.71C148.33 382.52 150.55 376.03 152.26 371.36C153.11 369.07 153.81 367.2 154.31 365.84C154.54 365.23 154.72 364.73 154.86 364.34C154.936 364.167 154.993 363.986 155.03 363.8C154.929 363.957 154.845 364.125 154.78 364.3L154.14 365.77C153.59 367.05 152.85 368.92 151.95 371.24C150.16 375.88 147.88 382.37 145.45 389.56C143.02 396.75 140.8 403.24 139.09 407.91C138.24 410.2 137.54 412.07 137.04 413.43C136.81 414.04 136.63 414.54 136.48 414.93C136.403 415.102 136.349 415.284 136.32 415.47Z" fill="#E0E0E0" />
                                        <path id="Vector_6" d="M82.01 400.15C82.1842 400.229 82.3648 400.292 82.55 400.34L84.13 400.79L89.96 402.43C94.87 403.81 101.63 405.81 109.1 408.03C116.57 410.25 123.35 412.21 128.29 413.51C130.76 414.16 132.76 414.67 134.15 415L135.75 415.37C135.937 415.42 136.127 415.454 136.32 415.47C136.145 415.385 135.96 415.321 135.77 415.28L134.19 414.82L128.37 413.19C123.46 411.8 116.7 409.81 109.23 407.58C101.76 405.35 94.98 403.41 90.09 402.11C87.62 401.45 85.62 400.94 84.23 400.62L82.63 400.25C82.4287 400.189 82.2202 400.156 82.01 400.15Z" fill="#E0E0E0" />
                                        <path id="Vector_7" d="M187.97 150.17H29V256.64H187.97V150.17Z" fill="#EBEBEB" />
                                        <path id="Vector_8" d="M187.97 150.17H29V160.81H187.97V150.17Z" fill="#E0E0E0" />
                                        <path id="Vector_9" d="M35.89 155.49C35.9101 155.748 35.8518 156.007 35.7229 156.232C35.5939 156.457 35.4001 156.638 35.1669 156.751C34.9336 156.864 34.6717 156.904 34.4153 156.866C34.1588 156.828 33.9197 156.714 33.7292 156.538C33.5387 156.362 33.4055 156.133 33.3471 155.881C33.2886 155.628 33.3077 155.364 33.4017 155.122C33.4957 154.881 33.6603 154.673 33.874 154.526C34.0878 154.38 34.3408 154.301 34.6 154.3C34.7629 154.293 34.9255 154.319 35.0785 154.375C35.2315 154.431 35.3719 154.517 35.4917 154.628C35.6115 154.738 35.7084 154.871 35.7767 155.019C35.8451 155.167 35.8836 155.327 35.89 155.49Z" fill="#FAFAFA" />
                                        <path id="Vector_10" d="M40.09 155.49C40.1101 155.748 40.0519 156.007 39.9229 156.232C39.7939 156.457 39.6001 156.638 39.3669 156.751C39.1337 156.864 38.8717 156.904 38.6153 156.866C38.3588 156.828 38.1198 156.714 37.9292 156.538C37.7387 156.362 37.6055 156.133 37.5471 155.881C37.4886 155.628 37.5077 155.364 37.6017 155.122C37.6957 154.881 37.8603 154.673 38.074 154.526C38.2878 154.38 38.5408 154.301 38.8 154.3C38.9629 154.293 39.1255 154.319 39.2785 154.375C39.4315 154.431 39.5719 154.517 39.6917 154.628C39.8116 154.738 39.9084 154.871 39.9767 155.019C40.0451 155.167 40.0836 155.327 40.09 155.49Z" fill="#FAFAFA" />
                                        <path id="Vector_11" d="M44.18 155.49C44.2001 155.749 44.1417 156.008 44.0122 156.233C43.8828 156.458 43.6885 156.639 43.4546 156.752C43.2208 156.865 42.9583 156.904 42.7016 156.866C42.4448 156.827 42.2057 156.712 42.0155 156.535C41.8254 156.358 41.693 156.128 41.6357 155.875C41.5784 155.621 41.5989 155.357 41.6944 155.115C41.79 154.874 41.9562 154.667 42.1713 154.521C42.3864 154.376 42.6403 154.299 42.9 154.3C43.0624 154.293 43.2245 154.319 43.3769 154.375C43.5293 154.432 43.6691 154.517 43.7881 154.628C43.9071 154.739 44.003 154.872 44.0703 155.02C44.1376 155.168 44.1749 155.328 44.18 155.49Z" fill="#FAFAFA" />
                                        <path id="Vector_12" d="M468.25 147H309.28V253.47H468.25V147Z" fill="#EBEBEB" />
                                        <path id="Vector_13" d="M468.25 147H309.28V157.64H468.25V147Z" fill="#E0E0E0" />
                                        <path id="Vector_14" d="M316.16 152.32C316.132 152.641 315.984 152.94 315.746 153.158C315.508 153.376 315.197 153.497 314.875 153.497C314.553 153.497 314.242 153.376 314.004 153.158C313.766 152.94 313.618 152.641 313.59 152.32C313.618 151.999 313.766 151.7 314.004 151.482C314.242 151.264 314.553 151.143 314.875 151.143C315.197 151.143 315.508 151.264 315.746 151.482C315.984 151.7 316.132 151.999 316.16 152.32Z" fill="#FAFAFA" />
                                        <path id="Vector_15" d="M320.31 152.32C320.328 152.578 320.268 152.836 320.138 153.06C320.007 153.283 319.813 153.462 319.579 153.574C319.346 153.686 319.084 153.724 318.828 153.685C318.572 153.646 318.334 153.531 318.145 153.355C317.955 153.178 317.823 152.949 317.765 152.697C317.708 152.444 317.728 152.18 317.822 151.939C317.916 151.698 318.081 151.491 318.295 151.345C318.509 151.199 318.761 151.121 319.02 151.12C319.184 151.113 319.347 151.139 319.501 151.196C319.654 151.253 319.795 151.339 319.915 151.451C320.035 151.563 320.132 151.697 320.2 151.846C320.267 151.995 320.305 152.156 320.31 152.32Z" fill="#FAFAFA" />
                                        <path id="Vector_16" d="M324.46 152.32C324.478 152.578 324.418 152.836 324.288 153.06C324.157 153.283 323.963 153.462 323.729 153.574C323.496 153.686 323.234 153.724 322.978 153.685C322.722 153.646 322.484 153.531 322.295 153.355C322.105 153.178 321.973 152.949 321.915 152.697C321.858 152.444 321.878 152.18 321.972 151.939C322.066 151.698 322.231 151.491 322.445 151.345C322.659 151.199 322.911 151.121 323.17 151.12C323.334 151.113 323.497 151.139 323.651 151.196C323.804 151.253 323.945 151.339 324.065 151.451C324.185 151.563 324.282 151.697 324.35 151.846C324.417 151.995 324.455 152.156 324.46 152.32Z" fill="#FAFAFA" />
                                    </g>
                                    <g className={websiteSvgVisible ? 'move-from-top-2' : ''} id="freepik--Windows--inject-10">
                                        <path id="Vector_17" d="M273.84 71.8H71V207.65H273.84V71.8Z" fill="white" />
                                        <path id="Vector_18" d="M274.04 70.83H71.2V84.4H274.04V70.83Z" fill="#EBEBEB" />
                                        <path id="Vector_19" d="M81.93 76.65C81.9521 76.9781 81.8749 77.3053 81.7087 77.5891C81.5424 77.8729 81.2946 78.1001 80.9976 78.2413C80.7005 78.3824 80.3679 78.431 80.0428 78.3807C79.7178 78.3304 79.4154 78.1835 79.1749 77.9592C78.9345 77.7348 78.767 77.4433 78.6943 77.1226C78.6216 76.8018 78.647 76.4666 78.7672 76.1605C78.8874 75.8543 79.0969 75.5914 79.3685 75.4059C79.64 75.2204 79.9611 75.1207 80.29 75.12C80.7101 75.1065 81.1184 75.2598 81.4257 75.5466C81.7331 75.8333 81.9144 76.23 81.93 76.65Z" fill="#FAFAFA" />
                                        <path id="Vector_20" d="M87.22 76.65C87.2421 76.9781 87.1649 77.3053 86.9987 77.5891C86.8324 77.8729 86.5846 78.1001 86.2876 78.2413C85.9905 78.3824 85.6579 78.431 85.3329 78.3807C85.0078 78.3304 84.7054 78.1835 84.465 77.9592C84.2245 77.7348 84.057 77.4433 83.9843 77.1226C83.9116 76.8018 83.937 76.4666 84.0572 76.1605C84.1774 75.8543 84.3869 75.5914 84.6585 75.4059C84.93 75.2204 85.2511 75.1207 85.58 75.12C86.0001 75.1065 86.4084 75.2598 86.7157 75.5466C87.0231 75.8333 87.2044 76.23 87.22 76.65Z" fill="#FAFAFA" />
                                        <path id="Vector_21" d="M92.51 76.65C92.532 76.9773 92.4553 77.3037 92.2898 77.5869C92.1244 77.8702 91.8778 78.0973 91.582 78.239C91.2861 78.3807 90.9545 78.4304 90.6301 78.3817C90.3057 78.3329 90.0034 78.1881 89.7622 77.9658C89.521 77.7434 89.352 77.4539 89.2771 77.1345C89.2021 76.8152 89.2247 76.4807 89.3418 76.1743C89.4589 75.8679 89.6652 75.6036 89.9341 75.4157C90.203 75.2277 90.522 75.1248 90.85 75.12C91.06 75.1093 91.27 75.1406 91.4677 75.212C91.6655 75.2835 91.8469 75.3937 92.0015 75.5362C92.1561 75.6786 92.2807 75.8506 92.368 76.0418C92.4554 76.2331 92.5036 76.4399 92.51 76.65Z" fill="#FAFAFA" />
                                        <path id="Vector_22" d="M274.04 206.69C274.04 206.69 274.04 205.84 274.04 204.22C274.04 202.6 274.04 200.22 274.04 197.06C274.04 190.78 274.04 181.55 273.98 169.74C273.98 146.14 273.91 112.21 273.86 70.83L274.09 71.06L71.22 71.12L71.51 70.83C71.51 119.23 71.51 165.26 71.51 206.69L71.25 206.42L217.4 206.55L259.14 206.62H270.24H273.11H274.11H273.16H270.32H259.32L217.64 206.69L71.31 206.82H71.05V206.56C71.05 165.13 71.05 119.1 71.05 70.7V70.42H71.36H274.18H274.41V70.65C274.36 112.09 274.31 146.07 274.28 169.71C274.28 181.49 274.28 190.71 274.23 196.97C274.23 200.09 274.23 202.47 274.23 204.09C274.23 205.71 274.04 206.69 274.04 206.69Z" fill="#263238" />
                                        <path id="Vector_23" d="M130.53 146.65H84.41V149.74H130.53V146.65Z" fill="#FFE662" />
                                        <path id="Vector_24" d="M190.1 103.82H143.98V106.91H190.1V103.82Z" fill="#FFE662" />
                                        <path id="Vector_25" d="M258.69 115.31C258.69 115.47 233.01 115.6 201.34 115.6C169.67 115.6 143.98 115.47 143.98 115.31C143.98 115.15 169.65 115.02 201.34 115.02C233.03 115.02 258.69 115.12 258.69 115.31Z" fill="#263238" />
                                        <path id="Vector_26" d="M258.69 122.05C258.69 122.2 233.01 122.33 201.34 122.33C169.67 122.33 143.98 122.2 143.98 122.05C143.98 121.9 169.65 121.76 201.34 121.76C233.03 121.76 258.69 121.89 258.69 122.05Z" fill="#263238" />
                                        <path id="Vector_27" d="M258.69 128.78C258.69 128.94 233.01 129.07 201.34 129.07C169.67 129.07 143.98 128.94 143.98 128.78C143.98 128.62 169.65 128.49 201.34 128.49C233.03 128.49 258.69 128.62 258.69 128.78Z" fill="#263238" />
                                        <path id="Vector_28" d="M258.69 135.52C258.69 135.68 233.01 135.81 201.34 135.81C169.67 135.81 143.98 135.68 143.98 135.52C143.98 135.36 169.65 135.23 201.34 135.23C233.03 135.23 258.69 135.36 258.69 135.52Z" fill="#263238" />
                                        <path id="Vector_29" d="M258.69 142.26C258.69 142.42 233.01 142.54 201.34 142.54C169.67 142.54 143.98 142.42 143.98 142.26C143.98 142.1 169.65 141.97 201.34 141.97C233.03 141.97 258.69 142.12 258.69 142.26Z" fill="#263238" />
                                        <path id="Vector_30" d="M188.76 148.99C188.76 149.15 178.76 149.28 166.37 149.28C153.98 149.28 143.98 149.15 143.98 148.99C143.98 148.83 153.98 148.71 166.37 148.71C178.76 148.71 188.76 148.83 188.76 148.99Z" fill="#263238" />
                                        <path id="Vector_31" d="M257.85 162.12C257.85 162.28 240.97 162.41 220.15 162.41C199.33 162.41 182.45 162.28 182.45 162.12C182.45 161.96 199.33 161.83 220.15 161.83C240.97 161.83 257.85 161.91 257.85 162.12Z" fill="#263238" />
                                        <path id="Vector_32" d="M257.85 169.22C257.85 169.38 240.97 169.51 220.15 169.51C199.33 169.51 182.45 169.38 182.45 169.22C182.45 169.06 199.33 168.93 220.15 168.93C240.97 168.93 257.85 169.06 257.85 169.22Z" fill="#263238" />
                                        <path id="Vector_33" d="M257.85 176.37C257.85 176.53 240.97 176.66 220.15 176.66C199.33 176.66 182.45 176.53 182.45 176.37C182.45 176.21 199.33 176.08 220.15 176.08C240.97 176.08 257.85 176.21 257.85 176.37Z" fill="#263238" />
                                        <path id="Vector_34" d="M257.85 183.52C257.85 183.68 240.97 183.81 220.15 183.81C199.33 183.81 182.45 183.68 182.45 183.52C182.45 183.36 199.33 183.23 220.15 183.23C240.97 183.23 257.85 183.36 257.85 183.52Z" fill="#263238" />
                                        <path id="Vector_35" d="M130.64 161.38C130.64 161.54 120.58 161.67 108.17 161.67C95.76 161.67 85.7 161.54 85.7 161.38C85.7 161.22 95.76 161.1 108.17 161.1C120.58 161.1 130.64 161.22 130.64 161.38Z" fill="#263238" />
                                        <path id="Vector_36" d="M130.64 167C130.64 167.16 120.58 167.29 108.17 167.29C95.76 167.29 85.7 167.16 85.7 167C85.7 166.84 95.76 166.71 108.17 166.71C120.58 166.71 130.64 166.84 130.64 167Z" fill="#263238" />
                                        <path id="Vector_37" d="M130.64 172.62C130.64 172.77 120.58 172.9 108.17 172.9C95.76 172.9 85.7 172.77 85.7 172.62C85.7 172.47 95.76 172.33 108.17 172.33C120.58 172.33 130.64 172.46 130.64 172.62Z" fill="#263238" />
                                        <path id="Vector_38" d="M130.64 178.23C130.64 178.39 120.58 178.52 108.17 178.52C95.76 178.52 85.7 178.39 85.7 178.23C85.7 178.07 95.76 177.94 108.17 177.94C120.58 177.94 130.64 178.12 130.64 178.23Z" fill="#263238" />
                                        <path id="Vector_39" d="M130.64 183.85C130.64 184.01 120.58 184.14 108.17 184.14C95.76 184.14 85.7 184.01 85.7 183.85C85.7 183.69 95.76 183.56 108.17 183.56C120.58 183.56 130.64 183.69 130.64 183.85Z" fill="#263238" />
                                        <path id="Vector_40" d="M176.67 158.66H143.95V190.32H176.67V158.66Z" fill="#FFE662" />
                                        <g id="Group" opacity="0.3">
                                            <path id="Vector_41" d="M146.49 187.6L155.54 171.31L162.94 181.73L167.44 176.2L174.13 187.6H146.49Z" fill="black" />
                                        </g>
                                        <g id="Group_2" opacity="0.3">
                                            <path id="Vector_42" d="M166.1 168.12C166.1 168.587 165.962 169.043 165.702 169.431C165.443 169.819 165.074 170.122 164.643 170.3C164.212 170.479 163.737 170.526 163.28 170.435C162.822 170.344 162.401 170.119 162.071 169.789C161.741 169.459 161.516 169.038 161.425 168.58C161.334 168.123 161.381 167.648 161.56 167.217C161.738 166.786 162.041 166.417 162.429 166.158C162.817 165.898 163.273 165.76 163.74 165.76C164.366 165.76 164.966 166.009 165.409 166.451C165.851 166.894 166.1 167.494 166.1 168.12Z" fill="black" />
                                        </g>
                                        <path id="Vector_43" opacity="0.3" d="M174.13 187.69V187.56C174.13 187.47 174.13 187.35 174.13 187.19C174.13 186.86 174.13 186.38 174.13 185.77C174.13 184.51 174.13 182.7 174.13 180.39C174.13 175.77 174.13 169.18 174.06 161.28L174.19 161.41H146.55L146.7 161.26V175.17C146.7 179.6 146.7 183.8 146.7 187.65L146.57 187.52L166.57 187.59H172.2H173.7H172.26H166.65L146.58 187.66H146.44V187.52C146.44 183.67 146.44 179.52 146.44 175.04C146.44 172.82 146.44 170.547 146.44 168.22V161.13L146.6 160.97H174.24H174.38V161.11C174.38 169.05 174.38 175.66 174.31 180.31C174.31 182.6 174.31 184.41 174.31 185.65C174.31 186.26 174.31 186.72 174.31 187.05V187.41C174.14 187.66 174.14 187.69 174.13 187.69Z" fill="black" />
                                        <path id="Vector_44" d="M128.77 94.99H82.53V139.72H128.77V94.99Z" fill="#FFE662" />
                                        <g id="Group_3" opacity="0.3">
                                            <path id="Vector_45" d="M86.11 135.9L98.9 112.88L109.37 127.59L115.72 119.78L125.18 135.9H86.11Z" fill="black" />
                                        </g>
                                        <g id="Group_4" opacity="0.3">
                                            <path id="Vector_46" d="M110.49 111.73C112.329 111.73 113.82 110.239 113.82 108.4C113.82 106.561 112.329 105.07 110.49 105.07C108.651 105.07 107.16 106.561 107.16 108.4C107.16 110.239 108.651 111.73 110.49 111.73Z" fill="black" />
                                        </g>
                                        <path id="Vector_47" opacity="0.3" d="M125.18 136.02C125.176 135.96 125.176 135.9 125.18 135.84C125.18 135.7 125.18 135.53 125.18 135.32C125.18 134.84 125.18 134.17 125.18 133.32C125.18 131.55 125.18 128.98 125.13 125.72C125.13 119.19 125.07 109.89 125.03 98.72L125.22 98.9H86.16C86.2253 98.8224 86.2955 98.7489 86.37 98.68V118.35C86.37 124.62 86.37 130.54 86.37 135.99L86.18 135.8L114.43 135.9L122.43 135.95H124.54H122.47L114.54 136L86.17 136.1H85.98V135.91C85.98 130.46 85.98 124.54 85.98 118.27C85.98 115.14 85.98 111.92 85.98 108.63V98.63C85.79 98.83 86.25 98.36 86.21 98.41H125.27H125.46V98.6C125.46 109.82 125.39 119.16 125.36 125.73C125.36 128.96 125.36 131.52 125.36 133.28C125.36 134.13 125.36 134.79 125.36 135.28V135.78C125.314 135.869 125.253 135.95 125.18 136.02Z" fill="black" />
                                        <path id="Vector_48" d="M446.49 78.29H250.07V209.84H446.49V78.29Z" fill="white" />
                                        <path id="Vector_49" d="M446.68 77.36H250.26V90.5H446.68V77.36Z" fill="#EBEBEB" />
                                        <path id="Vector_50" d="M260.65 83C260.672 83.3183 260.598 83.6358 260.437 83.9113C260.276 84.1868 260.036 84.4076 259.749 84.545C259.461 84.6824 259.138 84.73 258.823 84.6816C258.507 84.6333 258.214 84.4912 257.98 84.2739C257.747 84.0565 257.584 83.774 257.513 83.4629C257.443 83.1519 257.467 82.8267 257.583 82.5297C257.7 82.2327 257.903 81.9776 258.166 81.7975C258.43 81.6175 258.741 81.5208 259.06 81.52C259.262 81.512 259.463 81.544 259.652 81.6142C259.842 81.6843 260.015 81.7913 260.163 81.9289C260.311 82.0665 260.43 82.232 260.514 82.4158C260.597 82.5996 260.644 82.7982 260.65 83Z" fill="#FAFAFA" />
                                        <path id="Vector_51" d="M265.78 83C265.802 83.3182 265.728 83.6357 265.567 83.9113C265.406 84.1868 265.166 84.4076 264.879 84.545C264.591 84.6824 264.268 84.73 263.953 84.6816C263.637 84.6332 263.344 84.4912 263.111 84.2738C262.877 84.0565 262.714 83.7739 262.643 83.4629C262.573 83.1518 262.597 82.8267 262.714 82.5297C262.83 82.2327 263.033 81.9776 263.296 81.7975C263.56 81.6175 263.871 81.5207 264.19 81.52C264.597 81.5065 264.992 81.6546 265.29 81.9319C265.588 82.2092 265.764 82.5933 265.78 83Z" fill="#FAFAFA" />
                                        <path id="Vector_52" d="M270.9 83C270.922 83.3183 270.848 83.6358 270.687 83.9113C270.526 84.1868 270.286 84.4076 269.999 84.545C269.711 84.6824 269.388 84.73 269.073 84.6816C268.757 84.6333 268.464 84.4912 268.231 84.2739C267.997 84.0565 267.834 83.774 267.763 83.4629C267.693 83.1519 267.717 82.8267 267.834 82.5297C267.95 82.2327 268.153 81.9776 268.416 81.7975C268.68 81.6175 268.991 81.5208 269.31 81.52C269.512 81.512 269.713 81.544 269.903 81.6142C270.092 81.6843 270.265 81.7913 270.413 81.9289C270.561 82.0665 270.68 82.232 270.764 82.4158C270.847 82.5996 270.894 82.7982 270.9 83Z" fill="#FAFAFA" />
                                        <path id="Vector_53" d="M446.68 208.92C446.68 208.92 446.68 208.1 446.68 206.53C446.68 204.96 446.68 202.63 446.68 199.59C446.68 193.51 446.68 184.59 446.62 173.14C446.62 150.28 446.55 117.42 446.5 77.36L446.73 77.59L250.33 77.65L250.62 77.36C250.62 124.23 250.62 168.8 250.62 208.92L250.35 208.65L391.88 208.78L432.3 208.85H443.05H445.82H446.77H445.85H443.11H432.42L392.05 208.92L250.35 209.05H250.09V208.79C250.09 168.67 250.09 124.1 250.09 77.23V77.12H250.39L446.79 77.18H447.02V77.41C446.97 117.53 446.93 150.41 446.9 173.33C446.9 184.75 446.9 193.66 446.84 199.73C446.84 202.73 446.84 205.06 446.84 206.63C446.84 208.2 446.68 208.92 446.68 208.92Z" fill="#263238" />
                                        <path id="Vector_54" d="M307.71 150.78H263.05V153.77H307.71V150.78Z" fill="#FFE662" />
                                        <path id="Vector_55" d="M365.4 109.3H320.74V112.29H365.4V109.3Z" fill="#FFE662" />
                                        <path id="Vector_56" d="M431.85 120.43C431.85 120.59 406.98 120.72 376.31 120.72C345.64 120.72 320.77 120.59 320.77 120.43C320.77 120.27 345.63 120.14 376.31 120.14C406.99 120.14 431.85 120.27 431.85 120.43Z" fill="#263238" />
                                        <path id="Vector_57" d="M431.85 126.95C431.85 127.11 406.98 127.24 376.31 127.24C345.64 127.24 320.77 127.11 320.77 126.95C320.77 126.79 345.63 126.67 376.31 126.67C406.99 126.67 431.85 126.79 431.85 126.95Z" fill="#263238" />
                                        <path id="Vector_58" d="M431.85 133.48C431.85 133.64 406.98 133.76 376.31 133.76C345.64 133.76 320.77 133.64 320.77 133.48C320.77 133.32 345.63 133.19 376.31 133.19C406.99 133.19 431.85 133.32 431.85 133.48Z" fill="#263238" />
                                        <path id="Vector_59" d="M431.85 140C431.85 140.16 406.98 140.29 376.31 140.29C345.64 140.29 320.77 140.16 320.77 140C320.77 139.84 345.63 139.71 376.31 139.71C406.99 139.71 431.85 139.84 431.85 140Z" fill="#263238" />
                                        <path id="Vector_60" d="M431.85 146.52C431.85 146.68 406.98 146.81 376.31 146.81C345.64 146.81 320.77 146.68 320.77 146.52C320.77 146.36 345.63 146.24 376.31 146.24C406.99 146.24 431.85 146.37 431.85 146.52Z" fill="#263238" />
                                        <path id="Vector_61" d="M364.1 153.05C364.1 153.21 354.39 153.34 342.42 153.34C330.45 153.34 320.74 153.21 320.74 153.05C320.74 152.89 330.44 152.76 342.42 152.76C354.4 152.76 364.1 152.89 364.1 153.05Z" fill="#263238" />
                                        <path id="Vector_62" d="M431.01 165.71C431.01 165.87 414.67 166 394.51 166C374.35 166 358 165.87 358 165.71C358 165.55 374.34 165.42 394.51 165.42C414.68 165.42 431.01 165.55 431.01 165.71Z" fill="#263238" />
                                        <path id="Vector_63" d="M431.01 172.63C431.01 172.79 414.67 172.92 394.51 172.92C374.35 172.92 358 172.79 358 172.63C358 172.47 374.34 172.35 394.51 172.35C414.68 172.35 431.01 172.48 431.01 172.63Z" fill="#263238" />
                                        <path id="Vector_64" d="M431.01 179.56C431.01 179.72 414.67 179.85 394.51 179.85C374.35 179.85 358 179.72 358 179.56C358 179.4 374.34 179.27 394.51 179.27C414.68 179.27 431.01 179.4 431.01 179.56Z" fill="#263238" />
                                        <path id="Vector_65" d="M431.01 186.48C431.01 186.64 414.67 186.77 394.51 186.77C374.35 186.77 358 186.64 358 186.48C358 186.32 374.34 186.2 394.51 186.2C414.68 186.2 431.01 186.32 431.01 186.48Z" fill="#263238" />
                                        <path id="Vector_66" d="M307.85 165.05C307.85 165.21 298.1 165.33 286.09 165.33C274.08 165.33 264.32 165.21 264.32 165.05C264.32 164.89 274.06 164.76 286.09 164.76C298.12 164.76 307.85 164.89 307.85 165.05Z" fill="#263238" />
                                        <path id="Vector_67" d="M307.85 170.48C307.85 170.64 298.1 170.77 286.09 170.77C274.08 170.77 264.32 170.64 264.32 170.48C264.32 170.32 274.06 170.2 286.09 170.2C298.12 170.2 307.85 170.33 307.85 170.48Z" fill="#263238" />
                                        <path id="Vector_68" d="M307.85 175.92C307.85 176.08 298.1 176.21 286.09 176.21C274.08 176.21 264.32 176.08 264.32 175.92C264.32 175.76 274.06 175.64 286.09 175.64C298.12 175.64 307.85 175.76 307.85 175.92Z" fill="#263238" />
                                        <path id="Vector_69" d="M307.85 181.36C307.85 181.52 298.1 181.65 286.09 181.65C274.08 181.65 264.32 181.52 264.32 181.36C264.32 181.2 274.06 181.07 286.09 181.07C298.12 181.07 307.85 181.2 307.85 181.36Z" fill="#263238" />
                                        <path id="Vector_70" d="M307.85 186.8C307.85 186.96 298.1 187.09 286.09 187.09C274.08 187.09 264.32 186.96 264.32 186.8C264.32 186.64 274.06 186.51 286.09 186.51C298.12 186.51 307.85 186.64 307.85 186.8Z" fill="#263238" />
                                        <path id="Vector_71" d="M352.4 162.4H320.71V193.06H352.4V162.4Z" fill="#FFE662" />
                                        <g id="Group_5" opacity="0.3">
                                            <path id="Vector_72" d="M323.17 190.44L331.93 174.66L339.1 184.75L343.46 179.39L349.94 190.44H323.17Z" fill="black" />
                                        </g>
                                        <g id="Group_6" opacity="0.3">
                                            <path id="Vector_73" d="M342.16 171.59C342.16 172.041 342.026 172.482 341.776 172.857C341.525 173.232 341.169 173.524 340.753 173.696C340.336 173.869 339.877 173.914 339.435 173.826C338.993 173.738 338.587 173.521 338.268 173.202C337.949 172.883 337.732 172.477 337.644 172.035C337.556 171.593 337.601 171.134 337.774 170.717C337.946 170.301 338.238 169.945 338.613 169.694C338.988 169.444 339.429 169.31 339.88 169.31C340.485 169.31 341.065 169.55 341.492 169.978C341.92 170.405 342.16 170.985 342.16 171.59Z" fill="black" />
                                        </g>
                                        <path id="Vector_74" opacity="0.3" d="M349.94 190.52C349.942 190.48 349.942 190.44 349.94 190.4V190.04C349.94 189.71 349.94 189.25 349.94 188.66C349.94 187.44 349.94 185.66 349.94 183.45C349.94 178.98 349.94 172.6 349.87 164.94L350 165.07H323.23C323.23 165.07 323.51 164.79 323.38 164.93V171.81C323.38 174.06 323.38 176.27 323.38 178.42C323.38 182.71 323.38 186.77 323.38 190.5L323.25 190.37L342.61 190.44H348.07H349.51H348.12H342.69L323.25 190.5H323.12V190.37C323.12 186.64 323.12 182.58 323.12 178.29V164.95C322.98 165.08 323.3 164.76 323.27 164.79H350.04H350.17V164.92C350.17 172.61 350.12 179.02 350.1 183.52C350.1 185.74 350.1 187.52 350.1 188.69C350.1 189.28 350.1 189.69 350.1 190.05C350.1 190.19 350.1 190.3 350.1 190.39C350.062 190.45 350.006 190.495 349.94 190.52Z" fill="black" />
                                        <path id="Vector_75" d="M398.52 49.52H140.22V222.52H398.52V49.52Z" fill="white" />
                                        <path id="Vector_76" d="M398.77 48.29H140.47V65.57H398.77V48.29Z" fill="#E0E0E0" />
                                        <path id="Vector_77" d="M154.13 55.7C154.16 56.1189 154.063 56.5371 153.852 56.9002C153.641 57.2633 153.326 57.5544 152.947 57.7355C152.568 57.9167 152.143 57.9795 151.728 57.9158C151.313 57.8521 150.927 57.6648 150.62 57.3784C150.313 57.092 150.099 56.7196 150.007 56.31C149.914 55.9003 149.947 55.4723 150.102 55.0818C150.256 54.6912 150.525 54.3562 150.872 54.1204C151.22 53.8847 151.63 53.7591 152.05 53.76C152.314 53.7493 152.578 53.7912 152.826 53.8831C153.074 53.9751 153.302 54.1154 153.495 54.2958C153.688 54.4762 153.844 54.6932 153.953 54.9343C154.062 55.1753 154.122 55.4356 154.13 55.7Z" fill="#FAFAFA" />
                                        <path id="Vector_78" d="M160.85 55.7C160.88 56.1184 160.784 56.5363 160.573 56.8991C160.362 57.262 160.047 57.553 159.669 57.7344C159.291 57.9159 158.867 57.9793 158.452 57.9164C158.037 57.8535 157.651 57.6672 157.344 57.3818C157.036 57.0964 156.822 56.725 156.728 56.3161C156.634 55.9071 156.666 55.4795 156.819 55.0887C156.972 54.698 157.239 54.3624 157.585 54.1254C157.931 53.8884 158.34 53.7611 158.76 53.76C159.025 53.7479 159.29 53.7888 159.539 53.8801C159.788 53.9715 160.017 54.1115 160.211 54.2921C160.406 54.4727 160.563 54.6901 160.672 54.9319C160.782 55.1736 160.842 55.4347 160.85 55.7Z" fill="#FAFAFA" />
                                        <path id="Vector_79" d="M167.61 55.7C167.642 56.1211 167.547 56.5421 167.336 56.9081C167.125 57.2741 166.809 57.568 166.428 57.7515C166.048 57.9349 165.621 57.9995 165.204 57.9366C164.786 57.8738 164.397 57.6864 164.087 57.3991C163.778 57.1118 163.562 56.7378 163.468 56.326C163.375 55.9142 163.407 55.4837 163.562 55.0908C163.717 54.6978 163.986 54.3606 164.336 54.1232C164.685 53.8858 165.098 53.7592 165.52 53.76C165.785 53.7479 166.05 53.7888 166.299 53.8801C166.548 53.9715 166.777 54.1115 166.971 54.2921C167.166 54.4727 167.323 54.6901 167.432 54.9319C167.542 55.1736 167.602 55.4347 167.61 55.7Z" fill="#FAFAFA" />
                                        <path id="Vector_80" d="M398.77 221.29C398.77 219.41 398.68 153.67 398.54 48.29L398.77 48.52L140.49 48.58L140.78 48.29C140.78 109.92 140.78 168.53 140.78 221.29L140.51 221.03L398.81 221.29L140.51 221.55H140.25V221.29C140.25 168.53 140.25 109.92 140.25 48.29V48H140.55L398.83 48.06H399.06V48.29C398.85 153.67 398.78 219.41 398.77 221.29Z" fill="#263238" />
                                        <path id="Vector_81" d="M216.02 144.84H157.29V148.77H216.02V144.84Z" fill="#FFE662" />
                                        <path id="Vector_82" d="M291.88 90.29H233.15V94.22H291.88V90.29Z" fill="#FFE662" />
                                        <path id="Vector_83" d="M379.23 104.93C379.23 105.08 346.53 105.21 306.23 105.21C265.93 105.21 233.18 105.08 233.18 104.93C233.18 104.78 265.88 104.64 306.23 104.64C346.58 104.64 379.23 104.77 379.23 104.93Z" fill="#263238" />
                                        <path id="Vector_84" d="M379.23 113.5C379.23 113.66 346.53 113.79 306.23 113.79C265.93 113.79 233.18 113.66 233.18 113.5C233.18 113.34 265.88 113.22 306.23 113.22C346.58 113.22 379.23 113.35 379.23 113.5Z" fill="#263238" />
                                        <path id="Vector_85" d="M379.23 122.12C379.23 122.28 346.53 122.41 306.23 122.41C265.93 122.41 233.18 122.28 233.18 122.12C233.18 121.96 265.88 121.84 306.23 121.84C346.58 121.84 379.23 121.92 379.23 122.12Z" fill="#263238" />
                                        <path id="Vector_86" d="M379.23 130.66C379.23 130.82 346.53 130.95 306.23 130.95C265.93 130.95 233.18 130.82 233.18 130.66C233.18 130.5 265.88 130.38 306.23 130.38C346.58 130.38 379.23 130.5 379.23 130.66Z" fill="#263238" />
                                        <path id="Vector_87" d="M379.23 139.24C379.23 139.4 346.53 139.53 306.23 139.53C265.93 139.53 233.18 139.4 233.18 139.24C233.18 139.08 265.88 138.95 306.23 138.95C346.58 138.95 379.23 139.12 379.23 139.24Z" fill="#263238" />
                                        <path id="Vector_88" d="M290.17 147.82C290.17 147.98 277.41 148.11 261.66 148.11C245.91 148.11 233.15 147.98 233.15 147.82C233.15 147.66 245.91 147.53 261.66 147.53C277.41 147.53 290.17 147.66 290.17 147.82Z" fill="#263238" />
                                        <path id="Vector_89" d="M378.16 164.47C378.16 164.63 356.67 164.76 330.16 164.76C303.65 164.76 282.16 164.63 282.16 164.47C282.16 164.31 303.65 164.18 330.16 164.18C356.67 164.18 378.16 164.31 378.16 164.47Z" fill="#263238" />
                                        <path id="Vector_90" d="M378.16 173.58C378.16 173.74 356.67 173.87 330.16 173.87C303.65 173.87 282.16 173.74 282.16 173.58C282.16 173.42 303.65 173.29 330.16 173.29C356.67 173.29 378.16 173.42 378.16 173.58Z" fill="#263238" />
                                        <path id="Vector_91" d="M378.16 182.68C378.16 182.84 356.67 182.97 330.16 182.97C303.65 182.97 282.16 182.84 282.16 182.68C282.16 182.52 303.65 182.4 330.16 182.4C356.67 182.4 378.16 182.53 378.16 182.68Z" fill="#263238" />
                                        <path id="Vector_92" d="M378.16 191.79C378.16 191.95 356.67 192.08 330.16 192.08C303.65 192.08 282.16 191.95 282.16 191.79C282.16 191.63 303.65 191.5 330.16 191.5C356.67 191.5 378.16 191.63 378.16 191.79Z" fill="#263238" />
                                        <path id="Vector_93" d="M216.17 163.6C216.17 163.76 203.36 163.89 187.55 163.89C171.74 163.89 158.93 163.76 158.93 163.6C158.93 163.44 171.75 163.31 187.55 163.31C203.35 163.31 216.17 163.44 216.17 163.6Z" fill="#263238" />
                                        <path id="Vector_94" d="M216.17 170.75C216.17 170.91 203.36 171.04 187.55 171.04C171.74 171.04 158.93 170.91 158.93 170.75C158.93 170.59 171.75 170.46 187.55 170.46C203.35 170.46 216.17 170.59 216.17 170.75Z" fill="#263238" />
                                        <path id="Vector_95" d="M216.17 177.9C216.17 178.06 203.36 178.19 187.55 178.19C171.74 178.19 158.93 178.06 158.93 177.9C158.93 177.74 171.75 177.62 187.55 177.62C203.35 177.62 216.17 177.74 216.17 177.9Z" fill="#263238" />
                                        <path id="Vector_96" d="M216.17 185.05C216.17 185.21 203.36 185.34 187.55 185.34C171.74 185.34 158.93 185.21 158.93 185.05C158.93 184.89 171.75 184.77 187.55 184.77C203.35 184.77 216.17 184.9 216.17 185.05Z" fill="#263238" />
                                        <path id="Vector_97" d="M216.17 192.21C216.17 192.37 203.36 192.49 187.55 192.49C171.74 192.49 158.93 192.37 158.93 192.21C158.93 192.05 171.75 191.92 187.55 191.92C203.35 191.92 216.17 192.05 216.17 192.21Z" fill="#263238" />
                                        <path id="Vector_98" d="M274.78 160.13H233.11V200.44H274.78V160.13Z" fill="#FFE662" />
                                        <g id="Group_7" opacity="0.3">
                                            <path id="Vector_99" d="M236.35 196.99L247.87 176.24L257.3 189.5L263.03 182.46L271.55 196.99H236.35Z" fill="black" />
                                        </g>
                                        <g id="Group_8" opacity="0.3">
                                            <path id="Vector_100" d="M261.32 172.21C261.32 172.803 261.144 173.383 260.814 173.877C260.485 174.37 260.016 174.755 259.468 174.982C258.92 175.209 258.317 175.268 257.735 175.152C257.153 175.037 256.618 174.751 256.199 174.331C255.779 173.912 255.493 173.377 255.378 172.795C255.262 172.213 255.321 171.61 255.548 171.062C255.775 170.514 256.16 170.045 256.653 169.716C257.147 169.386 257.727 169.21 258.32 169.21C259.116 169.21 259.879 169.526 260.441 170.089C261.004 170.651 261.32 171.414 261.32 172.21Z" fill="black" />
                                        </g>
                                        <path id="Vector_101" opacity="0.3" d="M271.55 197.12C271.55 197.12 271.55 197.06 271.55 196.96C271.55 196.86 271.55 196.68 271.55 196.49C271.55 196.06 271.55 195.49 271.55 194.67C271.55 193.07 271.55 190.76 271.55 187.83C271.55 181.94 271.5 173.55 271.46 163.48L271.63 163.65H236.43L236.62 163.46V181.19C236.62 186.83 236.62 192.19 236.62 197.08L236.45 196.91L261.9 197H269.08H270.99H271.65C271.65 197 271.65 197 271.5 197H271.02H269.15H262.01L236.45 197.09H236.27V197.12C236.27 192.21 236.27 186.87 236.27 181.23V163.48C236.09 163.65 236.51 163.23 236.47 163.28H271.67H271.84V163.45C271.84 173.57 271.78 181.99 271.76 187.9C271.76 190.82 271.76 193.12 271.71 194.71C271.71 195.48 271.71 196.07 271.71 196.49C271.71 196.68 271.71 196.83 271.71 196.95C271.71 197.07 271.56 197.12 271.55 197.12Z" fill="black" />
                                        <path id="Vector_102" d="M213.78 79.05H154.9V136.02H213.78V79.05Z" fill="#FFE662" />
                                        <g id="Group_9" opacity="0.3">
                                            <path id="Vector_103" d="M159.46 131.14L175.75 101.83L189.07 120.56L197.17 110.61L209.21 131.14H159.46Z" fill="black" />
                                        </g>
                                        <g id="Group_10" opacity="0.3">
                                            <path id="Vector_104" d="M194.75 96.12C194.75 96.9586 194.501 97.7783 194.035 98.4756C193.57 99.1729 192.907 99.7163 192.133 100.037C191.358 100.358 190.505 100.442 189.683 100.279C188.86 100.115 188.105 99.7111 187.512 99.1181C186.919 98.5252 186.515 97.7697 186.351 96.9472C186.188 96.1247 186.272 95.2722 186.593 94.4974C186.914 93.7227 187.457 93.0605 188.154 92.5946C188.852 92.1287 189.671 91.88 190.51 91.88C191.067 91.8787 191.619 91.9874 192.134 92.2001C192.649 92.4127 193.117 92.7249 193.511 93.1189C193.905 93.5129 194.217 93.9808 194.43 94.4959C194.643 95.0109 194.751 95.5628 194.75 96.12Z" fill="black" />
                                        </g>
                                        <path id="Vector_105" opacity="0.3" d="M209.21 131.3C209.206 131.223 209.206 131.147 209.21 131.07C209.21 130.9 209.21 130.68 209.21 130.4C209.21 129.8 209.21 128.94 209.21 127.84C209.21 125.58 209.21 122.31 209.15 118.16C209.15 109.84 209.07 98 209.02 83.77L209.26 84.01H159.52L159.79 83.74V96.52C159.79 100.7 159.79 104.8 159.79 108.79C159.79 116.79 159.79 124.31 159.79 131.25L159.54 131.01L195.54 131.13L205.69 131.19H208.38H209.08H208.4H205.76L195.67 131.25L159.54 131.37H159.3V131.12C159.3 124.18 159.3 116.64 159.3 108.66V96.57C159.3 94.47 159.3 92.36 159.3 90.22V83.79C159.05 84.03 159.64 83.44 159.59 83.5H209.33H209.57V83.74C209.57 98.03 209.48 109.93 209.45 118.29C209.45 122.41 209.45 125.66 209.39 127.91C209.39 128.99 209.39 129.83 209.39 130.43C209.39 130.69 209.39 130.9 209.39 131.06C209.345 131.15 209.284 131.231 209.21 131.3Z" fill="black" />
                                    </g>
                                    <g className={websiteSvgVisible ? 'move-from-bottom' : ''} id="freepik--Floor--inject-10">
                                        <path id="Vector_106" d="M472.45 466.43C472.45 466.6 375.28 466.73 255.45 466.73C135.62 466.73 38.45 466.6 38.45 466.43C38.45 466.26 135.59 466.12 255.45 466.12C375.31 466.12 472.45 466.26 472.45 466.43Z" fill="#263238" />
                                    </g>
                                    <g className={websiteSvgVisible ? 'move-from-left' : ''} id="freepik--Character--inject-10">
                                        <path id="Vector_107" d="M259.07 457.72L256.52 466.21L274.68 466L275.49 456.91L259.07 457.72Z" fill="#FFE662" />
                                        <path id="Vector_108" d="M275 464.28C274.13 464.444 273.245 464.514 272.36 464.49C270.72 464.49 268.46 464.49 265.97 464.49L259.6 464.29C258.726 464.279 257.855 464.182 257 464C257.87 463.837 258.755 463.77 259.64 463.8C261.28 463.8 263.54 463.8 266.03 463.8L272.4 464C273.274 464.005 274.145 464.099 275 464.28Z" fill="#263238" />
                                        <path id="Vector_109" d="M267.25 456.57C267.458 457.837 267.482 459.127 267.32 460.4C267.347 461.685 267.179 462.966 266.82 464.2C266.606 462.934 266.583 461.643 266.75 460.37C266.722 459.085 266.89 457.804 267.25 456.57Z" fill="#263238" />
                                        <path id="Vector_110" opacity="0.6" d="M256.52 466.21L274.68 466L274.84 464.28L256.82 464.05L256.52 466.01" fill="white" />
                                        <path id="Vector_111" d="M329.35 460.13L298 297.7L297.82 297C293.01 277.9 289.21 273.21 289.21 273.21L242.27 274.49C238.58 281.11 238.12 297 238.12 297C237.61 298.9 259 458.14 259 458.14L275.09 456.82L269.61 307L311.61 460.52L329.35 460.13Z" fill="#263238" />
                                        <path id="Vector_112" d="M282 301.93C282 302.09 276.81 303.57 270.33 305.25C263.85 306.93 258.56 308.16 258.52 308.01C258.48 307.86 263.7 306.37 270.19 304.69C276.68 303.01 282 301.78 282 301.93Z" fill="#455A64" />
                                        <path id="Vector_113" d="M239.54 218.52L203.54 220.71L172.54 192.94L172.22 191.94C172.03 191.42 171.84 190.84 171.65 190.17C171.425 189.401 171.334 188.6 171.38 187.8C171.384 186.785 171.529 185.775 171.81 184.8C172.16 183.95 171.32 183.12 170.62 183.55C169.92 183.98 168.93 186.3 169.04 189.26C169.15 192.22 166.16 188.72 165.04 187.47C163.92 186.22 160.3 182.52 159.66 182.57C158.71 182.64 158.6 183.69 159.75 184.91C160.9 186.13 164.06 190.05 163.39 190.62C162.72 191.19 157.13 184.74 157.13 184.74C157.13 184.74 156.13 183.16 155.36 183.8C153.92 184.95 160.36 191.35 160.98 191.94C161.41 192.36 160.7 193.01 160.26 192.54C159.82 192.07 154.83 185.97 153.35 187.13C152.22 188.01 158.6 192.44 158.94 194.29C159.28 196.14 154.44 190.43 153.39 191.29C153 191.62 152.75 191.92 156 194.79C158.176 196.872 160.462 198.835 162.85 200.67L195.27 236.45L240.56 240.45L239.54 218.52Z" fill="#FFBE9D" />
                                        <path id="Vector_114" d="M351.44 160.65C350.18 160.09 347.11 166.93 346.93 165.05C346.75 163.17 351.65 157.15 350.31 156.62C348.57 155.92 345.48 163.14 345.17 163.73C344.86 164.32 344.02 163.88 344.32 163.36C344.76 162.61 349.16 154.68 347.46 153.98C346.52 153.59 346.02 155.37 346.02 155.37C346.02 155.37 342.43 163.12 341.64 162.76C340.85 162.4 342.79 157.76 343.55 156.26C344.31 154.76 343.92 153.79 342.99 153.98C342.36 154.12 339.9 158.68 339.18 160.19C338.46 161.7 336.54 165.88 335.83 163.01C335.12 160.14 333.52 158.19 332.73 158.01C331.94 157.83 331.36 158.82 331.93 159.54C332.46 160.385 332.877 161.296 333.17 162.25C333.434 163.008 333.566 163.807 333.56 164.61C333.56 165.3 333.56 165.91 333.51 166.46L333.46 167.46L311.35 202.76L276.18 210.62L282.44 233.29L323.73 215.68L345 172.29C346.782 169.866 348.434 167.349 349.95 164.75C352.22 161.09 351.9 160.86 351.44 160.65Z" fill="#FFBE9D" />
                                        <path id="Vector_115" d="M285 238.72L285.57 236.64C287.01 235.74 303.96 225.17 304.57 225.07C305.18 224.97 297 205.61 297 205.61L277.71 208.37C276.644 208.061 275.553 207.844 274.45 207.72L251.78 207.53C251.78 207.53 245.78 208.53 243.17 210.42L222.65 218.16L227.33 242L243.46 240.61C243.68 242.4 244.67 249.19 245.1 250.95C246.53 256.79 247.38 264.6 244.34 269.76C244.34 269.76 238.12 282.16 238.11 292.52L295.33 285.83C295.33 285.83 292.87 275.78 282.48 262.41L282.98 248.3L285 238.72Z" fill="#455A64" />
                                        <path id="Vector_116" d="M253 163.14C248.24 165.3 246.33 170.56 245.86 175.38C245.39 180.2 245.86 185.24 244.03 189.76C242.46 193.57 239.23 197.05 239.59 201.13C239.86 204.13 242.13 206.85 242.54 209.88C243.34 215.75 237.11 221 238.25 226.88C238.76 229.55 240.81 231.88 243.25 233.41C245.793 234.907 248.514 236.076 251.35 236.89C255.13 238.16 259.35 239.4 263.05 238.08C266.35 236.91 268.6 233.9 272.05 233.03C275.5 232.16 278.81 233.56 282.23 233.63C283.777 233.694 285.321 233.443 286.768 232.893C288.215 232.343 289.536 231.505 290.65 230.43C291.673 229.402 292.381 228.102 292.689 226.684C292.998 225.267 292.894 223.79 292.39 222.43C290.87 218.67 286.18 216.25 285.45 212.31C284.8 208.75 287.7 205.21 286.79 201.69C285.79 197.77 280.52 195.69 279.25 191.84C277.73 187.21 282.59 182.27 280.7 177.74C279.58 175.08 276.38 173.4 275.51 170.67C274.92 168.79 275.56 166.77 275.13 164.86C274.4 161.56 270.68 159.43 267.06 158.68C262.629 157.7 257.994 158.346 254 160.5C252.142 161.52 250.554 162.968 249.368 164.725C248.182 166.482 247.432 168.496 247.18 170.6" fill="#263238" />
                                        <path id="Vector_117" d="M260.09 159.79C262.268 158.954 264.603 158.605 266.93 158.767C269.258 158.929 271.522 159.598 273.563 160.727C275.605 161.856 277.375 163.417 278.75 165.303C280.124 167.188 281.07 169.351 281.52 171.64C282.25 175.32 281.71 179.29 283.31 182.64C285.04 186.33 289.12 188.86 289.73 192.88C290.34 196.9 287.43 200.3 286.83 204.19C286.2 208.19 288.1 212.32 287.64 216.39C287.412 218.421 286.601 220.343 285.306 221.924C284.011 223.505 282.286 224.678 280.34 225.302C278.393 225.925 276.308 225.973 274.335 225.438C272.362 224.904 270.586 223.811 269.22 222.29" fill="#263238" />
                                        <path id="Vector_118" d="M240.91 223.43C240.91 223.43 240.91 223.38 240.85 223.27C240.806 223.109 240.772 222.945 240.75 222.78C240.699 222.131 240.791 221.479 241.02 220.87C241.393 219.923 241.877 219.024 242.46 218.19C243.23 217.124 243.833 215.947 244.25 214.7C244.613 213.16 244.487 211.545 243.89 210.08C243.217 208.374 242.33 206.761 241.25 205.28C240.016 203.609 239.026 201.77 238.31 199.82C237.647 197.638 237.696 195.302 238.45 193.15C238.825 192.067 239.376 191.054 240.08 190.15C240.773 189.304 241.511 188.497 242.29 187.73C243.021 187.005 243.671 186.204 244.23 185.34C244.733 184.52 245.032 183.59 245.1 182.63C245.048 180.797 244.807 178.974 244.38 177.19C244.106 175.56 244.198 173.89 244.65 172.3C245.298 170.001 246.63 167.953 248.47 166.43C248.969 166.027 249.505 165.672 250.07 165.37C250.264 165.253 250.472 165.162 250.69 165.1C249.97 165.557 249.279 166.058 248.62 166.6C246.872 168.138 245.614 170.154 245 172.4C244.597 173.934 244.532 175.538 244.81 177.1C245.27 178.92 245.531 180.784 245.59 182.66C245.533 183.722 245.214 184.752 244.66 185.66C244.082 186.557 243.411 187.392 242.66 188.15C241.895 188.905 241.171 189.699 240.49 190.53C239.826 191.39 239.306 192.353 238.95 193.38C238.241 195.416 238.192 197.624 238.81 199.69C239.498 201.593 240.454 203.388 241.65 205.02C242.744 206.545 243.635 208.205 244.3 209.96C244.906 211.519 245.01 213.228 244.6 214.85C244.15 216.128 243.505 217.328 242.69 218.41C242.102 219.216 241.599 220.08 241.19 220.99C240.895 221.767 240.799 222.606 240.91 223.43Z" fill="#263238" />
                                        <path id="Vector_119" d="M283.61 232.78C283.61 232.78 283.84 232.54 284.24 232.05C284.795 231.327 285.175 230.485 285.35 229.59C285.633 228.175 285.483 226.708 284.92 225.38C284.583 224.557 284.063 223.822 283.4 223.23C282.643 222.581 281.741 222.125 280.77 221.9C279.657 221.647 278.572 221.286 277.53 220.82C276.939 220.53 276.448 220.071 276.118 219.501C275.789 218.931 275.636 218.277 275.68 217.62C275.888 216.266 276.514 215.011 277.47 214.03C278.39 213.03 279.47 212.15 280.34 211.03C280.823 210.541 281.173 209.938 281.359 209.277C281.544 208.616 281.558 207.918 281.4 207.25C281 205.91 279.7 205.02 278.4 204.25C276.963 203.559 275.619 202.688 274.4 201.66C273.769 201.073 273.321 200.316 273.11 199.48C272.92 198.641 272.92 197.769 273.11 196.93C273.48 195.28 274.22 193.81 274.63 192.31C274.887 191.611 274.968 190.86 274.867 190.123C274.766 189.385 274.485 188.684 274.05 188.08C272.12 185.82 268.67 185.46 266.77 183.08C265.89 181.949 265.3 180.621 265.05 179.21C264.802 177.892 264.708 176.55 264.77 175.21C264.87 172.66 265.21 170.34 265.07 168.21C265.071 166.301 264.434 164.446 263.26 162.94C262.317 161.851 261.041 161.102 259.63 160.81C258.739 160.623 257.811 160.735 256.99 161.13C256.43 161.41 256.2 161.67 256.17 161.64C256.22 161.571 256.281 161.51 256.35 161.46C256.523 161.291 256.718 161.147 256.93 161.03C257.76 160.568 258.727 160.413 259.66 160.59C261.143 160.848 262.496 161.598 263.5 162.72C264.752 164.269 265.456 166.189 265.5 168.18C265.542 170.516 265.465 172.852 265.27 175.18C265.222 176.471 265.323 177.762 265.57 179.03C265.804 180.356 266.364 181.604 267.2 182.66C268.166 183.703 269.346 184.526 270.66 185.07C272.108 185.66 273.418 186.541 274.51 187.66C275.034 188.315 275.36 189.106 275.45 189.94C275.521 190.768 275.44 191.602 275.21 192.4C274.77 193.97 274.04 195.4 273.7 196.99C273.481 197.724 273.469 198.505 273.665 199.246C273.861 199.987 274.257 200.66 274.81 201.19C275.995 202.188 277.302 203.032 278.7 203.7C279.389 204.078 280.039 204.524 280.64 205.03C281.253 205.563 281.707 206.255 281.95 207.03C282.2 207.79 282.2 208.61 281.95 209.37C281.685 210.076 281.303 210.732 280.82 211.31C279.92 212.45 278.82 213.31 277.92 214.31C277.024 215.201 276.433 216.353 276.23 217.6C276.187 218.168 276.315 218.736 276.599 219.23C276.882 219.724 277.308 220.121 277.82 220.37C278.828 220.835 279.88 221.197 280.96 221.45C281.982 221.708 282.928 222.205 283.72 222.9C284.413 223.536 284.95 224.323 285.29 225.2C285.852 226.59 285.974 228.119 285.64 229.58C285.438 230.499 285.012 231.355 284.4 232.07C284.166 232.338 283.901 232.576 283.61 232.78Z" fill="#455A64" />
                                        <path id="Vector_120" d="M251.85 236C251.709 235.758 251.592 235.504 251.5 235.24C251.28 234.73 250.98 233.98 250.63 233C250.22 231.806 249.886 230.586 249.63 229.35C249.244 227.713 249.112 226.027 249.24 224.35C249.426 222.271 250.25 220.301 251.6 218.71C252.347 217.879 253.035 216.996 253.66 216.07C254.264 215.084 254.573 213.946 254.55 212.79C254.48 210.39 253.31 208.03 252.01 205.73C250.71 203.43 249.29 200.86 249.13 197.91C249.026 196.428 249.467 194.959 250.37 193.78C251.327 192.785 252.394 191.903 253.55 191.15C254.565 190.399 255.258 189.291 255.49 188.05C255.691 186.839 255.64 185.6 255.34 184.41C254.84 182.03 253.92 179.86 253.5 177.67C252.579 172.684 253.602 167.535 256.36 163.28C256.795 162.608 257.28 161.969 257.81 161.37C257.989 161.153 258.186 160.952 258.4 160.77C258.4 160.77 257.64 161.64 256.55 163.4C255.028 165.897 254.066 168.695 253.73 171.6C253.504 173.601 253.584 175.624 253.97 177.6C254.39 179.72 255.32 181.88 255.86 184.32C256.178 185.578 256.236 186.888 256.03 188.17C255.772 189.539 255.017 190.765 253.91 191.61C252.793 192.345 251.757 193.197 250.82 194.15C250 195.221 249.602 196.555 249.7 197.9C249.85 200.68 251.17 203.18 252.5 205.47C253.83 207.76 255.02 210.22 255.08 212.8C255.089 214.054 254.742 215.285 254.08 216.35C253.432 217.291 252.72 218.186 251.95 219.03C250.637 220.539 249.826 222.419 249.63 224.41C249.47 226.058 249.568 227.722 249.92 229.34C250.188 230.574 250.522 231.792 250.92 232.99C251.24 233.93 251.49 234.69 251.68 235.26C251.757 235.502 251.814 235.749 251.85 236Z" fill="#455A64" />
                                        <path id="Vector_121" d="M330.36 461.74L330.29 459.89L311.53 460.43L311.7 466.53H312.86C318.02 466.66 339.1 466.84 342.52 465.78C346.33 464.63 330.36 461.74 330.36 461.74Z" fill="#FFE662" />
                                        <g id="Group_11" opacity="0.6">
                                            <path id="Vector_122" d="M318.46 466.22C318.12 464.733 317.226 463.431 315.96 462.58C314.675 461.69 313.116 461.283 311.56 461.43L311.71 466.29L318.46 466.22Z" fill="white" />
                                        </g>
                                        <g id="Group_12" opacity="0.6">
                                            <path id="Vector_123" d="M338.17 463.41C338.17 463.41 343.78 464.75 343.11 465.62C342.44 466.49 321.11 467.05 311.7 466.53V466.15L336.58 465.69C336.58 465.69 337.08 463.48 338.17 463.41Z" fill="white" />
                                        </g>
                                        <path id="Vector_124" d="M311.42 466.14H311.74H312.67L316.06 466.19C318.93 466.19 322.9 466.19 327.27 466.08C331.64 465.97 335.61 465.78 338.48 465.62L341.87 465.4L342.79 465.32H343.11H342.78H341.86L338.47 465.48C335.6 465.61 331.64 465.77 327.27 465.88C322.9 465.99 318.93 466.03 316.06 466.05H312.67H311.74L311.42 466.14Z" fill="#263238" />
                                        <path id="Vector_125" d="M336.59 466C336.802 464.901 337.411 463.919 338.3 463.24C337.736 463.441 337.266 463.844 336.98 464.37C336.811 464.603 336.689 464.866 336.622 465.146C336.555 465.426 336.544 465.716 336.59 466Z" fill="#263238" />
                                        <path id="Vector_126" d="M331 463.5C331.05 463.5 331.31 463.23 331.57 462.82C331.83 462.41 332 462.06 331.94 462.03C331.88 462 331.64 462.31 331.38 462.72C331.12 463.13 331 463.47 331 463.5Z" fill="#263238" />
                                        <path id="Vector_127" d="M329.47 462.8C329.47 462.8 329.8 462.65 330.11 462.38C330.42 462.11 330.64 461.84 330.6 461.8C330.56 461.76 330.27 461.95 329.96 462.22C329.65 462.49 329.42 462.76 329.47 462.8Z" fill="#263238" />
                                        <path id="Vector_128" d="M328.46 461.19C328.783 461.293 329.124 461.324 329.46 461.28C329.798 461.314 330.139 461.273 330.46 461.16C330.137 461.057 329.796 461.026 329.46 461.07C329.122 461.038 328.781 461.079 328.46 461.19Z" fill="#263238" />
                                        <path id="Vector_129" d="M328.1 460C328.444 460.161 328.816 460.253 329.195 460.27C329.574 460.287 329.953 460.229 330.31 460.1C329.941 460.063 329.569 460.063 329.2 460.1C328.837 460.032 328.469 459.999 328.1 460Z" fill="#263238" />
                                        <path id="Vector_130" d="M331.59 462C331.987 462.073 332.393 462.073 332.79 462C333.221 461.94 333.646 461.843 334.06 461.71C334.31 461.637 334.552 461.536 334.78 461.41C334.919 461.336 335.023 461.21 335.07 461.06C335.084 460.974 335.073 460.885 335.037 460.805C335.001 460.725 334.943 460.657 334.87 460.61C334.409 460.411 333.895 460.37 333.407 460.491C332.92 460.612 332.485 460.889 332.17 461.28C331.99 461.502 331.863 461.762 331.8 462.04C331.8 462.23 331.8 462.34 331.8 462.34C331.909 461.977 332.085 461.637 332.32 461.34C332.584 461.031 332.931 460.805 333.32 460.69C333.78 460.514 334.29 460.514 334.75 460.69C334.95 460.82 334.88 461.03 334.67 461.15C334.46 461.269 334.239 461.366 334.01 461.44C333.607 461.576 333.197 461.686 332.78 461.77C332 461.93 331.59 461.94 331.59 462Z" fill="#263238" />
                                        <path id="Vector_131" d="M331.9 462C331.972 461.885 332.02 461.756 332.04 461.622C332.061 461.488 332.054 461.351 332.02 461.22C331.967 460.928 331.844 460.653 331.66 460.42C331.551 460.253 331.403 460.116 331.229 460.02C331.054 459.924 330.859 459.872 330.66 459.87C330.601 459.881 330.545 459.903 330.496 459.936C330.446 459.968 330.403 460.01 330.369 460.06C330.336 460.109 330.312 460.165 330.3 460.223C330.289 460.281 330.288 460.342 330.3 460.4C330.336 460.578 330.411 460.745 330.52 460.89C330.686 461.136 330.884 461.358 331.11 461.55C331.309 461.745 331.548 461.896 331.81 461.99C331.81 461.99 331.56 461.79 331.22 461.45C331.025 461.248 330.851 461.027 330.7 460.79C330.53 460.56 330.4 460.14 330.7 460.08C330.859 460.094 331.013 460.141 331.153 460.219C331.292 460.297 331.414 460.402 331.51 460.53C331.681 460.741 331.804 460.987 331.87 461.25C331.903 461.499 331.913 461.75 331.9 462Z" fill="#263238" />
                                        <path id="Vector_132" d="M311.66 461.38C311.66 461.38 312.19 461.32 313.04 461.38C314.116 461.475 315.15 461.847 316.04 462.46C316.921 463.063 317.614 463.901 318.04 464.88C318.192 465.283 318.322 465.693 318.43 466.11C318.451 465.994 318.451 465.876 318.43 465.76C318.389 465.442 318.311 465.13 318.2 464.83C317.812 463.797 317.113 462.91 316.2 462.29C315.265 461.644 314.166 461.276 313.03 461.23C312.696 461.223 312.362 461.239 312.03 461.28C311.902 461.291 311.776 461.325 311.66 461.38Z" fill="#263238" />
                                        <path id="Vector_133" d="M320.76 464.46C321.659 464.634 322.576 464.694 323.49 464.64C324.407 464.659 325.324 464.568 326.22 464.37C326.22 464.31 324.99 464.37 323.49 464.43C321.99 464.49 320.77 464.4 320.76 464.46Z" fill="#263238" />
                                        <path id="Vector_134" d="M317.1 464.55C317.1 464.6 317.21 464.79 317.34 465.05C317.47 465.31 317.55 465.53 317.61 465.53C317.67 465.53 317.7 465.25 317.54 464.95C317.38 464.65 317.14 464.51 317.1 464.55Z" fill="#263238" />
                                        <path id="Vector_135" d="M315.67 463C315.67 463.05 315.76 463.22 315.95 463.4C316.14 463.58 316.35 463.69 316.39 463.64C316.43 463.59 316.31 463.42 316.11 463.25C315.91 463.08 315.72 463 315.67 463Z" fill="#263238" />
                                        <path id="Vector_136" d="M313.68 462.32C313.68 462.37 313.94 462.37 314.22 462.45C314.5 462.53 314.7 462.66 314.74 462.62C314.78 462.58 314.63 462.34 314.28 462.25C313.93 462.16 313.66 462.26 313.68 462.32Z" fill="#263238" />
                                        <path id="Vector_137" d="M312.26 462C312.26 462.05 312.35 462.14 312.51 462.19C312.67 462.24 312.81 462.24 312.83 462.19C312.85 462.14 312.74 462.05 312.58 461.99C312.42 461.93 312.28 462 312.26 462Z" fill="#263238" />
                                    </g>
                                    <g className={websiteSvgVisible ? 'move-from-bottom' : ''} id="freepik--Plant--inject-10">
                                        <path id="Vector_138" d="M411.84 442.1C414.697 440.761 417.908 440.376 421 441C422.687 441.146 424.277 441.85 425.52 443C426.65 444.25 426.87 446.44 425.57 447.51C424.734 448.079 423.726 448.337 422.72 448.24C420.3 448.24 417.62 447.78 415.72 449.24C414.62 450.07 413.89 451.45 412.57 451.86C411.91 452.014 411.217 451.947 410.598 451.671C409.979 451.395 409.467 450.924 409.14 450.33C408.513 449.118 408.373 447.712 408.75 446.4C408.902 445.495 409.259 444.636 409.795 443.891C410.331 443.145 411.03 442.533 411.84 442.1Z" fill="#FFE662" />
                                        <path id="Vector_139" opacity="0.2" d="M411.84 442.1C414.697 440.761 417.908 440.376 421 441C422.687 441.146 424.277 441.85 425.52 443C426.65 444.25 426.87 446.44 425.57 447.51C424.734 448.079 423.726 448.337 422.72 448.24C420.3 448.24 417.62 447.78 415.72 449.24C414.62 450.07 413.89 451.45 412.57 451.86C411.91 452.014 411.217 451.947 410.598 451.671C409.979 451.395 409.467 450.924 409.14 450.33C408.513 449.118 408.373 447.712 408.75 446.4C408.902 445.495 409.259 444.636 409.795 443.891C410.331 443.145 411.03 442.533 411.84 442.1Z" fill="white" />
                                        <path id="Vector_140" d="M405.46 429.78C407.17 432.22 410.46 431.41 412.01 429.93C413.56 428.45 414.19 426.29 414.78 424.24C416.13 419.56 417.49 414.64 416.49 409.87C416.247 408.423 415.61 407.07 414.65 405.96C414.165 405.413 413.545 405.003 412.852 404.772C412.158 404.54 411.416 404.495 410.7 404.64C409.03 405.08 407.99 406.72 407.24 408.27C405.03 412.867 403.875 417.899 403.86 423C403.7 425.376 404.258 427.745 405.46 429.8" fill="#FFE662" />
                                        <path id="Vector_141" opacity="0.3" d="M405.46 429.78C407.17 432.22 410.46 431.41 412.01 429.93C413.56 428.45 414.19 426.29 414.78 424.24C416.13 419.56 417.49 414.64 416.49 409.87C416.247 408.423 415.61 407.07 414.65 405.96C414.165 405.413 413.545 405.003 412.852 404.772C412.158 404.54 411.416 404.495 410.7 404.64C409.03 405.08 407.99 406.72 407.24 408.27C405.03 412.867 403.875 417.899 403.86 423C403.7 425.376 404.258 427.745 405.46 429.8" fill="black" />
                                        <path id="Vector_142" d="M400.79 433.27C401.664 432.128 402.247 430.789 402.487 429.371C402.728 427.952 402.619 426.497 402.17 425.13C401.236 422.396 399.564 419.974 397.34 418.13C394.821 415.886 391.89 414.154 388.71 413.03C387.478 412.539 386.155 412.314 384.83 412.37C384.164 412.411 383.519 412.614 382.95 412.963C382.382 413.312 381.908 413.795 381.57 414.37C380.66 416.1 381.57 418.2 382.47 419.92C384.131 422.941 386.027 425.826 388.14 428.55C389.84 430.74 391.79 432.9 394.38 433.89C396.97 434.88 399.66 434.77 401.04 432.97" fill="#FFE662" />
                                        <path id="Vector_143" d="M405.35 466.46C405.435 466.096 405.486 465.724 405.5 465.35L405.8 462.35C405.948 460.866 406.171 459.391 406.47 457.93C406.868 456.15 407.407 454.405 408.08 452.71C408.739 451.014 409.638 449.421 410.75 447.98C411.653 446.809 412.804 445.853 414.12 445.18C415.011 444.74 415.966 444.443 416.95 444.3C417.321 444.287 417.69 444.233 418.05 444.14C417.678 444.099 417.302 444.099 416.93 444.14C415.892 444.215 414.876 444.476 413.93 444.91C412.545 445.569 411.331 446.537 410.38 447.74C409.225 449.2 408.295 450.825 407.62 452.56C406.934 454.277 406.399 456.05 406.02 457.86C405.735 459.34 405.538 460.836 405.43 462.34C405.34 463.62 405.3 464.65 405.28 465.34C405.265 465.715 405.289 466.09 405.35 466.46Z" fill="#263238" />
                                        <path id="Vector_144" d="M405.56 464.14C405.573 463.967 405.573 463.793 405.56 463.62C405.56 463.24 405.56 462.75 405.56 462.16C405.56 460.89 405.56 459.05 405.63 456.77C405.74 452.23 406.13 447.33 406.89 440.43C407.6 433.95 408.56 426.43 409.58 421.49C409.8 420.38 410.01 419.37 410.22 418.49C410.43 417.61 410.59 416.85 410.75 416.23C410.91 415.61 411 415.18 411.09 414.81C411.135 414.643 411.165 414.472 411.18 414.3C411.1 414.452 411.039 414.613 411 414.78L410.58 416.19C410.39 416.8 410.19 417.55 409.97 418.43C409.75 419.31 409.5 420.31 409.26 421.43C408.016 427.233 407.078 433.098 406.45 439C405.7 445.91 405.35 452.21 405.32 456.77C405.32 459.05 405.32 460.89 405.4 462.16C405.4 462.76 405.47 463.24 405.49 463.63C405.491 463.802 405.515 463.974 405.56 464.14Z" fill="#263238" />
                                        <path id="Vector_145" d="M405.59 452C405.625 451.491 405.625 450.979 405.59 450.47C405.53 449.47 405.39 448.06 405.12 446.32C404.779 444.281 404.328 442.261 403.77 440.27C403.108 437.826 402.263 435.436 401.24 433.12C399.485 428.85 396.972 424.933 393.82 421.56C393.271 420.984 392.686 420.443 392.07 419.94C391.8 419.71 391.57 419.49 391.33 419.31L390.65 418.84C390.242 418.534 389.81 418.26 389.36 418.02C390.845 419.186 392.254 420.446 393.58 421.79C396.633 425.185 399.081 429.078 400.82 433.3C401.825 435.604 402.674 437.972 403.36 440.39C403.945 442.363 404.425 444.366 404.8 446.39C405.12 448.12 405.3 449.53 405.41 450.5C405.431 451.004 405.491 451.505 405.59 452Z" fill="#263238" />
                                    </g>
                                </g>
                            </svg>


                            <div>
                                <h1>DONE WITH OLD DESIGN ?</h1>

                                <p>We will make you a new design ,
                                    with custom changments  ,colors , images ,
                                    that will fit your needs</p>
                            </div>
                        </div>

                    </section>



                    <section className="app__categories" id='categories'>
                        <div className="app__categories__content">
                            <div className="app__categories__title"><h2>WebIna Categories</h2></div>
                        </div>


                        <div className="app__categories__cards">
                            <div className="app__categories__cards__sep">
                                <div data-aos="fade-right" className="app__categories__card">
                                    <div className="app__categories__card__content">
                                        <div className="app__categories__card__content__image">
                                            <img className="app__categories__card__content" src="./Images/e-commerce.jpg" alt="e-commerce" />
                                            <div className="app__categories__card__content__title">E-Commerce Website</div>
                                            <div className="app__categories__card__content__description">Make an e-ceommerce website for your produts to make it easier for customers</div>

                                        </div>
                                    </div>
                                </div>
                                <div data-aos="fade-right" className="app__categories__card">
                                    <div className="app__categories__card__content">
                                        <div className="app__categories__card__content__image">
                                            <img className="app__categories__card__content" src="./Images/landing.jpg" alt="landing-page" />
                                            <div className="app__categories__card__content__title">Landing Page</div>
                                            <div className="app__categories__card__content__description">Make single web page that appears marketing promotion, marketing email or an online advertisement.</div>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="fade-right" className="app__categories__card">
                                    <div className="app__categories__card__content">
                                        <div className="app__categories__card__content__image">
                                            <img className="app__categories__card__content" src="./Images/blog.jpg" alt="blog" />
                                            <div className="app__categories__card__content__title">Blog/News Page</div>
                                            <div className="app__categories__card__content__description">Make single web page that appears marketing promotion, marketing email or an online advertisement.</div>
                                        </div>
                                    </div>
                                </div>

                                <div data-aos="fade-right" className="app__categories__card">
                                    <div className="app__categories__card__content">
                                        <div className="app__categories__card__content__image">
                                            <img className="app__categories__card__content" src="./Images/portfolio.jpg" alt="portfolio" />
                                            <div className="app__categories__card__content__title">Portfolio Website</div>
                                            <div className="app__categories__card__content__description">Make single web page that appears marketing promotion, marketing email or an online advertisement.</div>
                                        </div>
                                    </div>
                                </div>


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
                            <div data-aos="fade-down" className="app__skills__card">
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


                            <div data-aos="fade-down" data-aos-duration="300" className="app__skills__card">
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


                            <div data-aos="fade-down" data-aos-duration="600" className="app__skills__card">
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
                        <h2>People Feedbacks</h2>
                        <div data-aos="zoom-in" className='app__testimonials__container'>
                            {testimonials.length > 0 ?
                                <Swiper
                                    // loop={true}
                                    navigation={true} modules={[Navigation, Pagination]} className="testimonials">
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
                                <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <h3>Leave Us A FeedBack</h3>
                                </div>
                            }
                        </div>
                    </section>


                    <section className="app__contact" id='contact'>
                        <div className="app__contact__content">
                            <div className="app__contact__title" data-aos="fade-down"><h2>Conatct WebIna</h2></div>
                        </div>

                        <div className="app__contact__content__form__image">
                            <div data-aos="fade-right" className="app__contact__image">
                                <img src={ImageContact} alt="contact" style={{ width: '700px' }} />
                            </div>


                            {!emailSent ?
                                <div className="app__contact__form">
                                    <form onSubmit={submitForm}>
                                        <input data-aos="fade-left" type="text" name="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                                        <input data-aos="fade-left" data-aos-duration="200" type="email" name="email" placeholder="Email" onChange={(e) => setEmailInput(e.target.value)} />
                                        <textarea data-aos="fade-left" data-aos-duration="300" placeholder="Message" name="message" onChange={(e) => setMessage(e.target.value)} ></textarea>

                                        <label data-aos="fade-left" data-aos-duration="500" className="b-contain">
                                            <span>I Accept Receiving Marketing Emails</span>
                                            <input type="checkbox" name='accept_mails' onChange={(e) => setAcceptEmail(e.checked)} />
                                            <div className="b-input"></div>
                                        </label>

                                        <button type="submit">SEND MESSAGE</button>
                                        <a href='/chat'>LIVE CHAT</a>
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

                </div>

            </div >
    )
}

export default Home