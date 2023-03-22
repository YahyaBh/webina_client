import React, { useEffect, useState } from 'react'
import Loading from '../../pages/Loading'
import SideBar from './SideBar'

const AdminBlogs = () => {

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])

    return (
        loading ?
            <Loading />
            :
            <div>


            <SideBar/>


            <div className='app__admin__blogs'>

            </div>


            </div>
    )
}

export default AdminBlogs