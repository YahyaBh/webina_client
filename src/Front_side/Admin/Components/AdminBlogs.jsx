import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser';
import Loading from '../../pages/Loading'
import SideBar from './SideBar'

const AdminBlogs = () => {

    const [loading, setLoading] = useState(true);

    const [blogs, setBlogs] = useState([]);

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

    return (
        loading ?
            <Loading />
            :
            <div>


                <SideBar />


                <div className='app__admin__blogs'>
                    <div className="blogs__sidebar__scroll">


                    </div>


                </div>


            </div>
    )
}

export default AdminBlogs