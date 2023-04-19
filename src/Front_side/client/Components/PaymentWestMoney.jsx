import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar'
import WesternUnion from '../../../Assets/Images/pngwing.com (1).png'
import MoneyGram from '../../../Assets/Images/MoneyGram_Logo.svg.png'
import Loading from '../../pages/Loading';

const PaymentWestMoney = () => {

    const params = useParams;
    const navigate = useNavigate()

    const { sec_http, getUser } = AuthUser()

    const [loading , setLoading] = useState(true);

    useEffect(() => {
        if (getUser) {
            getCashToken()
        } else {
            navigate('/websites')
        }
    }, [])

    const getCashToken = async () => {
        await sec_http.post('/api/payment/westmoney')
            .then(res => {
                setLoading(false);
            })
            .catch(err => {
                Swal.fire('error', err)
            })

    }

    return (
        loading ? <Loading/>:

        <div>


            <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                <Navbar />
            </div>

            <div className='payment-cash'>

                {params.method === 'westernunion' ?
                    <div className="westernunion">
                        <img src={WesternUnion} alt="west" />
                    </div>
                    : params.method === 'moneygram' ?
                        <div className='moneygram'>
                            <img src={MoneyGram} alt="moneygram" />
                        </div>
                        : navigate('/')
                }
            </div>




        </div>
    )
}

export default PaymentWestMoney