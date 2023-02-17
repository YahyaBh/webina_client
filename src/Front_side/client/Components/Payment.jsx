
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from '../../../Assets/Images/WEBINA2.png'
import CreditCardForm from './CreditCard/CreditCardForm'
import { BsArrowLeftShort } from 'react-icons/bs';



const Payment = () => {


    const params = useParams();

    const { http, sec_http , getUser } = AuthUser();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    const [websiteData, setWebsiteData] = useState({});



    const navigate = useNavigate();


    useEffect(() => {

        getWebsite();
    }, [])


    const getWebsite = async () => {
        sec_http ?
            await sec_http.get(`/api/website/${params.token}`)
                .then(res => {
                    setWebsiteData(res.data.website);
                    console.log(res.data.website);
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
            :
            navigate('/')

        setUserData(getUser, { SameSite: true });
        setLoading(false);

    }

    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div className='payment'>

                <div style={{ backgroundColor: '#000' }}>
                    <Navbar />
                </div>

                <div className='arrow-back'>
                    <a href={`http://localhost:3000/website/${params.token}`}>
                        <BsArrowLeftShort />
                    </a>
                </div>

                <div className='payment-container'>
                    <CreditCardForm websiteData={websiteData} />

                    <div className='order-info-payment'>

                        <div className="section-name-head">Order Informations</div>
                        <div className='website-informations'>
                            <h5>{websiteData.website_name}</h5>

                            <img className='website-image' src={websiteData.image} alt={websiteData.website_name} />
                            <div className='website-price-container'>

                                <div className='info-holder-bet'>
                                    <h4>Website Price :</h4>
                                    <h4>{websiteData.price}$</h4>
                                </div>
                                <hr />
                                <div className='info-holder-bet'>
                                    <h4>Discount :</h4>
                                    <h4>0% (0.00$)</h4>
                                </div>

                                <hr />
                                <div className='info-holder-bet'>
                                    <h4>Fees :</h4>
                                    <h4>0% (0.00$)</h4>
                                </div>

                                <hr />
                                <div className='info-holder-bet total-price'>
                                    <h4>Total Price :</h4>
                                    <h4>{websiteData.price}$</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer />
            </div>
    )
}





export default Payment