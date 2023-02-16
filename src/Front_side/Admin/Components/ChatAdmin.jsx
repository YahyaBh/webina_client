import Cookies from 'js-cookie';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthUser from '../../AuthUser'
import SideBar from './SideBar';

const ChatAdmin = () => {

    const [loading, setLoading] = useState(true);
    const [chatNames, setChatNames] = useState([]);

    const { admin_http } = AuthUser();
    const navigate = useNavigate();


    useEffect(() => {

        if (Cookies.get('admin_token') && Cookies.get('admin')) {
            getAdminChat();
            setLoading(false);
        } else {
            navigate('/signin')
        }

    }, [])

    const getAdminChat = async () => {

        const chatData = new FormData();

        chatData.append('admin_id', JSON.parse(Cookies.get('admin')).id);
        chatData.append('admin_token', Cookies.get('admin_token'));

        await admin_http.post('/admin/chat', chatData)
            .then(res => {
                setChatNames(res.data.chatNames);
                setLoading(false);
            })
    }

    return (
        loading ?
            <div>
                Loading....
            </div>
            :
            <Fragment>

                <SideBar />

                <div className='chat-container-main'>
                    <ul>
                        {chatNames.map((chatName, index) => (
                            <li key={index + chatName.id}><a href={`/admin/chat/${chatName.id}`}>{chatName.full_name}</a></li>
                        ))}
                    </ul>
                </div>


            </Fragment>
    )
}

export default ChatAdmin