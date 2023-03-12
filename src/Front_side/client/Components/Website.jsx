import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';
import Loading from '../../pages/Loading';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import Footer from './Footer';
import { AiFillStar } from 'react-icons/ai';
import PaymentMethods from '../../../Assets/Images/toppng.com-visa-mastercard-discover-png-visa-mastercard-american-express-discover-1105x175.png'
import MoneyGram from '../../../Assets/Images/MoneyGram_Logo.svg.png';
import WesternUnion from '../../../Assets/Images/pngwing.com (1).png'
import Paypal from '../../../Assets/Images/Paypal_2014_logo.png';
import Logo from '../../../Assets/Images/WEBINA2.png';
import { BiDownload } from 'react-icons/bi';

const Website = () => {

    const params = useParams();

    const { sec_http, getUser, user } = AuthUser();
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    const [websiteData, setWebsiteData] = useState({});
    const navigate = useNavigate();



    useEffect(() => {

        if (getUser && params.token) {
            getWebsite()
        } else {
            navigate('/')
        }
    }, [])



    const getWebsite = async () => {
        await sec_http.get(`/api/website/${params.token}`)
            .then(res => {
                setWebsiteData(res.data.website);
            })
            .catch(err => {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    icon: 'error'
                })
                setTimeout(() => {
                    navigate('/websites')
                }, 2000);
            })

        setLoading(false)

    }


    const buyWebsite = async () => {
        setLoading(true);
        navigate(`/buy/website/${websiteData.token}`);
    }

    const downloadFiles = async () => {

    }


    return (
        loading ?
            <Loading />
            : websiteData ?
                <Fragment>
                    <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                        <Navbar userData={user} />
                    </div>


                    <div className='app__single__website__container'>
                        <div className='head__title'>
                            <h2>TITLE HEADER</h2>
                            <div className='head__feedback'>
                                <AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar /><AiFillStar />
                                <a href='/'>customers reviews</a>
                            </div>
                        </div>

                        <div className="head__image__price__section">
                            <div className="head__left__section">
                                <div className='head__image'>
                                    <div onClick={downloadFiles} className='image-download-container'>
                                        <h3><BiDownload /> Download Theme Preview</h3>
                                        <img className={websiteData.image ? 'image_not_available' : ''} src={websiteData.image} alt={websiteData.website_name} />
                                    </div>
                                </div>
                            </div>

                            <div className="head__right__section">
                                <div className='head__price'>
                                    <div className='product-details'>
                                        <div className="price">
                                            <h3>PRICE</h3>
                                            <h4>${websiteData.old_price ? <span>${websiteData.old_price}</span> : ''}{websiteData.price}</h4>
                                        </div>
                                        <hr />

                                        <ul>
                                            <li>Team Checked By TeamWagon</li>
                                            <li>6 months technical support</li>
                                            <li>Life time free update</li>
                                            <li>100% money back guarante</li>
                                        </ul>


                                        <div className='created_by'>
                                            <div className='image-container'>
                                                <img src={Logo} alt="logo" />
                                            </div>
                                            <h3>CREATED BY <span> WEBINA</span></h3>
                                        </div>
                                    </div>


                                    <div className='buy__button'>
                                        <button>Buy Now</button>
                                        <h5>Regular Licenece</h5>
                                        <hr />

                                        <div className="supported_payments">
                                            <img src={PaymentMethods} alt="supported-cards" />
                                            <img src={MoneyGram} alt="moneygram" />
                                            <img src={WesternUnion} alt="westernunion" />
                                            <img src={Paypal} alt="payapl" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="website__description">
                            <div className="website__description__container">
                                <div className="website__description__left">
                                    <div className="website__description__left__title">
                                        <h2>&#x2022; Description</h2>
                                    </div>
                                    <div className='light-back'>
                                        <div className='website__description__paragraph'>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                when an unknown printer took a galley of type and scrambled it to make a type
                                                specimen book. It has survived not only five centuries, but also the leap into
                                                electronic typesetting, remaining essentially unchanged. It was popularised in
                                                the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                                and more recently with desktop publishing software like Aldus PageMaker
                                                including versions of Lorem Ipsum.</p>
                                        </div>

                                        <div className="website__design__section">
                                            <h3>Design</h3>

                                            <ul>
                                                <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    when an unknown pr</li>
                                                <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    when an unknown pr</li>
                                                <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    when an unknown pr</li>
                                                <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    when an unknown pr</li>
                                                <li>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                                    when an unknown pr</li>
                                            </ul>
                                        </div>

                                        <div className="website__technologies__used">
                                            <h3>Website Specification</h3>

                                            <ul>
                                                <li>Html</li>
                                                <li>Css</li>
                                                <li>JavaScript</li>
                                                <li>JavaScript</li>
                                                <li>JavaScript</li>
                                                <li>JavaScript</li>
                                                <li>JavaScript</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div id='reviews' className="website__description__left__title">
                                        <h2>&#x2022; Reviews</h2>
                                    </div>

                                    <div className="website__reviews">
                                        <h4>Total Reviews  <span>4.7<AiFillStar style={{ color: 'rgb(var(--mid-color))' }} /></span></h4>
                                        <h5>(1 review)</h5>
                                        <div className="reviews__stars__container">
                                            <AiFillStar />
                                            <AiFillStar />
                                            <AiFillStar />
                                            <AiFillStar />
                                            <AiFillStar />
                                        </div>

                                        <hr />

                                        <div className='website__reviews__container'>
                                            <div className="website__review__card">
                                                <div className="name__time__sec">
                                                    <span className='reviewer_name'>Yahya Bouhsine</span>
                                                    <span className='reviewer_time'>1 year ago</span>
                                                </div>

                                                <div className='stars_sec'>
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                </div>

                                                <div className='review_sec'>
                                                    <p>This was a great website it helped me to organise all my company everything is perfect</p>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="website__description__right">
                                    <div className="website__description__right__title">
                                        <h3>Added At :</h3>
                                        <h3>5 Hours Ago</h3>
                                    </div>
                                    <hr />

                                    <div className="website__description__right__title">
                                        <h3>Category :</h3>
                                        <h3>e-commerce</h3>
                                    </div>
                                    <hr />
                                    <div className="website__description__right__title">
                                        <h3>Technologies :</h3>
                                        <ul>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div className="website__description__right__title">
                                        <h3>Tags :</h3>
                                        <ul>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                            <span>Bootstrap ,</span>
                                        </ul>
                                    </div>
                                    <hr />
                                    <div className="website__description__right__title">
                                        <h3 className='all-rights'><img src={Logo} alt="logo" /><span>All Rights Reserved&#169;</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <Footer />
                </Fragment>

                :
                navigate('/websites')

    )
}

export default Website