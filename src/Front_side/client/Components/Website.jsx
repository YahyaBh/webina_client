import cookie from 'js-cookie';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import AuthUser from '../../AuthUser';
import Navbar from './Navbar';
import Loading from '../../../Assets/Images/WEBINA2.png';
import { Fragment } from 'react';
import Swal from 'sweetalert2';
import { BsImage } from 'react-icons/bs';

const Website = () => {


    // Get ID from URL
    const params = useParams();

    const { http } = AuthUser();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [fullImage, setFullImage] = useState(false);
    const [websiteData, setWebsiteData] = useState({});



    useEffect(() => {
        getWebsite()
    }, [])



    const getWebsite = async () => {
        await http.get(`/website/${params.token}`)
            .then(res => {
                setWebsiteData(res.data.website);
            })

        setUserData(JSON.parse(cookie.get('user')));
        setLoading(false)

    }

    const showFullImage = () => {
        if (!fullImage) {
            setFullImage(true);

            Swal.fire({
                imageUrl: `${websiteData.full_image ? websiteData.full_image : websiteData.image}`,
                imageHeight: '100%',
                imageWidth: '100%',
                imageAlt: `${websiteData.website_name}`,
                confirmButtonText: 'Close',
                confirmButtonColor: '#000',
            }).then(function (isConfirm) {
                if (isConfirm) {
                    setFullImage(false);
                }
            });
        } else {
            setFullImage(false);
        }
    }

    return (
        loading ?
            <div className='loading-container'>
                < img src={Loading} alt="loading-web" />
            </div >
            :
            <Fragment>
                <div style={{ backgroundColor: 'rgb(var(--heavy-color))' }}>
                    <Navbar userData={userData} />
                </div>



                <header className="app__signle__website__header">
                    <div onClick={showFullImage} className="app__signle__website__image__container">
                        <div className='image__data'>
                            <BsImage />
                            <h5>Show Full Image</h5>
                        </div>
                        <img  src={websiteData.image} alt={websiteData.website_name} />
                    </div>
                </header>
            </Fragment>
    )
}

export default Website