import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AuthUser from '../../context/AuthUser';

const ChatAdminUser = () => {

    const params = useParams();

    const [sender, setSender] = useState();
    const [loading, setLoading] = useState();


    const { admin_http , getAdmin } = AuthUser();

    useEffect(() => {

        if (admin_http && getAdmin) {

            getSenderData();

        }

    })


    const getSenderData = async () => {

        const senderDataForm = new FormData();


        senderDataForm.append('admin_token', Cookies.get('admin_token'));
        senderDataForm.append('admin_id', getAdmin.id);
        senderDataForm.append('sender_token', params.token);


        admin_http.post(`/admin/chat/user`, senderDataForm)
            .then(res => {
                res.data.messages.map(message => (
                    console.log(message)
                ))
            })

    }


    return (
        <div>{params.id}</div>
    )
}

export default ChatAdminUser