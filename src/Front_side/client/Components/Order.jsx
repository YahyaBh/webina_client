import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser';
import Navbar from './Navbar';


const Order = () => {

    const params = useParams();

    const { sec_http } = AuthUser();
    const [order , setOrder] = useState();

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

        

        sec_http.post(`/order` , orderData)
        .then((response) => {
            setOrder(response.data.order);
        })
        .catch((error) => {
            Swal.fire({
                icon : 'error',
                title : 'Oops...',
                text : error.message
            })
        })
        
    
    }

    return (
        <div>
            <div style={{ backgroundColor : '#000'}}>
                <Navbar/>
            </div>


            {order? order.order_number : null}



        </div>
    )
}

export default Order