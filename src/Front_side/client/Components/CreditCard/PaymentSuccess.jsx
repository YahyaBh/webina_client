import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Navbar'


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
            <div style={{ backgroundColor : '#000'}}>
                <Navbar />
            </div>
            {success ?
                <div>
                    Thank You For Your Order , It will be delivered to you shortly.
                </div>
                :
                <div>
                    Something Went Wrong While Making Your Order.
                </div>
            }

        </div>
    )
}

export default PaymentSuccess