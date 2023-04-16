import { Fragment, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser'
import Loading from '../../../Assets/Images/WEBINA2.png'
import Navbar from './Navbar';
import moment from 'moment';




const Announcements = () => {

    const { http } = AuthUser();
    const [announcments, setAnnouncments] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        http.get('/api/announcements')
            .then(res => {
                if (res.status === 200) {
                    setAnnouncments(res.data.announcements);
                    setLoading(false);
                } else {
                    Swal.fire({
                        title: 'Oops...',
                        icon: 'error',
                        text: 'Sorry , something went wrong!',
                    })
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })

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



                <div className='app__blog__cards__container'>
                    {announcments.length > 0 ?
                        announcments.map((blog, index) => (
                            <div className='app__blog__card' key={index}>
                                <h3>{blog.title}</h3>
                                <img src={`http://localhost:8000/uploads/announcements/images/${blog.image}`} alt={blog.title} />
                                <p>{blog.body}</p>
                                <p style={{ color: 'grey' }}>{blog.created_at ? moment(blog.created_at.split('T')[0] + ' ' + blog.created_at.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : ''}</p>
                            </div>
                        )) :
                        <div>
                            <h1 style={{ fontFamily : 'Louis-Bold'}}>No announcements Available Now</h1>
                        </div>
                    }
                </div>
            </Fragment>
    )
}

export default Announcements