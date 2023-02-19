import React from 'react'
import LoadingImage from '../../Assets/Images/WEBINA2.png'

const Loading = () => {
    return (
        <div className='loading-container'>
            <img src={LoadingImage} alt="loading-web" />
        </div>
    )
}

export default Loading