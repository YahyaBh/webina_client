import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'

const AdminContact = () => {

    const [loading, setLoading] = useState(true)
    const [contacts, setContacts] = useState([])

    const navigate = useNavigate()

    const { admin_http } = AuthUser

    useEffect(() => {
        getContact();
    }, [])


    const getContact = async () => {

        admin_http.get('/api/admin/contact')
            .then(res => {
                setContacts(res.data.contacts)
                setLoading(false)
            })
            .catch(err => {
                Swal.fire('error', err)
                navigate('/admin/dashboard', { replace: true })
            })

    }

    return (
        <div>
            <SideBar />


            <div className='app__contact__container'>

                <h2>Contact Messages</h2>


                {contacts?.map((contact, index) => (
                    <div className='contact_card' key={index}>
                        <h4>{contact.name}</h4>
                        <p>{contact.message}</p>
                        <span>{contact.created_at}</span>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default AdminContact