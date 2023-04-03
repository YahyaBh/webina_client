import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import SuccessGif from '../../../../Assets/Images/1103-confetti-outline.gif'
import ErrorGif from '../../../../Assets/Images/1140-error-outline.gif'
import Swal from 'sweetalert2'
import AuthUser from '../../../context/AuthUser'
const PaymentSuccess = () => {

    const [success, setSuccess] = useState(null)
    const [review , setReview] = useState('This website is great !');

    const params = useParams()
    const navigate = useNavigate()
    const { sec_http } = AuthUser()

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



    const submitReview = () => {
        if(review !== '') {

            sec_http.post('/api/review/create' , {review : review , website_token : params.token_site})
            .then(
                Swal.fire({
                    title : 'Review successfully added',
                    text : 'Thank you for your review',
                    icon : 'success'
                }).then((res) => {
                    if(res.isConfirmed) {
                        navigate(`/website/${params.token_site}`);
                    }
                })
            )
            .catch(err => Swal.fire('error', err))

        }
    }

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
                        <div className='buttons'>
                            <a href='/'>Back To Home</a>
                            <a href='/orders'>Check Orders</a>
                        </div>

                        
                        <div className='write-review'>
                            <h3>Rate This Website</h3>

                            <textarea name="review" id="review" cols="10" rows="10" placeholder='Write a review' value={review} onChange={e => setReview(e.target.value)} />
                            <button onClick={submitReview}>Submit</button>
                        </div>


                    </div>
                </div>
            }

        </div>
    )
}

export default PaymentSuccess