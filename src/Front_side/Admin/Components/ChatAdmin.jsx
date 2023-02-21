import Pusher from 'pusher-js';
import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../context/AuthUser'
import Loading from '../../pages/Loading';
import SideBar from './SideBar';
import { BiSend } from 'react-icons/bi';

const ChatAdmin = () => {

    const [loading, setLoading] = useState(true);
    const [chatNames, setChatNames] = useState([]);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const { admin_http, admin } = AuthUser();
    const navigate = useNavigate();


    useEffect(() => {

        if (admin) {

            document.getElementsByClassName('chat-container-messages').scrollTop = document.getElementsByClassName('chat-container-messages').scrollHeight;

            const userData = new FormData();

            userData.append('user_id', admin.id);
            userData.append('reciever_id', 2);

            admin_http.post("/api/chat/messages", userData)
                .then(res => {
                    setMessages(res.data.messages);
                    setLoading(false);
                    document.getElementsByClassName('chat-container-messages').scrollTop = document.getElementsByClassName('chat-container-messages').scrollHeight;
                })

            const pusher = new Pusher("0b92bbc5466ff479ab62", {
                cluster: "eu",
                encrypted: true
            });

            const channel = pusher.subscribe("WebIna");
            channel.bind('user-message', function (data) {
                setMessages(data.message);
            });

        } else {
            navigate('/signin', { replace: true });
        }
    }, []);


    const handleSubmit = async e => {
        if (input.length > 0) {
            e.preventDefault();


            const messageData = new FormData();

            messageData.append("message", input);
            messageData.append("user_id", admin.id);
            messageData.append("reciever_id", 2);

            setInput("");

            admin_http.post("/api/chat/message", messageData)
                .then(res => {
                    document.getElementsByClassName('chat-container-messages').scrollTop = document.getElementsByClassName('chat-container-messages').scrollHeight;
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                })


        } else {
            Swal.fire({
                icon: 'info',
                text: 'Please enter a message',
                title: 'Oops...',
            })
        }


    };

    return (
        loading ?
            <Loading />
            :
            <Fragment>

                <SideBar />

                <div className="app__chat__admin">

                    <div className='chat-admin-container'>

                        <div className='chat-container-messages'>
                            {messages?.map((message, index) => (
                                <div className={message.sender_id === admin.id ? 'sender_message' : 'reciever_message'} key={index + message.id}>
                                    <p>{message.message}</p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit} >
                            <input type="text" value={input} placeholder='message' onChange={e => setInput(e.target.value)} />
                            <button type="submit"><BiSend /></button>
                        </form>
                    </div>
                </div>
            </Fragment>
    )
}

export default ChatAdmin