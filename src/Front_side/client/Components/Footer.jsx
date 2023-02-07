import React, { useState } from 'react'
import Visa from '../../../Assets/Images/Visa_Logo.png'
import MasterCard from '../../../Assets/Images/mastercard.png'
import AmericanExpress from '../../../Assets/Images/american-express.png'
import TrustPayment from '../../../Assets/Images/trust_payment_logo.png'
import formations from '../../../Assets/Images/1st-logo-2022-light.png'
import PayPal from '../../../Assets/Images/paypal.png'
import { AiFillFacebook, AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
import { SiMinutemailer } from 'react-icons/si'
import AuthUser from '../../AuthUser'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Logo from '../../../Assets/Images/webinai.png'
import cookie from 'js-cookie'





const Footer = () => {

    const { http } = AuthUser();

    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const navigate = useNavigate();


    const subscribe = async (e) => {
        e.preventDefault();
        const subscirbe_email = new FormData();

        subscirbe_email.append('email', email)


        await http.post('/subscribe', subscirbe_email)
            .then(res => {
                Swal.fire({
                    title: 'Thank you for subscribing!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Register ?',
                    confirmButtonColor: '#f3d341',
                    showCancelButton: true,
                    showConfirmButton : cookie.get('token')? false : true

                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            navigate('/signup')
                        }
                    })
                setSubscribed(true);
            })
            .catch(err => {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong' + err.message,
                    icon: 'error'
                })
            })

    }
    return (
        <>
            <footer className="app__footer">
                <div className='app__footer__container'>
                    <img src={Logo} alt="logo" style={{ marginRight : '40px' , marginTop : '30px'}} width='70px' height='auto' />

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
                            <br />
                            <h3>Subscribe</h3>
                            <li>
                                {!subscribed ?
                                    <form onSubmit={subscribe}>
                                        <input style={{ padding: '5px', outline: 'none', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px' }} placeholder='subscribe' onChange={(e) => setEmail(e.target.value)} />
                                        <button style={{ padding: '5px', outline: 'none', borderTopRightRadius: '5px', borderBottomRightRadius: '5px', color: 'rgb(var(--heavy-color))', backgroundColor: 'rgb(var(--mid-color))' }} > Subscribe < SiMinutemailer /></button>
                                    </form>
                                    :
                                    <h3>Thank You For <span style={{ color: '#f3d341' }}>Subscribing</span></h3>
                                }
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
                                <img src={PayPal} alt='paypal' />
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