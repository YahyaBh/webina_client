import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import devPc from '../../../Assets/Images/team-about-us-ai.png'
import webInaSearch from '../../../Assets/Images/webina-search-ai.png'
import webInaDevScreens from '../../../Assets/Images/programming-development-ai.png'
import webInaFeedback from '../../../Assets/Images/WEBINAsocial-media-ai.png'
import webInaStore from '../../../Assets/Images/STORE-WEBINA-ai.png'


const AboutUs = () => {
    return (
        <div className='app__about__us__page'>

            <div style={{ backgroundColor: 'black' }}>
                <Navbar />
            </div>

            <header>
                <h2>About Us</h2>
            </header>


            <section>
                <div className='app__par__container'>
                    <p>
                        Welcome to WebIna! We are a team
                        of experienced web developers and
                        designers who are passionate about
                        helping businesses establish their
                        online presence. Our goal is to make it
                        easy for people to start and grow their
                        online businesses by providing them
                        with custom-made websites that are
                        not only visually appealing but also
                        functional and user-friendly.
                    </p>

                    <img src={devPc} alt="developer-pc-hands" />
                </div>

                <div className='app__par__container'>


                    <img src={webInaSearch} alt="search-for-webina" />

                    <p>
                        We understand the challenges that come
                        with starting an online business and that's
                        why we've made it our mission to simplify
                        the process. With our comprehensive
                        website development services, we take
                        care of all the technicalities, so you can
                        focus on what you do best - running your
                        business. Our team of experts will work
                        with you to create a website that perfectly
                        represents your brand and meets your
                        specific needs and requirements.
                    </p>
                </div>


                <div className='app__par__container'>



                    <p>
                        We use the latest technologies and design
                        trends to ensure that your website stands
                        out from the competition and engages
                        your target audience. From the initial
                        concept to the final product, our team is
                        dedicated to providing our clients a
                        seamless and enjoyable experience.
                    </p>

                    <img src={webInaDevScreens} alt="screens-of-development" />

                </div>

                <div className='app__par__container'>

                    <img src={webInaFeedback} alt="feedback-for-webina" />


                    <p>
                        At our company, we believe in
                        transparency and honesty. That's why we
                        offer affordable pricing and no hidden
                        fees. Our commitment to customer
                        satisfaction is reflected in our high-quality
                        work and the positive feedback we receive
                        from our clients.
                    </p>


                </div>

                <div className='app__par__container'>



                    <p>
                        So, look no further if you're looking to start
                        or grow your online business. With our
                        help, you can take your business to the
                        next level and achieve your goals. Contact
                        us today to learn more about how we can
                        help you get started.
                    </p>

                    <img src={webInaStore} alt="webina-store-clients" />

                </div>
            </section>

            <Footer />
        </div>
    )
}

export default AboutUs