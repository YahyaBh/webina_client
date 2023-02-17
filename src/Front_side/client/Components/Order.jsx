import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';


const Order = () => {

    const params = useParams();

    const { sec_http } = AuthUser();
    const [order, setOrder] = useState();
    const [website, setWebsite] = useState();


    useEffect(() => {

        if (!Cookies.get('token')) {

        } else {
            getOrderData();
        }

    }, [])


    const getOrderData = async () => {

        const orderData = new FormData();

        orderData.append('user_id', params.user_id);
        orderData.append('user_token', params.user_token);
        orderData.append('order_token', params.order_token);




        sec_http.post(`/order`, orderData)
            .then((response) => {
                setOrder(response.data.order);
                setWebsite(response.data.website);

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