import cookie from 'js-cookie';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import AuthUser from '../../AuthUser';
import Navbar from './Navbar';
import Loading from '../../../Assets/Images/WEBINA2.png';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import { BsImage, BsBoxSeam, BsCashStack } from 'react-icons/bs';
import { Ri24HoursFill } from 'react-icons/ri';
import Footer from './Footer';
const Website = () => {


    // Get ID from URL
    const params = useParams();

    const { http, sec_http } = AuthUser();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    const [websiteData, setWebsiteData] = useState({});
    const navigate = useNavigate();



    useEffect(() => {
        if(sec_http){
        getWebsite()
        } else {
            navigate('/')
        }
    }, [])



    const getWebsite = async () => {
        await sec_http.get(`/website/${params.token}`)
            .then(res => {
                setWebsiteData(res.data.website);
            })
            .catch(err => {
                Swal.fire({
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    icon : 'error'
                })
                setTimeout(() => {
                    navigate('/websites')
                }, 2000);
            })

        setUserData(JSON.parse(cookie.get('user')));
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

        setUserData(JSON.parse(cookie.get('user')));
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
                    <Navbar userData={userData} />
                </div>



                <header className="app__signle__website__header">
                    <div onClick={showFullImage} className="app__signle__website__image__container">
                        <div className='image__data'>
                            <BsImage />
                            <h5>Show Full Image</h5>
                        </div>
                        <img src={websiteData.image} alt={websiteData.website_name} />
                    </div>
                </header>

                <section className='app__single__website__details'>
                    <h2>{websiteData.website_name}</h2>

                    <h4>{websiteData.description}</h4>

                    <h5>Only : {websiteData.price}$ {websiteData.old_price ? <sub><del>{websiteData.old_price}</del></sub> : ''}</h5>

                    <div className='app__single__website__buttons'>
                        <button onClick={buyWebsite}>Buy Website</button>
                        <button onClick={findSimiliar}>Find Similiar</button>
                    </div>


                    <div className='app__single__website__spec__container'>
                        <div className='app__single__website__spec'>
                            <ul>
                                {websiteData.specifications ? websiteData.specifications.split(',').map((item, index) => { return (<li key={index}>{item}</li>) }) : ''}

                            </ul>
                        </div>

                        <div className="app__single__website__spec__sec">
                            <ul>
                                <li><Ri24HoursFill /> 24/7 Online Assistance</li>

                                <li><BsBoxSeam /> Fast Delivery</li>

                                <li><BsCashStack /> Competitive Price</li>
                            </ul>
                        </div>
                    </div>
                </section>


                <Footer />
            </Fragment>

            :
            navigate('/websites')

    )
}

export default Website