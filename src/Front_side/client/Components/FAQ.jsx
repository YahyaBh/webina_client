import { Fragment, useEffect, useState } from 'react';
import Loading from '../../../Assets/Images/WEBINA2.png'
import Navbar from './Navbar';
import Footer from './Footer'
import { AiOutlinePlus } from 'react-icons/ai';




const FAQ = () => {

    const [loading, setLoading] = useState(true);
    const [activeFAQ , setActiveFAQ] = useState(0);

    useEffect(() => {

        setLoading(false);

    }, [])
    return (

        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <Fragment>

                <div style={{ backgroundColor: '#000' }}>
                    <Navbar />
                </div>




                <div className="faq-container">
                    <div className="main-title">
                        <h1>Frequent Asked Questions</h1>
                    </div>

                    <div className='section-faq-container'>
                        <h3>Services</h3>


                        <div className='questions-contianer'>


                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(1)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What kind of websites do you offer?</h4>
                                </div>

                                <div className={activeFAQ === 1 ? "active body-question" : "body-question"}>
                                    <p>We offer a wide range of website services, including e-commerce websites, personal websites, business websites, and more. You can contact us for a custom quote.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(2)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What is the process for getting a website designed by WebIna?</h4>
                                </div>

                                <div className={activeFAQ === 2 ? "active body-question" : "body-question"}>
                                    <p>Our website design process starts with a consultation with you to understand your needs and requirements. After that, we create a custom website design based on your specifications. You will be able to provide feedback and make revisions until you are satisfied with the design. Once the design is finalized, we will start building the website.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(3)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Do you provide content for the website?</h4>
                                </div>

                                <div className={activeFAQ === 3 ? "active body-question" : "body-question"}>
                                    <p>Yes, we offer content creation services as part of our website design package. We can also help you with copywriting, editing, and search engine optimization (SEO) for your website.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(4)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>How do I get in touch with WebIna for support?</h4>
                                </div>

                                <div className={activeFAQ === 4 ? "active body-question" : "body-question"}>
                                    <p>You can reach out to us through our contact page on our website, or by email or phone. We offer 24/7 support for our clients.</p>
                                </div>

                            </div>


                        </div>
                    </div>


                    <div className='section-faq-container'>
                        <h3>Payment</h3>


                        <div className='questions-contianer'>


                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(5)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What payment methods do you accept?</h4>
                                </div>

                                <div className={activeFAQ === 5 ? "active body-question" : "body-question"}>
                                    <p>We offer a wide range of website services, including e-commerce websites, personal websites, business websites, and more. You can contact us for a custom quote.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(6)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What is the process for getting a website designed by WebIna?</h4>
                                </div>

                                <div className={activeFAQ === 6 ? "active body-question" : "body-question"}>
                                    <p>Our website design process starts with a consultation with you to understand your needs and requirements. After that, we create a custom website design based on your specifications. You will be able to provide feedback and make revisions until you are satisfied with the design. Once the design is finalized, we will start building the website.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(7)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Do you provide content for the website?</h4>
                                </div>

                                <div className={activeFAQ === 7 ? "active body-question" : "body-question"}>
                                    <p>Yes, we offer content creation services as part of our website design package. We can also help you with copywriting, editing, and search engine optimization (SEO) for your website.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(8)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>How do I get in touch with WebIna for support?</h4>
                                </div>

                                <div className={activeFAQ === 8 ? "active body-question" : "body-question"}>
                                    <p>You can reach out to us through our contact page on our website, or by email or phone. We offer 24/7 support for our clients.</p>
                                </div>

                            </div>


                        </div>
                    </div>


                    <div className='section-faq-container'>
                        <h3>Refunds</h3>


                        <div className='questions-contianer'>


                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(9)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Do you offer refunds for website purchases?</h4>
                                </div>

                                <div className={activeFAQ === 9 ? "active body-question" : "body-question"}>
                                    <p>Yes, we offer a 30-day money-back guarantee for all website purchases.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(10)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What is your refund policy?</h4>
                                </div>

                                <div className={activeFAQ === 10 ? "active body-question" : "body-question"}>
                                    <p>Our refund policy states that you can request a refund within 30 days of the website delivery date.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(11)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>How long does it take to process a refund?</h4>
                                </div>

                                <div className={activeFAQ === 11 ? "active body-question" : "body-question"}>
                                    <p>Refunds are processed within 5-7 business days of the request being approved.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(12)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Can I get a partial refund if I am not satisfied with certain aspects of my website?</h4>
                                </div>

                                <div className={activeFAQ === 12 ? "active body-question" : "body-question"}>
                                    <p>We do not offer partial refunds. However, we will work with you to address any issues with your website.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(13)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What happens to my website if I receive a refund?</h4>
                                </div>

                                <div className={activeFAQ === 13 ? "active body-question" : "body-question"}>
                                    <p>If you receive a refund, your website will be taken down and you will no longer have access to it.</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='section-faq-container'>
                        <h3>Support</h3>


                        <div className='questions-contianer'>


                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(14)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What support options are available if I need help with my website?</h4>
                                </div>

                                <div className={activeFAQ === 14 ? "active body-question" : "body-question"}>
                                    <p>We offer email and phone support for all website-related issues.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(15)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Is support included in the website development package?</h4>
                                </div>

                                <div className={activeFAQ === 15 ? "active body-question" : "body-question"}>
                                    <p>Yes, support is included in all website development packages.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(16)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What is your response time for support requests?</h4>
                                </div>

                                <div className={activeFAQ === 16 ? "active body-question" : "body-question"}>
                                    <p>We aim to respond to all support requests within 24 hours.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(17)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Can I get support outside of business hours?</h4>
                                </div>

                                <div className={activeFAQ === 17 ? "active body-question" : "body-question"}>
                                    <p>We do not offer support outside of business hours. However, we will respond to your request as soon as possible during business hours.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(18)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>How can I contact the WebIna support team?</h4>
                                </div>

                                <div className={activeFAQ === 18 ? "active body-question" : "body-question"}>
                                    <p>You can contact our support team via email or phone. Contact details are available on our website.</p>
                                </div>

                            </div>

                        </div>
                    </div>

                    <div className='section-faq-container'>
                        <h3>Maintenance</h3>


                        <div className='questions-contianer'>


                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(19)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Do you offer website maintenance services?</h4>
                                </div>

                                <div className={activeFAQ === 19 ? "active body-question" : "body-question"}>
                                    <p>Yes, we offer website maintenance services.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(20)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>What does website maintenance include?</h4>
                                </div>

                                <div className={activeFAQ === 20 ? "active body-question" : "body-question"}>
                                    <p>Website maintenance includes updating software and plugins, regular backups, security checks, and content updates.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(21)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>How much does website maintenance cost?</h4>
                                </div>

                                <div className={activeFAQ === 21 ? "active body-question" : "body-question"}>
                                    <p>Website maintenance costs depend on the type and complexity of your website. Contact us for a quote.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(22)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>Can I choose a maintenance plan that suits my needs?</h4>
                                </div>

                                <div className={activeFAQ === 22 ? "active body-question" : "body-question"}>
                                    <p>Yes, we offer various maintenance plans to suit your needs and budget.</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div onClick={e => setActiveFAQ(23)} className="header-question">
                                    <AiOutlinePlus />
                                    <h4>How often do you update websites under a maintenance plan?</h4>
                                </div>

                                <div className={activeFAQ === 23 ? "active body-question" : "body-question"}>
                                    <p>We update websites under a maintenance plan on a monthly or bi-monthly basis, depending on the plan chosen.</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <Footer/>
            </Fragment>
    )
}

export default FAQ