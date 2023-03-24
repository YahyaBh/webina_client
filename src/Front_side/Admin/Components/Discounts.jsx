import React, { useEffect, useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthUser from '../../context/AuthUser'
import Loading from '../../pages/Loading'
import SideBar from './SideBar'


const Discounts = () => {

    const { getAdmin, admin_http } = AuthUser()
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [discounts, setDiscounts] = useState([]);

    const [amount, setAmount] = useState('');
    const [endDate, setEndDate] = useState('');
    const [holder, setHolder] = useState('');



    useEffect(() => {
        if (getAdmin) {
            getDiscounts();
        } else {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [])


    const getDiscounts = async () => {
        admin_http.get('/api/discounts')
            .then(res => {
                setDiscounts(res.data.discounts)
                setLoading(false);
            })
            .catch(err => {
                Swal.fire('error', err.message)
                setLoading(false);
            })
    }

    const createDiscount = async () => {
        setLoading(true);
        const DiscountForm = new FormData()

        DiscountForm.append('amount', amount)
        DiscountForm.append('endDate', endDate)
        DiscountForm.append('holder', holder)

        admin_http.post('/api/discount', DiscountForm)
            .then(res => {
                getDiscounts()
                setLoading(false);
            })
            .catch(err => {
                Swal.fire('error', err.message)
                setLoading(false);
            })


    }

    return (
        loading ?
            <Loading />
            :
            <div>

                <SideBar />




                <div className="discount-container">
                    <div className="discounts-sidebar">
                        <h1>Discounts</h1>

                        <ul>
                            {discounts ? discounts?.map((discount, index) => (
                                <li>{index} {discount.amount}</li>
                            )) : <MdShoppingCart />}
                        </ul>
                    </div>



                    <div className="discount-form-new">
                        <h1>Create New Discount</h1>


                        <form onSubmit={createDiscount}>
                            <label htmlFor="amount">Amount</label>
                            <input type="text" name='amout' placeholder='Amount' value={amount} onChange={e => setAmount(e.target.value)} />

                            <label htmlFor="holder">Holder</label>
                            <input type="text" name="hodler" id="holder" placeholder='Holder' value={holder} onChange={e => setHolder(e.target.value)} />

                            <label htmlFor="end_data">End Date</label>
                            <input type="date" name="end_date" id="end_date" value={endDate} onChange={e => setEndDate(e.target.value)} />

                            <button type="submit">Create</button>
                        </form>

                    </div>
                </div>

            </div >
    )
}

export default Discounts