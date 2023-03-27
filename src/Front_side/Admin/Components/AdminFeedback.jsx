import React, { useEffect, useState } from 'react'
import AuthUser from '../../context/AuthUser';
import SideBar from './SideBar'

const AdminFeedback = () => {


    const [feedbacks, setFeedbacks] = useState();

    const { admin_http } = AuthUser();


    useEffect(() => {

    }, [])


    const getFeedbacks = async () => {

        await admin_http.get('/api/admin/feedbacks')
            .then(res => {
                setFeedbacks(res.data)
            })


    }

    return (
        <div>


            <SideBar />




            <div className="app__feedback__container">

            </div>

        </div>
    )
}

export default AdminFeedback