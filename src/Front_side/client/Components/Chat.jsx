import Cookies from 'js-cookie';
import Pusher from 'pusher-js';
import React, { Fragment, useEffect, useState } from 'react';
import AuthUser from '../../AuthUser';
import Navbar from '../../client/Components/Navbar'
import { BiSend } from 'react-icons/bi';


const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const { http } = AuthUser();

    useEffect(() => {
        document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;

        const userData = new FormData();

        userData.append('user_id', JSON.parse(Cookies.get('user')).id);
        userData.append('user_token' , Cookies.get('token'));
        userData.append('reciever_id' , '1');

        

        http.post("/chat/messages"  , userData)
            .then(res => {
                setMessages(res.data.messages);
                document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
            })

        const pusher = new Pusher("56c79e77998c0788fbe2", {
            cluster: "eu",
            encrypted: true
        });

        const channel = pusher.subscribe("WebIna");
        channel.bind('user-message', function (data) {
            setMessages(data.message);
        });
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();



        const messageData = new FormData();

        messageData.append("message", input);
        messageData.append("user_id", JSON.parse(Cookies.get('user')).id);
        messageData.append("user_token", Cookies.get('token'));
        messageData.append("reciever_id", '1');
        

        http.post("/chat/message", messageData)
            .then(res => {
                document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
            })
        setInput("");





    };


    return (
        <Fragment>
            <div style={{ backgroundColor: '#000' }}>
                <Navbar />
            </div>


            <div className='chat-container'>

                <div className='chat-container-messages' id='messages-container'>
                    {messages?.map((message, index) => (
                        <div className={message.sender_id === JSON.parse(Cookies.get('user')).id ? 'sender_message' : 'reciever_message'} key={index + message.id}>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit} >
                    <input type="text" value={input} placeholder='message' onChange={e => setInput(e.target.value)} />
                    <button type="submit"><BiSend/></button>
                </form>
            </div>




        </Fragment>

    )

}



export default Chat;