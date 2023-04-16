import { Fragment, useEffect, useState } from 'react';
import Loading from '../../../Assets/Images/WEBINA2.png'
import Navbar from './Navbar';
import { AiOutlinePlus } from 'react-icons/ai';




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

                    <div className='section-faq-container'>
                        <h3>Services</h3>


                        <div className='questions-contianer'>


                            <div className="question-container">
                                <div className="header-question">
                                    <AiOutlinePlus/>
                                    <h4>What services do you offer?</h4>
                                </div>

                                <div className="body-question">
                                    <p>WebIna I</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div className="header-question">
                                    <AiOutlinePlus/>
                                    <h4>What services do you offer?</h4>
                                </div>

                                <div className="body-question">
                                    <p>WebIna I</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div className="header-question">
                                    <AiOutlinePlus/>
                                    <h4>What services do you offer?</h4>
                                </div>

                                <div className="body-question">
                                    <p>WebIna I</p>
                                </div>

                            </div>

                            <div className="question-container">
                                <div className="header-question">
                                    <AiOutlinePlus/>
                                    <h4>What services do you offer?</h4>
                                </div>

                                <div className="body-question">
                                    <p>WebIna I</p>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>


            </Fragment>
    )
}

export default FAQ