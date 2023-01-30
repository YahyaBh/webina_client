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

import Navbar from './Navbar'



const Websites = () => {

    const [websites, setWebsites] = useState(['name' , 'webssrtaasd'])


    useEffect(() => {
        axios.get('http://localhost:8000/api/websites')
            .then(res => {
                if (res.status === 200) {
                    setWebsites(res.data.websites);
                } else {
                    Swal.fire({
                        'title': 'Something went wrong!',
                        'icon': 'error',
                    })
                }
            })


    }, [])

    return (
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

                <SwiperCategories websites={!websites} />



            </section>





        </Fragment>
    )
}

export default Websites


function SwiperCategories(websites) {
    return (
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
            {websites ? websites.map((website, index) => (
            <SwiperSlide key={index + websites.token}>{website.website_name}</SwiperSlide>
            )) : ''}
        </Swiper>
    )
}