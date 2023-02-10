import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import SuccessGif from '../../../../Assets/Images/1103-confetti-outline.gif'
import ErrorGif from '../../../../Assets/Images/1140-error-outline.gif'
const PaymentSuccess = () => {

    const [success, setSuccess] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.result === 'success' && Cookies.get('checkout') === 'true') {
            setSuccess(true);
            Cookies.remove('checkout')
        } else if (params.result === 'failed' && Cookies.get('checkout') === 'false') {
            setSuccess(false);
        } else {
            navigate('/websites');
        }

    }, [])

    return (
        <div>
            <div style={{ backgroundColor: '#000' }}>
                <Navbar />
            </div>
            {!success ?
                <div className='payment-success-container'>
                    <img src={ErrorGif} alt="success" />
                    <h2>Sorry Something Went Wrong While Making Your Order.</h2>
                    <div className='payment-success-button-container'>
                        <a href='/'>Back To Home</a>
                        <a href='/orders'>Try Again</a>
                    </div>
                </div>
                :
                <div className='payment-success-container'>
                    <img src={SuccessGif} alt="success" />
                    <h2>Thank You For Your Order , It will be delivered to you shortly.</h2>
                    <div className='payment-success-button-container'>
                        <a href='/'>Back To Home</a>
                        <a href='/orders'>Check Orders</a>
                    </div>
                </div>
            }

        </div>
    )
}

export default PaymentSuccess