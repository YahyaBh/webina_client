import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Loading from '../../pages/Loading'
import SideBar from './SideBar'

const AdminBlogs = () => {

    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState([]);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [tempImage, setTempImage] = useState('');
    const [link, setLink] = useState('');

    const navigate = useNavigate();

    const { admin_http } = AuthUser();

    useEffect(() => {
        getBlogs();
    }, [])


    const getBlogs = async () => {
        await admin_http(`/api/admin/blogs`)
            .then(res => {
                setBlogs(res.data.blogs)
                setLoading(false);
            })
            .catch(err => {
                Swal.fire('error', err.message)
                setTimeout(() => {
                    navigate('/admin/dashboard', { replace: true })
                }, 3000);
            })
    }


    const createBlogs = async () => {
        const blogForm = new FormData();


        blogForm.append('title', title)
        blogForm.append('description', description)
        blogForm.append('image', image)
        blogForm.append('link', link)

        setLoading(true);

        await admin_http.post(`/api/admin/blogs/create`, blogForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(
                res => {
                    Swal.fire('success', res.data.message)
                    setLoading(false);
                    getBlogs();
                }
            )
            .catch(err => {
                Swal.fire('error', err.message)
                setTimeout(() => {
                    navigate('/admin/dashboard', { replace: true })
                }, 3000);
            })

    }


    const changeImage = (e) => {
        setImage(e);
        setTempImage(URL.createObjectURL(e));
    }

    return (
        loading ?
            <Loading />
            :
            <div>


                <SideBar />


                <div className='app__admin__blogs'>
                    <div className="blogs__sidebar__scroll">
                        {blogs?.map((blog, index) => (
                            <div className="blog" key={index}>
                                <img src={`http://localhost:8000/uploads/blogs/images/${blog.image}`} alt={blog.title} />

                                <div className="details">
                                    <h2>{blog.title}</h2>
                                    <p>{blog.body}</p>

                                    <span>{blog.created_at}</span>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div className='blogs__new__blog'>
                        <form onSubmit={createBlogs}>

                            <img src={tempImage} alt="" />
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder="Title" name="title" id="title" onChange={e => setTitle(e.target.value)} />
                            <label htmlFor="description">Description</label>
                            <input type="text" placeholder="Description" name="description" id="description" onChange={e => setDescription(e.target.value)} />
                            <label htmlFor="image">Image</label>
                            <input type="file" accept='image/*' name="image" id="image" multiple={false} onChange={e => changeImage(e.target.files[0])} />


                            <button type='submit'>CREATE BLOG</button>
                        </form>
                    </div>


                </div>


            </div>
    )
}

export default AdminBlogs