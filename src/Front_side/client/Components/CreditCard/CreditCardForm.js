import React from "react";

import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import { useState } from "react";
import Navbar from "../Navbar";


const CreditCardForm = () => {

    const [number, setNumber] = useState('');

    const [name, setName] = useState('');

    const [expiry, setExpiry] = useState('');

    const [cvc, setCvc] = useState('');

    const [focus, setFocus] = useState('');


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


    return (
        <div>

            <div>

                <Cards
                    cvc={cvc}
                    expiry={expiry}
                    focused={focus}
                    name={name}
                    number={number}
                />

                <form>

                    <input
                        maxLength='16'
                        max='16'
                        type="tel"
                        name="number"
                        val={number}
                        placeholder={"Enter Number"}
                        onChange={e => setNumber(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}

                    />

                    <input
                        type="tel"
                        name="name"
                        val={name}
                        placeholder={"Enter Name"}
                        onChange={e => setName(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}
                        maxLength='28'
                        max='28'
                    />

                    <input
                        type="tel"
                        name="expiry"
                        val={expiry}
                        placeholder={"Enter Expiry date"}
                        onKeyUp={e => formatString(e)}
                        onFocus={e => setFocus(e.target.name)}
                        maxLength='5'
                        max='5'
                    />

                    <input
                        type="tel"
                        name="cvc"
                        val={cvc}
                        placeholder={"Enter Cvc"}
                        onChange={e => setCvc(e.target.value)}
                        onFocus={e => setFocus(e.target.name)}
                        maxLength='3'
                        max='3'
                    />

                </form>

            </div>
        </div>
    );
};

export default CreditCardForm;