
import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser';
import Navbar from './Navbar';
import Loading from '../../../Assets/Images/WEBINA2.png'
import CreditCardForm from './CreditCard/CreditCardForm'

const Payment = () => {

    // Get ID from URL
    const params = useParams();

    const { http, sec_http } = AuthUser();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    const [websiteData, setWebsiteData] = useState({});


    // const [number, setCardNumber] = useState('');
    // const [card_cvc, setCardCvc] = useState('');
    // const [card_exp, setCardExp] = useState('');
    // const [focused, setFocused] = useState('');
    // const [name, setName] = useState('');
    // const [formData, setFormData] = useState(null);
    // const [issuer, setIssuer] = useState('');


    const navigate = useNavigate();


    useEffect(() => {

        getWebsite();
    }, [])


    const getWebsite = async () => {
        sec_http ?
            await sec_http.get(`/website/${params.token}`)
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

        setUserData(JSON.parse(Cookies.get('user')));
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


                <div className='payment-container'>
                    <CreditCardForm />


                    <div className='order-info-payment'></div>
                </div>
            </div>
    )
}





export default Payment