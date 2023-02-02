import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import Swal from 'sweetalert2'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AuthUser from '../../AuthUser'

import Navbar from './Navbar'
import Loading from '../../../Assets/Images/WEBINA2.png';

import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";

import Footer from './Footer'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Websites = () => {
    const navigate = useNavigate();
    const [websites, setWebsites] = useState([]);
    const [recentWebsites, setRecentWebsites] = useState([]);

    const { http } = AuthUser();
    const [loading, setLoading] = useState(true);


    const [userData, setUserData] = useState({});


    useEffect(() => {

        getWebsites();


    }, [])


    const getWebsites = async () => {
        try {
            await http.get('/websites')
                .then(res => {
                    if (res.status === 200) {
                        setWebsites(res.data.websites);
                    } else {
                        Swal.fire({
                            title: 'Oops...',
                            text: res.data.message,
                            icon: 'error'
                        })
                    }
                })
            await http.post('/recent/websites')
                .then(res => {
                    setRecentWebsites(res.data.websites);
                })

            if (cookie.get('user')) {
                setUserData(JSON.parse(cookie.get('user')));
            }
            setLoading(false);


            if (!cookie.get('token')) {
                Swal.fire({
                    title: 'Your are not logged in',
                    text: 'Please login in order continue',
                    icon: 'info',
                    confirmButtonText: 'Login',
                    confirmButtonColor: 'rgb(var(--heavy-color))'
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        navigate('/signin');
                        cookie.remove('token');
                    }
                });
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        loading ?
            <div className='loading-container'>
                < img src={Loading} alt="loading-web" />
            </div >
            :
            <Fragment>

                <header>
                    <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                        <Navbar userData={userData} />
                    </div>

                    <div className='app__header__websites_container'>
                        <div className='app__header__websites_sec__container'>
                            <div className='app__header__websites_container__right'>
                                <h2>Choose</h2>
                                <h2>Your</h2>
                                <h2>Website</h2>
                            </div>

                            <div className='app__header__websites_container__left'>
                                <div className='app__websites__header__right'></div>
                                <div className='app__websites__header__right__bottom'></div>
                            </div>
                        </div>
                    </div>

                </header>


                <section className='app__websites__container'>

                    <h2>Recently Added</h2>

                    <div className="swiper-button image-swiper-button-next">
                        <BsFillArrowRightCircleFill />
                    </div>
                    <div className="swiper-button image-swiper-button-prev">
                        <BsFillArrowLeftCircleFill />
                    </div>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        slidesPerGroup={3}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={{
                            nextEl: ".image-swiper-button-next",
                            prevEl: ".image-swiper-button-prev",
                            disabledClass: "swiper-button-disabled"
                        }}
                        modules={[Pagination, Navigation]}
                        className="swipper-category"
                    >
                        {recentWebsites.map((website, index) => (
                            website.status === 'available' ?
                                <SwiperSlide key={index + website.token + '1'}>
                                    <div>
                                        <img src={website.image} alt={website.name} />
                                        <div className='app__swipper__website__details'>
                                            <div>
                                                <div className='main__details'>
                                                    <h3 title='website name'>{website.website_name}</h3>
                                                    <h4 title='price'>{website.price}$ {website.old_price ? <sub><del>{website.old_price}</del></sub> : ''}</h4>
                                                </div>
                                                <p title='description'>{website.description}</p>
                                                <h4 className='app__website__category' title='category'>{website.category}</h4>
                                                <h4 className='app__website__dev_time'>{website.developing_Time}</h4>
                                            </div>
                                        </div>

                                        <div className='app__website__buttons'>
                                            <a className='app__website__buttons__show' href={`/website/${website.token}`} >SHOW</a>
                                            <a className='app__website__buttons__buy' href={`/website/purchace/${website.token}`} >PURCHASE</a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                :
                                <SwiperSlide key={index + website.token + '2'}>

                                    <div style={{ filter: 'brightness(60%)', opacity: '.5' }} title="Not Availale">
                                        <img src={website.image} alt={website.name} />
                                        <div className='app__swipper__website__details'>
                                            <div>
                                                <div className='main__details'>
                                                    <h3 title='website name'>{website.website_name}</h3>
                                                    <h4 title='price'>{website.price}$ {website.old_price ? <sub><del>{website.old_price}</del></sub> : ''}</h4>
                                                </div>
                                                <p title='description'>{website.description}</p>
                                                <h4 className='app__website__category' title='category'>{website.category}</h4>
                                                <h4 className='app__website__dev_time'>{website.developing_Time}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>


                        ))}
                    </Swiper>

                </section>



                <section className='app__websites__all'>
                    <h2>WebIna Websites</h2>




                    {websites.map((website, index) => (
                        website.status === 'available' ?
                            <div className='app__card__website' key={index + website.token + '1'}>
                                <img src={website.image} alt={website.name} />
                                <div className='app__swipper__website__details'>
                                    <div>
                                        <div className='main__details'>
                                            <h3 title='website name'>{website.website_name}</h3>
                                            <h4 title='price'>{website.price}$ {website.old_price ? <sub><del>{website.old_price}</del></sub> : ''}</h4>
                                        </div>
                                        <p title='description'>{website.description}</p>
                                        <h4 className='app__website__category' title='category'>{website.category}</h4>
                                        <h4 className='app__website__dev_time'>{website.developing_Time}</h4>
                                    </div>
                                </div>

                                <div className='app__website__buttons'>
                                    <a className='app__website__buttons__show' href={`/website/${website.token}`} >SHOW</a>
                                    <a className='app__website__buttons__buy' href={`/website/purchace/${website.token}`} >PURCHASE</a>
                                </div>
                            </div>
                            :

                            <div className='app__card__website' key={index + website.token + '2'} style={{ filter: 'brightness(60%)', opacity: '.5' }} title="Not Availale">
                                <img src={website.image} alt={website.name} />
                                <div className='app__swipper__website__details'>
                                    <div>
                                        <div className='main__details'>
                                            <h3 title='website name'>{website.website_name}</h3>
                                            <h4 title='price'>{website.price}$ {website.old_price ? <sub><del>{website.old_price}</del></sub> : ''}</h4>
                                        </div>
                                        <p title='description'>{website.description}</p>
                                        <h4 className='app__website__category' title='category'>{website.category}</h4>
                                        <h4 className='app__website__dev_time'>{website.developing_Time}</h4>
                                    </div>
                                </div>
                            </div>

                    ))}


                </section>

                <Footer />
            </Fragment >
    )
}

export default Websites

