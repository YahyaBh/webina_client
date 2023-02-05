import React from 'react'
import Visa from '../../../Assets/Images/Visa_Logo.png'
import MasterCard from '../../../Assets/Images/mastercard.png'
import AmericanExpress from '../../../Assets/Images/american-express.png'
import TrustPayment from '../../../Assets/Images/trust_payment_logo.png'
import formations from '../../../Assets/Images/1st-logo-2022-light.png'
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { SiMinutemailer } from 'react-icons/si'


const Footer = () => {
    return (
        <>
            <footer className="app__footer">
                <div className='app__footer__container'>
                    <div className="app__footer__content">
                        <ul>
                            <h3>Page You Should Visit</h3>
                            <li><a href="/">Home</a></li>
                            <li><a href="/privacy&policy">Privacy & Policy</a></li>

                            <h3 className='mt-3'>Stay Conntected</h3>
                            <div className='social-media'>
                                <li><a href="/"><AiFillFacebook /></a></li>
                                <li><a href="/"><AiFillInstagram /></a></li>
                                <li><a href="/"><AiOutlineTwitter /></a></li>
                            </div>
                        </ul>
                    </div>

                    <div className="app__footer__content">
                        <ul>
                            <h3>Most Popular</h3>
                            <li><a href="/e-commerce/websites">E-commerce</a></li>
                            <li><a href="/blog/websites">Blog</a></li>
                            <li><a href="/landing-page/websites">Landing Page</a></li>
                            <li>
                                <form>
                                    <input style={{ padding: '5px', outline: 'none', borderRadius: '5px' }} placeholder='subscribe' />
                                    <button style={{ padding: '5px', outline: 'none', borderRadius: '5px' }} > Subscribe < SiMinutemailer /></button>
                                </form>
                            </li>
                        </ul>
                    </div>

                    <div className="app__footer__content">
                        <ul>
                            <h3>Safe Payments With :</h3>

                            <div className='app__footer__cards__pay'>
                                <img src={Visa} alt='visa' />
                                <img src={MasterCard} alt='mastercard' />
                                <img src={AmericanExpress} alt='americanexpress' />
                            </div>

                            <h3>Our Providers :</h3>


                            <div className='app__footer__cards__trust'>
                                <a href='https://www.trustpayments.com/'>
                                    <img src={TrustPayment} alt="trustpayment" />
                                </a>
                                <a className='mt-2' href='https://www.1stformations.co.uk/'>
                                    <img src={formations} alt="1formations" />
                                </a>

                            </div>

                        </ul>
                    </div>
                </div>

                <div className='app__footer__copyright'>
                    <h4>All Right Reserved WebIna LTD&copy;</h4>
                </div>
            </footer>
        </>
    )
}

export default Footer