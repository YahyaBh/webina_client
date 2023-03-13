import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'
import Loading from '../../pages/Loading'
import Swal from 'sweetalert2'

const AdminWebsiteCreate = () => {

    const [loading, setLoading] = useState(true)


    const { getAdmin, admin_http, accessToken } = AuthUser();

    const navigate = useNavigate();

    useEffect(() => {
        if (getAdmin && accessToken) {
            setLoading(false);
        } else {
            navigate('/signin', { replace: true })
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();


        admin_http.post('/api/admin/website/create', {})
            .then((res) => {

            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                })
            })
    }

    return (
        loading ?
            <Loading />
            :
            <div>
                <SideBar />


                <div className="website__create__container">
                    <div className='website__create__form__container'>
                        <form className='website__create__form' onSubmit={handleSubmit}>
                            <div className='two-in-one'>
                                <div className="two">
                                    <label htmlFor="image">Choose Image</label>
                                    <input type="file"  name='image' placeholder='Choose Image' />
                                </div>
                                <div className="two">
                                    <label htmlFor="image">Choose Theme Document</label>
                                    <input type="file" name='theme_document' placeholder='Choose Theme Document' />
                                </div>
                            </div>
                            <label htmlFor="image">Website Name</label>
                            <input type="text" name='website_name' placeholder='Website Name' />
                            <label htmlFor="image">Description</label>
                            <textarea type="text" name='description' placeholder='Description' />
                            <label htmlFor="image">Category</label>
                            <input type="text" name='category' placeholder='Category' />
                            <div className='two-in-one'>
                                <div className="two">
                                    <label htmlFor="image">Price</label>
                                    <input type="number" name='price' placeholder='Price' />
                                </div>
                                <div className="two">
                                    <label htmlFor="image">Old Price</label>
                                    <input type="number" name='old_price' placeholder='Old Price' />
                                </div>
                            </div>
                            <label htmlFor="image">Stars</label>
                            <input type="number" name='stars' placeholder='Starts' min={1} max={5} value={2} />
                            <label htmlFor="image">Developing Time</label>
                            <input type="text" name='developing_Time' placeholder='Developing Time' />
                            <label htmlFor="image">Specifications</label>
                            <input type="text" name='specifications' placeholder='Specifications' />

                            <button type='submit'>Add Website</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default AdminWebsiteCreate