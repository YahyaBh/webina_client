
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Navbar from './Navbar';
import Footer from './Footer';
import Loading from '../../../Assets/Images/WEBINA2.png'
import CreditCardForm from './CreditCard/CreditCardForm'
import { BsArrowLeftShort, BsPaypal } from 'react-icons/bs';
import MoneyGram from '../../../Assets/Images/MoneyGram_Logo.svg.png'
import WU from '../../../Assets/Images/pngwing.com (1).png'
import CreditCards from '../../../Assets/Images/toppng.com-visa-mastercard-discover-png-visa-mastercard-american-express-discover-1105x175.png'
import PayPal from '../../../Assets/Images/Paypal_2014_logo.png'
import PhoneInput from 'react-phone-number-input';

const Payment = () => {


    const params = useParams();

    const { user, sec_http, getUser, accessToken } = AuthUser();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [websiteData, setWebsiteData] = useState({});
    const [paymentMethods, setPaymentMethods] = useState('');



    const [full_name, setFullName] = useState(user?.full_name);
    const [email, setEmail] = useState(user?.email);
    const [phone, setPhone] = useState(user?.phone ? user.phone : '');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');


    const navigate = useNavigate();


    useEffect(() => {

        if (getUser && accessToken && params.token) {
            getWebsite();

            if (userData.phone) {
                setPhone(userData.phone)
            }
        } else {
            navigate('/login', { replace: true });
        }

    }, [])


    const getWebsite = async () => {
        sec_http ?
            await sec_http.get(`/api/website/${params.token}`)
                .then(res => {
                    setWebsiteData(res.data.website);
                })
                .catch(err => {
                    setTimeout(() => {
                        navigate('/websites')
                    }, 2000);
                })
            :
            navigate('/', { replace: true });
        setUserData(getUser, { sameSite: 'Lax' });
        setLoading(false);
    }

    const setHandleShow = (e) => {
        if (e === 'cash') {
            setPaymentMethods('cash');
        } else if (e === 'card') {
            setPaymentMethods('card');
        }
    }

    const submitMonWest = async (e) => {
        e.preventDefault();


        const cashForm = new FormData();


        cashForm.append('website_token', params.token);

        cashForm.append('full_name', full_name);
        cashForm.append('email', email);
        cashForm.append('phone', phone);
        cashForm.append('city', city);
        cashForm.append('country', country);

        sec_http.post('/api/checkout/cash', cashForm)
            .then(res => {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(`/checkout/westernunion/${res.data.cash_payment_token}`, { replace: true });
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Payment Failed',
                    showConfirmButton: false,
                    timer: 1500
                })
            })

    }

    const paypalCheckout = async (e) => {

        setHandleShow('paypal')

        const websiteForm = new FormData();


        websiteForm.append('website_name', websiteData.website_name);
        websiteForm.append('price', websiteData.price);
        websiteForm.append('description', websiteData.description);
        websiteForm.append('website_token', websiteData.token);

        sec_http ?
            await sec_http.post(`/api/checkout/paypal`, websiteForm)
                .then((res) => {
                })
            :
            navigate('/', { replace: true });
    }

    return (
        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <div className='payment'>

                <div style={{ backgroundColor: '#000' }}>
                    <Navbar />
                </div>

                <div className='arrow-back'>
                    <a href={`http://localhost:3000/website/${params.token}`}>
                        <BsArrowLeftShort />{websiteData.website_name}
                    </a>
                </div>

                <div className='payment-container'>


                    <div className='payment-methods-container'>
                        <div className='pay-with-cash'>
                            <button onClick={e => setHandleShow('cash')} className={paymentMethods === 'cash' ? 'select-div-pay' : 'selected-div-pay'}>
                                <h4>WestrenUnion Or MoneyGram</h4> <div className='div-west-images'><img src={WU} alt="westrenunion" /><img src={MoneyGram} alt="moneygram" /></div>
                            </button>

                            <div className={paymentMethods === 'cash' || paymentMethods === 'westrenunion' || paymentMethods === 'moneygram' ? 'show-method' : 'hide-method'}>
                                <div className='cash-method'>
                                    <button className='west-money-sel' onClick={e => setPaymentMethods('westrenunion')}>WestrenUnion <img src={WU} alt="westrenunion" /></button>
                                    <button className='west-money-sel' onClick={e => setPaymentMethods('moneygram')}>MoneyGram <img src={MoneyGram} alt="moneygram" /></button>
                                </div>

                                <div style={{ display: paymentMethods === 'westrenunion' || paymentMethods === 'moneygram' ? 'block' : 'none' }}>
                                    <form className='form-money-west' onSubmit={submitMonWest} >
                                        <h4 style={{ fontFamily: 'Louis-Bold', marginTop: '20px' }}>{paymentMethods === 'moneygram' ? 'MoneyGram' : 'WesternUnion'}</h4>
                                        <input type="text" name='full_name' onChange={(e) => setFullName(e.target.value)} value={full_name} placeholder="Full Name" />
                                        <PhoneInput limitMaxLength={true} addInternationalOption={false} defaultCountry="MA" flagUrl='./Images/Flags/{XX}.svg' value={phone} onChange={setPhone} name='phone' />
                                        <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email Address" />
                                        <select id="country" name="country" onChange={(e) => setCountry(e.target.value)} value={country}>
                                            <option>select country</option>
                                            <option value="AF">Afghanistan</option>
                                            <option value="AX">Aland Islands</option>
                                            <option value="AL">Albania</option>
                                            <option value="DZ">Algeria</option>
                                            <option value="AS">American Samoa</option>
                                            <option value="AD">Andorra</option>
                                            <option value="AO">Angola</option>
                                            <option value="AI">Anguilla</option>
                                            <option value="AQ">Antarctica</option>
                                            <option value="AG">Antigua and Barbuda</option>
                                            <option value="AR">Argentina</option>
                                            <option value="AM">Armenia</option>
                                            <option value="AW">Aruba</option>
                                            <option value="AU">Australia</option>
                                            <option value="AT">Austria</option>
                                            <option value="AZ">Azerbaijan</option>
                                            <option value="BS">Bahamas</option>
                                            <option value="BH">Bahrain</option>
                                            <option value="BD">Bangladesh</option>
                                            <option value="BB">Barbados</option>
                                            <option value="BY">Belarus</option>
                                            <option value="BE">Belgium</option>
                                            <option value="BZ">Belize</option>
                                            <option value="BJ">Benin</option>
                                            <option value="BM">Bermuda</option>
                                            <option value="BT">Bhutan</option>
                                            <option value="BO">Bolivia</option>
                                            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                            <option value="BA">Bosnia and Herzegovina</option>
                                            <option value="BW">Botswana</option>
                                            <option value="BV">Bouvet Island</option>
                                            <option value="BR">Brazil</option>
                                            <option value="IO">British Indian Ocean Territory</option>
                                            <option value="BN">Brunei Darussalam</option>
                                            <option value="BG">Bulgaria</option>
                                            <option value="BF">Burkina Faso</option>
                                            <option value="BI">Burundi</option>
                                            <option value="KH">Cambodia</option>
                                            <option value="CM">Cameroon</option>
                                            <option value="CA">Canada</option>
                                            <option value="CV">Cape Verde</option>
                                            <option value="KY">Cayman Islands</option>
                                            <option value="CF">Central African Republic</option>
                                            <option value="TD">Chad</option>
                                            <option value="CL">Chile</option>
                                            <option value="CN">China</option>
                                            <option value="CX">Christmas Island</option>
                                            <option value="CC">Cocos (Keeling) Islands</option>
                                            <option value="CO">Colombia</option>
                                            <option value="KM">Comoros</option>
                                            <option value="CG">Congo</option>
                                            <option value="CD">Congo, Democratic Republic of the Congo</option>
                                            <option value="CK">Cook Islands</option>
                                            <option value="CR">Costa Rica</option>
                                            <option value="CI">Cote D'Ivoire</option>
                                            <option value="HR">Croatia</option>
                                            <option value="CU">Cuba</option>
                                            <option value="CW">Curacao</option>
                                            <option value="CY">Cyprus</option>
                                            <option value="CZ">Czech Republic</option>
                                            <option value="DK">Denmark</option>
                                            <option value="DJ">Djibouti</option>
                                            <option value="DM">Dominica</option>
                                            <option value="DO">Dominican Republic</option>
                                            <option value="EC">Ecuador</option>
                                            <option value="EG">Egypt</option>
                                            <option value="SV">El Salvador</option>
                                            <option value="GQ">Equatorial Guinea</option>
                                            <option value="ER">Eritrea</option>
                                            <option value="EE">Estonia</option>
                                            <option value="ET">Ethiopia</option>
                                            <option value="FK">Falkland Islands (Malvinas)</option>
                                            <option value="FO">Faroe Islands</option>
                                            <option value="FJ">Fiji</option>
                                            <option value="FI">Finland</option>
                                            <option value="FR">France</option>
                                            <option value="GF">French Guiana</option>
                                            <option value="PF">French Polynesia</option>
                                            <option value="TF">French Southern Territories</option>
                                            <option value="GA">Gabon</option>
                                            <option value="GM">Gambia</option>
                                            <option value="GE">Georgia</option>
                                            <option value="DE">Germany</option>
                                            <option value="GH">Ghana</option>
                                            <option value="GI">Gibraltar</option>
                                            <option value="GR">Greece</option>
                                            <option value="GL">Greenland</option>
                                            <option value="GD">Grenada</option>
                                            <option value="GP">Guadeloupe</option>
                                            <option value="GU">Guam</option>
                                            <option value="GT">Guatemala</option>
                                            <option value="GG">Guernsey</option>
                                            <option value="GN">Guinea</option>
                                            <option value="GW">Guinea-Bissau</option>
                                            <option value="GY">Guyana</option>
                                            <option value="HT">Haiti</option>
                                            <option value="HM">Heard Island and Mcdonald Islands</option>
                                            <option value="VA">Holy See (Vatican City State)</option>
                                            <option value="HN">Honduras</option>
                                            <option value="HK">Hong Kong</option>
                                            <option value="HU">Hungary</option>
                                            <option value="IS">Iceland</option>
                                            <option value="IN">India</option>
                                            <option value="ID">Indonesia</option>
                                            <option value="IR">Iran, Islamic Republic of</option>
                                            <option value="IQ">Iraq</option>
                                            <option value="IE">Ireland</option>
                                            <option value="IM">Isle of Man</option>
                                            <option value="IL">Israel</option>
                                            <option value="IT">Italy</option>
                                            <option value="JM">Jamaica</option>
                                            <option value="JP">Japan</option>
                                            <option value="JE">Jersey</option>
                                            <option value="JO">Jordan</option>
                                            <option value="KZ">Kazakhstan</option>
                                            <option value="KE">Kenya</option>
                                            <option value="KI">Kiribati</option>
                                            <option value="KP">Korea, Democratic People's Republic of</option>
                                            <option value="KR">Korea, Republic of</option>
                                            <option value="XK">Kosovo</option>
                                            <option value="KW">Kuwait</option>
                                            <option value="KG">Kyrgyzstan</option>
                                            <option value="LA">Lao People's Democratic Republic</option>
                                            <option value="LV">Latvia</option>
                                            <option value="LB">Lebanon</option>
                                            <option value="LS">Lesotho</option>
                                            <option value="LR">Liberia</option>
                                            <option value="LY">Libyan Arab Jamahiriya</option>
                                            <option value="LI">Liechtenstein</option>
                                            <option value="LT">Lithuania</option>
                                            <option value="LU">Luxembourg</option>
                                            <option value="MO">Macao</option>
                                            <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                                            <option value="MG">Madagascar</option>
                                            <option value="MW">Malawi</option>
                                            <option value="MY">Malaysia</option>
                                            <option value="MV">Maldives</option>
                                            <option value="ML">Mali</option>
                                            <option value="MT">Malta</option>
                                            <option value="MH">Marshall Islands</option>
                                            <option value="MQ">Martinique</option>
                                            <option value="MR">Mauritania</option>
                                            <option value="MU">Mauritius</option>
                                            <option value="YT">Mayotte</option>
                                            <option value="MX">Mexico</option>
                                            <option value="FM">Micronesia, Federated States of</option>
                                            <option value="MD">Moldova, Republic of</option>
                                            <option value="MC">Monaco</option>
                                            <option value="MN">Mongolia</option>
                                            <option value="ME">Montenegro</option>
                                            <option value="MS">Montserrat</option>
                                            <option value="MA">Morocco</option>
                                            <option value="MZ">Mozambique</option>
                                            <option value="MM">Myanmar</option>
                                            <option value="NA">Namibia</option>
                                            <option value="NR">Nauru</option>
                                            <option value="NP">Nepal</option>
                                            <option value="NL">Netherlands</option>
                                            <option value="AN">Netherlands Antilles</option>
                                            <option value="NC">New Caledonia</option>
                                            <option value="NZ">New Zealand</option>
                                            <option value="NI">Nicaragua</option>
                                            <option value="NE">Niger</option>
                                            <option value="NG">Nigeria</option>
                                            <option value="NU">Niue</option>
                                            <option value="NF">Norfolk Island</option>
                                            <option value="MP">Northern Mariana Islands</option>
                                            <option value="NO">Norway</option>
                                            <option value="OM">Oman</option>
                                            <option value="PK">Pakistan</option>
                                            <option value="PW">Palau</option>
                                            <option value="PS">Palestinian Territory, Occupied</option>
                                            <option value="PA">Panama</option>
                                            <option value="PG">Papua New Guinea</option>
                                            <option value="PY">Paraguay</option>
                                            <option value="PE">Peru</option>
                                            <option value="PH">Philippines</option>
                                            <option value="PN">Pitcairn</option>
                                            <option value="PL">Poland</option>
                                            <option value="PT">Portugal</option>
                                            <option value="PR">Puerto Rico</option>
                                            <option value="QA">Qatar</option>
                                            <option value="RE">Reunion</option>
                                            <option value="RO">Romania</option>
                                            <option value="RU">Russian Federation</option>
                                            <option value="RW">Rwanda</option>
                                            <option value="BL">Saint Barthelemy</option>
                                            <option value="SH">Saint Helena</option>
                                            <option value="KN">Saint Kitts and Nevis</option>
                                            <option value="LC">Saint Lucia</option>
                                            <option value="MF">Saint Martin</option>
                                            <option value="PM">Saint Pierre and Miquelon</option>
                                            <option value="VC">Saint Vincent and the Grenadines</option>
                                            <option value="WS">Samoa</option>
                                            <option value="SM">San Marino</option>
                                            <option value="ST">Sao Tome and Principe</option>
                                            <option value="SA">Saudi Arabia</option>
                                            <option value="SN">Senegal</option>
                                            <option value="RS">Serbia</option>
                                            <option value="CS">Serbia and Montenegro</option>
                                            <option value="SC">Seychelles</option>
                                            <option value="SL">Sierra Leone</option>
                                            <option value="SG">Singapore</option>
                                            <option value="SX">Sint Maarten</option>
                                            <option value="SK">Slovakia</option>
                                            <option value="SI">Slovenia</option>
                                            <option value="SB">Solomon Islands</option>
                                            <option value="SO">Somalia</option>
                                            <option value="ZA">South Africa</option>
                                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                                            <option value="SS">South Sudan</option>
                                            <option value="ES">Spain</option>
                                            <option value="LK">Sri Lanka</option>
                                            <option value="SD">Sudan</option>
                                            <option value="SR">Suriname</option>
                                            <option value="SJ">Svalbard and Jan Mayen</option>
                                            <option value="SZ">Swaziland</option>
                                            <option value="SE">Sweden</option>
                                            <option value="CH">Switzerland</option>
                                            <option value="SY">Syrian Arab Republic</option>
                                            <option value="TW">Taiwan, Province of China</option>
                                            <option value="TJ">Tajikistan</option>
                                            <option value="TZ">Tanzania, United Republic of</option>
                                            <option value="TH">Thailand</option>
                                            <option value="TL">Timor-Leste</option>
                                            <option value="TG">Togo</option>
                                            <option value="TK">Tokelau</option>
                                            <option value="TO">Tonga</option>
                                            <option value="TT">Trinidad and Tobago</option>
                                            <option value="TN">Tunisia</option>
                                            <option value="TR">Turkey</option>
                                            <option value="TM">Turkmenistan</option>
                                            <option value="TC">Turks and Caicos Islands</option>
                                            <option value="TV">Tuvalu</option>
                                            <option value="UG">Uganda</option>
                                            <option value="UA">Ukraine</option>
                                            <option value="AE">United Arab Emirates</option>
                                            <option value="GB">United Kingdom</option>
                                            <option value="US">United States</option>
                                            <option value="UM">United States Minor Outlying Islands</option>
                                            <option value="UY">Uruguay</option>
                                            <option value="UZ">Uzbekistan</option>
                                            <option value="VU">Vanuatu</option>
                                            <option value="VE">Venezuela</option>
                                            <option value="VN">Viet Nam</option>
                                            <option value="VG">Virgin Islands, British</option>
                                            <option value="VI">Virgin Islands, U.s.</option>
                                            <option value="WF">Wallis and Futuna</option>
                                            <option value="EH">Western Sahara</option>
                                            <option value="YE">Yemen</option>
                                            <option value="ZM">Zambia</option>
                                            <option value="ZW">Zimbabwe</option>
                                        </select>
                                        <input type="text" name='city' onChange={(e) => setCity(e.target.value)} value={city} placeholder="City" />
                                        <input type="text" name='zip' onChange={(e) => setZipCode(e.target.value)} value={zipCode} placeholder="Zip Code" />


                                        <button className='button-check'>Check Out</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className='pay-with-card'>
                            <button onClick={e => setHandleShow('card')} className={paymentMethods === 'card' ? 'select-div-pay' : 'selected-div-pay'}>
                                <h4>Credit Or Debit Card</h4> <img src={CreditCards} alt="credit-cards-png" />
                            </button>

                            <div className={paymentMethods === 'card' ? 'show-method' : 'hide-method'}>
                                <CreditCardForm websiteData={websiteData} />
                            </div>
                        </div>
                        <div className="pay-with-paypal">
                            <button onClick={paypalCheckout} className={paymentMethods === 'paypal' ? 'select-div-pay' : 'selected-div-pay'}>
                                <h4>PayPal</h4> <img src={PayPal} alt="payapl-png" width='40px' />
                            </button>
                        </div>
                    </div>

                    <div className='order-info-payment'>

                        <div className="section-name-head">Order Informations</div>
                        <div className='website-informations'>
                            <h5>{websiteData.website_name}</h5>

                            <img className='website-image' src={websiteData.image} alt={websiteData.website_name} />
                            <div className='website-price-container'>

                                <div className='info-holder-bet'>
                                    <h4>Website Price :</h4>
                                    <h4>{websiteData.price}$</h4>
                                </div>
                                <hr />
                                <div className='info-holder-bet'>
                                    <h4>Discount :</h4>
                                    <h4>0% (0.00$)</h4>
                                </div>

                                <hr />
                                <div className='info-holder-bet'>
                                    <h4>Fees :</h4>
                                    <h4>0% (0.00$)</h4>
                                </div>

                                <hr />
                                <div className='info-holder-bet total-price'>
                                    <h4>Total Price :</h4>
                                    <h4>{websiteData.price}$</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <Footer />
            </div >
    )
}





export default Payment