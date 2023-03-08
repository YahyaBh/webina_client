import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Fragment } from 'react'
import Swal from 'sweetalert2'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper";



import AuthUser from '../../context/AuthUser'

import Navbar from './Navbar'
import Loading from '../../../Assets/Images/WEBINA2.png';

import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

const Websites = () => {
    const navigate = useNavigate();
    const [websites, setWebsites] = useState([]);
    const [recentWebsites, setRecentWebsites] = useState([]);

    const [categoriesWebsites, setCategoriesWebsites] = useState(['All']);
    const [filterWebsites, setFilterWebsites] = useState([]);
    const [activeFilter, setActiveFilter] = useState('All');
    const { http, getUser } = AuthUser();
    const [loading, setLoading] = useState(true);


    const [userData, setUserData] = useState({});


    useEffect(() => {
        getWebsites();


        handleWorkFilter('All');
    }, []);


    const handleWorkFilter = async (e) => {
        setActiveFilter(e);

        if (e === 'All') {
            setFilterWebsites(websites);

        } else {
            setFilterWebsites(websites.filter((website) => website.category.includes(e)));
        }
    }



    const getWebsites = async () => {
        try {
            await http.get('/api/websites')
                .then(res => {
                    if (res.status === 200) {
                        setWebsites(res.data.websites);

                        for (let i = 0; i < res.data.websites.length; i++) {
                            setCategoriesWebsites(categoriesWebsites => [...categoriesWebsites, res.data.websites[i].category]);
                        }

                    } else {
                        Swal.fire({
                            title: 'Oops...',
                            text: res.data.message,
                            icon: 'error'
                        })
                    }
                })
            await http.post('/api/recent/websites')
                .then(res => {
                    setRecentWebsites(res.data.websites);
                })

            if (getUser) {
                setUserData(getUser);
            }
            setLoading(false);


            if (!getUser) {
                Swal.fire({
                    title: 'Your are not logged in',
                    text: 'Please login in order continue',
                    icon: 'info',
                    confirmButtonText: 'Login',
                    confirmButtonColor: 'rgb(var(--heavy-color))'
                }).then(function (isConfirm) {
                    if (isConfirm) {
                        navigate('/signin');
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
                                <h2>Choose Your Website</h2>
                            </div>

                            <div className='app__header__websites_container__left'>
                            </div>
                        </div>
                    </div>

                </header>


                <section className='app__websites__container'>

                    <h2 className='title-for-section-app-websites'>Recently Added</h2>


                    {/* <div className="swiper-button image-swiper-button-next">
                        <BsFillArrowRightCircleFill />
                    </div>
                    <div className="swiper-button image-swiper-button-prev">
                        <BsFillArrowLeftCircleFill />
                    </div> */}
                    <Swiper

                        pagination={{
                            clickable: true,
                        }}

                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="swipper-category"
                    >

                    </Swiper>


                    <Swiper
                        slidesPerView={3}
                        slidesPerGroup={1}
                        spaceBetween={30}
                        loop={true}
                        loopFillGroupWithBlank={true}
                        navigation={{
                            nextEl: ".image-swiper-button-next",
                            prevEl: ".image-swiper-button-prev",
                            disabledClass: "swiper-button-disabled"
                        }}
                        centeredSlides={true}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                        }}
                        // pagination={{
                        //     null
                        // }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        {recentWebsites.map((website, index) => (
                            website.status === 'available' ?
                                <SwiperSlide key={index + website.token + '1'}>
                                    <a href={`/website/${website.token}`} key={index + website.token + '1'}>
                                        <img src={website.image} alt={website.name} />
                                        <div className='app__swipper__website__details'>
                                            <div>
                                                <div className='main__details'>
                                                    <h3 title='website name'>{website.website_name}</h3>
                                                    <h4 title='price'><span>{website.price}</span>{website.price}$ {website.old_price ? <sub><del>{website.old_price}</del></sub> : ''}</h4>
                                                </div>
                                                <p title='description'>
                                                    {website && website?.description ? website.description.length >= 28 ?
                                                        `${website.description.substring(0, 28)}...` : website.description
                                                        : ''}
                                                </p>
                                                <h4 className='starts-feed'><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiOutlineStar /></h4>
                                                <h4 className='app__website__category' title='category'>{website.category}</h4>

                                                {/* <h4 className='app__website__dev_time'>{website.developing_Time}</h4> */}
                                            </div>
                                        </div>

                                        {/* <div className='app__website__buttons'>
                                            <a className='app__website__buttons__show' href={`/website/${website.token}`} >SHOW</a>
                                            <a className='app__website__buttons__buy' href={`/buy/website/${website.token}`} >PURCHASE</a>
                                        </div> */}
                                    </a>
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

                    <div className="title-container">
                        <h2 className='title-for-section-app-websites'>WebIna Websites</h2>
                    </div>

                    <div className="app__websites-filter">
                        {categoriesWebsites.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleWorkFilter(item)}
                                className={`app__websites-filter-item ${activeFilter === item ? 'item-active' : ''}`}
                            >
                                {item}
                            </div>
                        ))}
                    </div>




                    {filterWebsites?.map((website, index) => (
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

