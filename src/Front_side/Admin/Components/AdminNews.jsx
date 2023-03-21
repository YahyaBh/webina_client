import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Loading from '../../pages/Loading';
import SideBar from './SideBar'

const AdminNews = () => {

    const { admin_http } = AuthUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, [])


    const sendNewLetter = async () => {

        const newsForm = new FormData();
        setLoading(true);


        newsForm.append('title', title)
        newsForm.append('content', content)
        newsForm.append('subject', subject)
        newsForm.append('image', image)

        admin_http.post('/api/admin/newsletter', newsForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                navigate('/admin/dashboard', { replace: true })
            })
            .catch(err => {
                Swal.fire('error', err)
            })

    }




    return (

        loading ?
            <Loading />
            :
            <div>
                <SideBar />



                <div className="newsContienr" style={{ marginLeft: '10%' }} >

                    <h1>Create News Letter</h1>


                    <form onSubmit={sendNewLetter} >
                        <div className="form-group">
                            <input type="file" name="image" id="image" accept='image/*' onChange={e => setImage(e.target.files[0])} />
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" onChange={e => setSubject(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea className="form-control" onChange={e => setContent(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" >Send</button>
                        </div>
                    </form>

                </div>


            </div>
    )
}

export default AdminNews