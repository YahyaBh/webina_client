import React, { Fragment } from "react";

import { Routes, Route, Link } from "react-router-dom";

import Admin from "./Front_side/Admin/Components/Admin";
import Show from "./Front_side/Admin/Components/Show";
import Services from "./Front_side/Admin/Components/Services";
import Orders from "./Front_side/Admin/Components/Orders";
import CreateWebsite from "./Front_side/Admin/Components/CreateWebsite";
import Chat from "./Front_side/Admin/Components/Chat";
import Users from "./Front_side/Admin/Components/Users";
import SignIn from "./Front_side/client/Components/SignIn";
import SignUp from "./Front_side/client/Components/SignUp";
import Navbar from "./Front_side/client/Components/Navbar";
import videoHeader from './Assets/Videos/Blurred Video of Scripts Being Typed.mp4';
import ImageAbout from './Assets/Images/3918929.jpg';
import './App.scss'


import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



import { CgWebsite } from 'react-icons/cg'
import { VscDebugAll } from 'react-icons/vsc'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'

function App() {


  return (
    <Fragment>

      <header className="app__header">
        <Navbar />


        <div className="app__header__content">

          <div className="app__header__title">
            <h1>Make Your<br /> Sales <span> Easier</span></h1>
            <p>We will help you react your dreams by <br /> making you the most professional website among the market</p>
          </div>

          <video className="app__video" loop autoPlay={true}>
            <source src={videoHeader} type="video/mp4" />
            <source src={videoHeader} type="video/ogg" />
          </video>
        </div>


      </header>


      <section className="app__about">
        <div className="app__about__content">
          <h2>What Is WebIna ?</h2>
          <p>WebIna is a website that helps you make your dreams
            easier and build you a full appliaction for your business , you can easly choose any website
            from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
        </div>

        <div className="app__about__image">
          <img src={ImageAbout} alt="about_us" width='360px' />
        </div>
      </section>



      <section className="app__more__about">
        <div className="app__more__about__image"></div>
        <div className="app__more__about__content">
          <h2>More About WebIna</h2>
          <p>WebIna is a website that helps you make your dreams
            easier and build you a full appliaction for your business , you can easly choose any website
            from our lists and we will finish it as soon as possible to make your work go easier on you.</p>
          <div className="app__more__about__card">
            <CgWebsite /> <h2>Website Development</h2>
          </div>

          <div className="app__more__about__card">
            <VscDebugAll /> <h2>Websites Debugging</h2>
          </div>

          <div className="app__more__about__card">
            <AiOutlineDeploymentUnit /> <h2>Website Deployment</h2>
          </div>
        </div>
      </section>


      <section className="app__categories mt-5">
        <div className="app__categories__content">
          <div className="app__categories__triangle__left"></div>
          <div className="app__categories__title"><h2>WebIna_Categories</h2></div>
          <div className="app__categories__triangle__right"></div>
        </div>


        <div className="app__categories__cards">
          <div className="app__categories__cards__sep">
            <div className="app__categories__card">
              <div className="app__categories__card__content">
                <div className="app__categories__card__content__image">
                  <img className="app__categories__card__content" src="./Images/e-commerce.jpg" alt="e-commerce" />
                  <div className="app__categories__card__content__title">E-Commerce Website</div>
                  <div className="app__categories__card__content__description"></div>

                </div>
              </div>
            </div>
            <div className="app__categories__card">
              <div className="app__categories__card__content">
                <div className="app__categories__card__content__image">
                  <img className="app__categories__card__content" src="./Images/landing.jpg" alt="landing-page" />
                  <div className="app__categories__card__content__title">Landing Page</div>
                  <div className="app__categories__card__content__description"></div>
                </div>
              </div>
            </div>

            <div className="app__categories__card">
              <div className="app__categories__card__content">
                <div className="app__categories__card__content__image">
                  <img className="app__categories__card__content" src="./Images/blog.jpg" alt="blog" />
                  <div className="app__categories__card__content__title">Blog/News Page</div>
                  <div className="app__categories__card__content__description"></div>
                </div>
              </div>
            </div>

            <div className="app__categories__card">
              <div className="app__categories__card__content">
                <div className="app__categories__card__content__image">
                  <img className="app__categories__card__content" src="./Images/portfolio.jpg" alt="portfolio" />
                  <div className="app__categories__card__content__title">Portfolio Website</div>
                  <div className="app__categories__card__content__description"></div>
                </div>
              </div>
            </div>



            {/* <SwiperCategories /> */}
          </div>

          <div className="show__container">
            <button className="app__categories__show__button">Show more</button>
          </div>
        </div>

      </section>

      <section style={{ height : '400vh'}} className="section">

      </section>

      <Routes>

        {/* Admin Space */}
        {/* <Route exact path='/' element={<Client />} /> */}
        <Route exact path='/admin' element={<Admin />} />



        <Route exact path='/admin/services' element={<Services />} />

        <Route exact path='/admin/orders' element={<Orders />} />
        <Route exact path='/admin/order/:id' element={<Orders />} />

        <Route exact path='/admin/chats' element={<Chat />} />
        <Route exact path='/admin/chat/:id' element={<Chat />} />

        <Route exact path='/admin/users' element={<Users />} />
        <Route exact path='/admin/user/:id' element={<Users />} />

        <Route exact path='/admin/websites' element={<Show />} />
        <Route exact path='/admin/website/:id' element={<Show />} />

        <Route exact path='/admin/createWebsite' element={<CreateWebsite />} />


        {/* Client Space */}
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />

      </Routes>
    </Fragment>
  );
}

export default App;




function SwiperCategories() {
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
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
      <SwiperSlide>Slide 5</SwiperSlide>
      <SwiperSlide>Slide 6</SwiperSlide>
      <SwiperSlide>Slide 7</SwiperSlide>
      <SwiperSlide>Slide 8</SwiperSlide>
      <SwiperSlide>Slide 9</SwiperSlide>
    </Swiper>
  )
}