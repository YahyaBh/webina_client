import axios from 'axios'
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



const Websites = () => {

    const [websites, setWebsites] = useState(['name', 'webssrtaasd'])
    const { http } = AuthUser();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        http.get('/websites')
            .then(res => {
                setLoading(false);
                setWebsites(res.data.websites);
            })


    }, [])

    return (
        loading ?
            <div className='loading-container'>
                < img src={Loading} alt="loading-web" />
            </div >
            :
            <Fragment>

                <header>
                    <div style={{ backgroundColor: '#000' }}>
                        <Navbar />
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


                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        slidesPerGroup={3}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className="swipper-category"
                    >
                        {websites.map((website, index) => (
                            website.status === 'available' ?
                                <SwiperSlide key={index + website.token + '1'}>
                                    <div>
                                        <img src={website.image} alt={website.name} />
                                        <div className='app__swipper__website__details'>
                                            <div>
                                                <div className='main__details'>
                                                    <h3>{website.website_name}</h3>
                                                    <h4>{website.price}$ {website.old_price ? <sub><del>{website.old_price}</del></sub> : ''}</h4>
                                                </div>
                                                <p>{website.description}</p>
                                                <h4>{website.category}</h4>
                                                <h4>{website.developing_Time}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                :
                                <SwiperSlide key={index + website.token + '2'}>

                                    <div style={{ filter: 'brightness(30%)', opacity: '.5' }}>
                                        <img src={website.image} alt={website.name} />
                                        <h3>{website.website_name}</h3>
                                        <p>{website.description}</p>
                                        <h4>{website.price}$</h4>
                                        <h4>{website.category}</h4>
                                        <h4>{website.developing_Time}</h4>
                                    </div>
                                </SwiperSlide>


                        ))}
                    </Swiper>

                </section>





            </Fragment >
    )
}

export default Websites

