import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser'
import Loading from '../../../Assets/Images/WEBINA2.png'
import Navbar from './Navbar';
import moment from 'moment';




const FAQ = () => {

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        setLoading(false);

    }, [])
    return (

        loading ?
            <div className='loading-container'>
                <img src={Loading} alt="loading-web" />
            </div>
            :
            <Fragment>

                <div style={{ backgroundColor: '#000' }}>
                    <Navbar />
                </div>




                <div className="faq-container">
                    <div className="main-title">
                        <h1>Frequent Asked Questions</h1>
                    </div>
                </div>


            </Fragment>
    )
}

export default FAQ