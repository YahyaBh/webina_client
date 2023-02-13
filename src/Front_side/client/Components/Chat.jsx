import Cookies from 'js-cookie';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthUser from '../../AuthUser';


const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const { http } = AuthUser();

    const navigate = useNavigate();


    useEffect(() => {

        if (Cookies.get('token')) {

            const userData = new FormData();

            userData.append('user_id', JSON.parse(Cookies.get('user')).id);
            userData.append('user_token', Cookies.get('token'));

            http.post('/chat/messages', userData)
                .then(res => {
                    setMessages(prevMessages => [...prevMessages, res.data.message]);
                    console.log(res);
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        text: err.message,
                        title: 'Oops...',
                    })
                })

            const pusher = new Pusher("56c79e77998c0788fbe2", {
                cluster: "eu",
                encrypted: true
            });

            const channel = pusher.subscribe("WebIna");
            channel.bind("user-message-sc", ({ message }) => {
                setMessages(prevMessages => [...prevMessages, message]);
            });
        } else {
            Swal.fire({
                icon : 'info',
                title : 'Please Login',
                text : 'You need to login first , in order to continue'
            });
            navigate('/');
        }

        
        
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();

        const messageData = new FormData();


        messageData.append("message", input);
        messageData.append("user_id", JSON.parse(Cookies.get('user')).id);
        messageData.append("user_token", Cookies.get('token'));
        messageData.append("receiver_id", '1');



        http.post("/chat/message", messageData)
        .then(res => {
            setMessages(prevMessages => [...prevMessages, res.data.message]);
        })
        setInput("");

    };


    return (
        <>
            <h1>Pusher Test</h1>
            <p>
                Try publishing an event to channel <code>my-channel</code>
                with event name <code>my-event</code>.
            </p>


            <div>
                {messages?.map((message, index) => (
                    <h3 key={index}>{message}</h3>
                ))}
            </div>

            <form onSubmit={handleSubmit} >
                <input type="text" value={input} placeholder='message' onChange={e => setInput(e.target.value)} />
                <button type="submit"> SEND</button>
            </form>
        </>

    )

}



export default Chat;