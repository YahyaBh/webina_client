import Cookies from 'js-cookie';
import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import AuthUser from '../../AuthUser';


const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const { http } = AuthUser();

    useEffect(() => {
        const pusher = new Pusher("56c79e77998c0788fbe2", {
            cluster: "eu",
            encrypted: true
        });

        const channel = pusher.subscribe("WebIna");
        channel.bind("user-message-sc", ({ message }) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();

        const messageData = new FormData();
        

        messageData.append("message", input);
        messageData.append("user_sender", Cookies.get('token'));


        http.post("/chat/message", messageData)
            .then(res => {
                if (res === 200) {
                }
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
                {messages.map((message, index) => (
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