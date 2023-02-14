import Pusher from 'pusher-js';
import React, { useEffect, useState } from 'react';
import AuthUser from '../../AuthUser';


const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const { http } = AuthUser();

    useEffect(() => {



        http.post("/chat/messages")
            .then(res => {
                setMessages(prevMessages => [...prevMessages, res.data.messages]);

                for(let i = 0; i < res.data.messages.length; i++) {
                    console.log(res.data.messages[i].id);
                }
                
            })

        // const pusher = new Pusher("56c79e77998c0788fbe2", {
        //     cluster: "eu",
        //     encrypted: true
        // });

        // const channel = pusher.subscribe("WebIna");
        // channel.bind("new-message", ({ message }) => {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // });
    }, []);


    const handleSubmit = async e => {
        e.preventDefault();



        // const messageData = new FormData();

        // messageData.append("message", input);

        // http.post("/chat/messages", messageData)
        //     .then(res => {
        //         if (res === 200) {
        //             setMessages(prevMessages => [...prevMessages, res.data.messages]);
        //         }
        //     })
        // setInput("");

    };


    return (
        <>
            <h1>Pusher Test</h1>
            <p>
                Try publishing an event to channel <code>my-channel</code>
                with event name <code>my-event</code>.
            </p>


            

            <form onSubmit={handleSubmit} >
                <input type="text" value={input} placeholder='message' onChange={e => setInput(e.target.value)} />
                <button type="submit"> SEND</button>
            </form>
        </>

    )

}



export default Chat;