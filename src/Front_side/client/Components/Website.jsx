import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';
import Loading from '../../../Assets/Images/WEBINA2.png';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import { BsImage, BsBoxSeam, BsCashStack } from 'react-icons/bs';
import { Ri24HoursFill } from 'react-icons/ri';
import Footer from './Footer';
import { AiFillStar } from 'react-icons/ai';

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

    const showFullImage = () => {
        if (!fullImage) {
            setFullImage(true);

            Swal.fire({
                imageUrl: `${websiteData.full_image ? websiteData.full_image : websiteData.image}`,
                imageHeight: '100%',
                imageWidth: '100%',
                imageAlt: `${websiteData.website_name}`,
                confirmButtonText: 'Close',
                confirmButtonColor: '#000',
            }).then(function (isConfirm) {
                if (isConfirm) {
                    setFullImage(false);
                }
            });
        } else {
            setFullImage(false);
        }
    }

    const buyWebsite = async () => {
        setLoading(true);
        navigate(`/buy/website/${websiteData.token}`);
    }

    const findSimiliar = async () => {
        setLoading(true)
        await sec_http.post(`/website/${params.token}`)
            .then(res => {
                setWebsiteData(res.data.website);
            })

        setLoading(false)
    }

    return (
        loading ?
            <div className='loading-container'>
                < img src={Loading} alt="loading-web" />
            </div >
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
                                    <img className={websiteData.image ? 'image_not_available' : ''} src={`http://localhost:8000/uploads/websites/${websiteData.image}`} alt={websiteData.website_name} />
                                </div>
                            </div>

                            <div className="head__right__section">
                                <div className='head__price'>
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

                                    <div className='buy__button'>
                                        <button>Buy Now</button>
                                        <h5>Regular Licenece</h5>
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