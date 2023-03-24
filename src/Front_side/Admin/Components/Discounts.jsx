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

    const [currentDiscount, setCurrentDiscount] = useState(null);


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

    const setModalDiscountId = async (e) => {

        admin_http.post('/api/get/discount/', { 'discount_number': e })
            .then(res => {
                setCurrentDiscount(res.data.discount);
            })
            .catch(err => {
                Swal.fire('error', err.message)
            })

    }


    const disableDiscount = async () => {

    }

    const deleteDiscount = async () => {

    }

    return (
        
        loading ?
            <Loading />
            :
            <div>

                <SideBar />



                {currentDiscount ?

                    <div className='current-discount-modal'>

                        <div className='current-discount-modal-header'>
                            <h2>Discount Id : {currentDiscount.id}</h2>
                        </div>

                        <div className='current-discount-modal-body'>
                            <h3>Discount Holder : {currentDiscount.holder}</h3>
                            <h3>Discount Token : {currentDiscount.token}</h3>
                            <h3>Discount Amount : {currentDiscount.amount}</h3>
                            <h3>Discount End Date : {currentDiscount.endDate}</h3>
                        </div>

                        <div className='current-discount-modal-footer'>
                            <button onClick={setCurrentDiscount(null)}>Close</button>
                            <div className='discount-par-buttons'>
                                <button onClick={disableDiscount}>Disable</button>
                                <button onClick={deleteDiscount}>Delete</button>
                            </div>
                        </div>

                    </div>

                    : ''
                }


                <div className="discount-container">
                    <div className="discounts-sidebar">
                        <h1>Discounts</h1>

                        <ul>
                            {discounts ? discounts?.map((discount, index) => (
                                <li key={index} onClick={setModalDiscountId}>{discount.id}-{discount.amount}</li>
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