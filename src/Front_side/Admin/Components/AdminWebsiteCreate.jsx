import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthUser from '../../context/AuthUser'
import SideBar from './SideBar'
import Loading from '../../pages/Loading'
import Swal from 'sweetalert2'

const AdminWebsiteCreate = () => {

    const [loading, setLoading] = useState(true)


    const [stars, setStars] = useState(2);
    const [website_name, setWebsite_name] = useState('')
    const [website_price, setWebsite_price] = useState()
    const [website_old_price, setWebsite_old_price] = useState();
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [developing_time, setDevelopingTime] = useState('');
    const [specifications, setSpecifications] = useState('');

    const [imageValue, setImageValue] = useState(null);
    const [image, setImage] = useState(null);
    const [theme, setTheme] = useState(null);

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

        const websiteData = new FormData();

        websiteData.append('website_name' ,website_name)
        websiteData.append('description' ,description)
        websiteData.append('price' ,website_price)
        websiteData.append('image' ,image)
        websiteData.append('website_old_price' ,website_old_price)
        websiteData.append('theme' , theme)
        websiteData.append('specifications' ,specifications)
        websiteData.append('Developing_Time' , developing_time)
        websiteData.append('stars' , stars)
        websiteData.append('category' , category)

        admin_http.post('/api/admin/website/create', websiteData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
            .then((res) => {
                navigate('/admin/websites')
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message
                })
            })
    }

    const handleWebsiteImage = (e) => {
        setImageValue(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);
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
                                <img src={imageValue ? imageValue : ''} width={'100%'} alt='website_image' />
                                <div className="two">
                                    <label htmlFor="image">Choose Image</label>
                                    <input type="file" name='image' placeholder='Choose Image' onChange={handleWebsiteImage} />
                                </div>
                                <div className="two">
                                    <label htmlFor="image">Choose Theme Document</label>
                                    <input type="file" name='theme_document' placeholder='Choose Theme Document' accept='pdf , psd , fig , jam' onChange={e => setTheme(e.target.files[0])} />
                                </div>
                            </div>
                            <label htmlFor="image">Website Name</label>
                            <input type="text" name='website_name' placeholder='Website Name' onChange={e => setWebsite_name(e.target.value)} />
                            <label htmlFor="image">Description</label>
                            <textarea type="text" name='description' placeholder='Description' onChange={e => setDescription(e.target.value)} />
                            <label htmlFor="image">Category</label>
                            <input type="text" name='category' placeholder='Category' onChange={e => setCategory(e.target.value)} />
                            <div className='two-in-one'>
                                <div className="two">
                                    <label htmlFor="image">Price</label>
                                    <input type="number" name='price' placeholder='Price' onChange={e => setWebsite_price(e.target.value)} />
                                </div>
                                <div className="two">
                                    <label htmlFor="image">Old Price</label>
                                    <input type="number" name='old_price' placeholder='Old Price' onChange={e => setWebsite_old_price(e.target.value)} />
                                </div>
                            </div>
                            <label htmlFor="image">Stars</label>
                            <input type="number" name='stars' placeholder='Starts' min={1} max={5} value={stars} onChange={e => setStars(e.target.value)} />
                            <label htmlFor="image">Developing Time</label>
                            <input type="text" name='developing_Time' placeholder='Developing Time' onChange={e => setDevelopingTime(e.target.value)} />
                            <label htmlFor="image">Specifications</label>
                            <input type="text" name='specifications' placeholder='Specifications' onChange={e => setSpecifications(e.target.value)} />

                            <button type='submit'>Add Website</button>
                        </form>
                    </div>
                </div>
            </div>
    )
}

export default AdminWebsiteCreate