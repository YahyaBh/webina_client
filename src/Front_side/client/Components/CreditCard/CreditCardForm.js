import React, { useEffect } from "react";

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import { useState } from "react";
import CreditCards from '../../../../Assets/Images/toppng.com-visa-mastercard-discover-png-visa-mastercard-american-express-discover-1105x175.png'
import StripePNG from '../../../../Assets/Images/stripep.png'
import Swal from "sweetalert2";
import AuthUser from "../../../context/AuthUser";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const CreditCardForm = ({ websiteData }) => {

    const { sec_http, user } = AuthUser();


    const [number, setNumber] = useState('');
    const [name, setName] = useState(user.full_name);
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');

    const [loadoingchckout, setLoadoingchckout] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {

    }, [])


    const formatString = (e) => {
        var inputChar = String.fromCharCode(e.keyCode);
        var code = e.keyCode;
        var allowedKeys = [8];
        if (allowedKeys.indexOf(code) !== -1 || allowedKeys.indexOf(code) > 5) {
            return;
        }

        e.target.value = e.target.value.replace(
            /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
        ).replace(
            /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
        ).replace(
            /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
        ).replace(
            /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
        ).replace(
            /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
        ).replace(
            /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
        ).replace(
            /\/\//g, '/' // Prevent entering more than 1 `/`
        );

        setExpiry(e.target.value);
    }


    const checkOutWebsite = async (e) => {
        e.preventDefault();
        setLoadoingchckout(true);

        if (loadoingchckout) {
            Swal.fire({
                title: 'Just a second...',
                html: '<img src="http://localhost:3000/Images/Infinity-1s-200px.gif">',
                customClass: {
                    icon: 'no-border'
                },
                showConfirmButton: false,
                background: '#f1f2f3'
            })
        }




        const paymentForm = new FormData();

        paymentForm.append('number', number);
        paymentForm.append('cvc', cvc);
        paymentForm.append('price', websiteData.price);
        paymentForm.append('exp_month', expiry.substr(0, 2));
        paymentForm.append('exp_year', expiry.substr(3, 5));
        paymentForm.append('description', websiteData.website_name);
        paymentForm.append('user_token', Cookies.get('token'));
        paymentForm.append('user_email', user.email);
        paymentForm.append('user_name', user.full_name);
        paymentForm.append('user_id', user.id);
        paymentForm.append('website_token', websiteData.token);




        if (name === '' || number === '' || expiry === '' || cvc === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required',
            })
        } else {

            await sec_http.post('/api/checkout', paymentForm)
                .then(res => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank you for your purchase',
                        text: res.data.message,
                    })
                    Cookies.set('checkout', 'true', { sameSite: 'Lax' });
                    setLoadoingchckout(false);
                    window.location.replace(res.data.url);
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                    Cookies.set('checkout', 'false', { sameSite: 'Lax' });
                    setLoadoingchckout(false);
                    window.location.replace(err.data.url);
                })


        }
    }

    return (
        <div className="credit-card-form">


            <div className="section-name-head">Payment Informations</div>
            <div className="container-cards-payment-form">

                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                />

                <form className="form-credit-card-payment" onSubmit={checkOutWebsite}>

                    <input
                        type="tel"
                        name="name"
                        value={name}
                        placeholder={"Enter Name"}
                        onChange={e => setName(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}
                        maxLength='28'
                        max='28'
                    />

                    <input
                        maxLength='16'
                        max='16'
                        type="tel"
                        name="number"
                        value={number}
                        placeholder={"Enter Number"}
                        onChange={e => setNumber(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}

                    />



                    <div className="ex-cvc">

                        <input
                            type="tel"
                            name="expiry"
                            value={expiry}
                            placeholder={"Enter Expiry date"}
                            onChange={e => formatString(e)}
                            onFocus={e => setFocus(e.target.name)}
                            maxLength='5'
                            max='1228'
                        />

                        <input
                            type="tel"
                            name="cvc"
                            value={cvc}
                            placeholder={"CVC"}
                            onChange={e => setCvc(e.target.value)}
                            onFocus={e => setFocus(e.target.name)}
                            maxLength='3'
                            max='3'
                        />
                    </div>

                    <button className="button-checkout" type="submit">Check Out</button>
                </form>

                <div className="pay-images-s-c">
                    <img src={StripePNG} alt="payment-strie" />
                    <img src={CreditCards} alt="payment-cards" />
                </div>
            </div>
        </div>
    );
};

export default CreditCardForm;