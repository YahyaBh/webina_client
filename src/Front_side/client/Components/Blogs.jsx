import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser'
import Loading from '../../../Assets/Images/WEBINA2.png'
import Navbar from './Navbar';





const Blogs = () => {

    const { http } = AuthUser();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        http.get('/blogs')
            .then(res => {
                if (res.status === 200) {
                    setBlogs(res.data.blogs);
                    console.log(res.data.blogs);
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



                <div>
                    {blogs.length > 0 ?
                        blogs.map((blog, index) => (
                            <div className='app__blog__card' key={index}>
                                <h3>{blog.title}</h3>
                            </div>
                        )) :
                        <div>
                            <h1>No Blogs Available Now</h1>
                        </div>

                    }
                </div>
            </Fragment>
    )
}

export default Blogs