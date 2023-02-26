import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';
import Loading from '../../pages/Loading'

const Order = () => {

    const params = useParams();
    const navigate = useNavigate();


    const { sec_http, user } = AuthUser();
    const [order, setOrder] = useState();
    const [website, setWebsite] = useState();
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        if (user) {
            getOrderData();
        } else {
            navigate('/signin');
        }

    }, [])


    const getOrderData = async () => {

        const orderData = new FormData();

        orderData.append('user_id', user.id);
        orderData.append('order_token', params.order_token);


        sec_http.post(`/api/order`, orderData)
            .then((response) => {
                setOrder(response.data.order);
                setWebsite(response.data.website);
                setLoading(false);

            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message
                })
            })


    }

    return (
        loading ? <Loading /> :
            <div>
                <div style={{ backgroundColor: '#000' }}>
                    <Navbar />
                </div>

                <h1>{website ? website.website_name : null}
                </h1>
                <br />
                {order ? order.order_number : null}

                <br />


                <div className='sk_bg big'>
                    <img src={website ? website.image : null} alt='' />
                </div>

            </div>
    )
}

export default Order