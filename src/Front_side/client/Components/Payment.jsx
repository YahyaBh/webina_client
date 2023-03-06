
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from '../../../Assets/Images/WEBINA2.png'
import CreditCardForm from './CreditCard/CreditCardForm'
import { BsArrowLeftShort } from 'react-icons/bs';
import MoneyGram from '../../../Assets/Images/MoneyGram_Logo.svg.png'
import WU from '../../../Assets/Images/pngwing.com (1).png'

const Payment = () => {


    const params = useParams();

    const { http, sec_http, getUser } = AuthUser();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    const [websiteData, setWebsiteData] = useState({});
    const [paymentMethods, setPaymentMethods] = useState('');
    const [cashMethods, setCashMethods] = useState('');

    const navigate = useNavigate();


    useEffect(() => {

        getWebsite();
    }, [])


    const getWebsite = async () => {
        sec_http ?
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
            :
            navigate('/')

        setUserData(getUser, { sameSite: 'Lax' });
        setLoading(false);

    }

    const setHandleShow = (e) => {
        if (e === 'cash') {
            setPaymentMethods('cash');
            console.log(paymentMethods);
        } else if (e === 'card') {
            setPaymentMethods('card');
            console.log(paymentMethods);
        }
    }

    const setCashMethod = (e) => {
        if(paymentMethods === 'cash') {
            setCashMethods(e);
            console.log(cashMethods);
        } else {
            setPaymentMethods('cash');
        }
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


                    <div className='payment-methods-container'>
                        <div className='pay-with-cash'>
                            <button onClick={e => setHandleShow('cash')} className={paymentMethods === 'cash' ? 'select-div-pay' : 'selected-div-pay'}>
                                WestrenUnion Or MoneyGram
                            </button>

                            <div className={paymentMethods === 'cash' ? 'show-method' : 'hide-method'}>
                                <button className='west-money-sel' onClick={e => setCashMethod('westrenunion')}>WestrenUnion <img src={WU} alt="westrenunion" /></button>
                                <button className='west-money-sel' onClick={e => setCashMethod('moneygram')}>MoneyGram <img src={MoneyGram} alt="moneygram"/></button>
                            </div>
                        </div>
                        <div className='pay-with-card'>
                            <button onClick={e => setHandleShow('card')} className={paymentMethods === 'card' ? 'select-div-pay' : 'selected-div-pay'}>
                                Credit Or Debit Card
                            </button>

                            <div className={paymentMethods === 'card' ? 'show-method' : 'hide-method'}>
                                <CreditCardForm websiteData={websiteData} />
                            </div>
                        </div>
                    </div>

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