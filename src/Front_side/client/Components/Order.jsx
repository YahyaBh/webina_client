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


                <div className="order-container">
                    <h2>{website ? website.website_name : null}</h2>


                    <div className="split-o-det">
                        <div className="order-details">
                            <h2>Order Number : {order ? order.order_number : null}</h2>
                            <h2>Total Price : {order ? order.grand_total : null}$</h2>
                            <h2>Is Paid : {order ? order.is_paid === 1 ? 'Yes' : 'Not Paid' : null}</h2>
                            <h2>Payment Method : {order ? order.payment_method : null}</h2>
                            <h2>Ordered At : {order ? order.created_at.substring(0, 10) : null}</h2>
                            <h2>Website Name : {website && order ? website.website_name : null}</h2>
                        </div>

                        <div className={website ? 'image-container' : 'sk_bg'}>
                            < img src={website ? `http://localhost:8000/uploads/websites/${website.image}` : null} alt='' />
                        </div>
                    </div>


                </div>

            </div >
    )
}

export default Order