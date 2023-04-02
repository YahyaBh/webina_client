import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md';
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



    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newTempImage, setNewTempImage] = useState('');
    const [newLink, setNewLink] = useState('');

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


    const createBlogs = async (e) => {
e.preventDefault();
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

    const editBlogs = async (e) => {

        const blogForm = new FormData();

        blogForm.append('title', newTitle)
        blogForm.append('description', newDescription)
        blogForm.append('image', newImage)
        blogForm.append('link', newLink)

        setLoading(true);

        await admin_http.post(`/api/admin/blogs/update/${e.id}`, blogForm, {
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

    const deleteBlogs = async (e) => {

        setLoading(true);

        await admin_http.post(`/api/admin/blogs/delete/${e.id}`)
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

                                    <span>{blog.created_at ? moment(blog?.created_at?.split('T')[0] + ' ' + blog?.created_at?.split('T')[1].slice(0, 8), "YYYY-MM-DD hh:mm:ss").fromNow() : '' }</span>

                                    <div>
                                        <MdEdit onClick={editBlogs(blog)} />
                                        <MdDelete onClick={deleteBlogs(blog)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div className='blogs__new__blog'>
                        <form onSubmit={e => createBlogs(e)}>

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