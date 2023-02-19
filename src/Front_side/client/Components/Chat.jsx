import Cookies from 'js-cookie';
import Pusher from 'pusher-js';
import { Fragment, useEffect, useState } from 'react';
import AuthUser from '../../context/AuthUser';
import Navbar from '../../client/Components/Navbar'
import { BiSend } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Chat = () => {


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const { sec_http, getUser, user } = AuthUser();

    const navigate = useNavigate();


    useEffect(() => {

        if (getUser) {

            document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;

            const userData = new FormData();

            userData.append('user_id', user.id);
            userData.append('reciever_id', '1');

            sec_http.post("/api/chat/messages", userData)
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

        } else {
            navigate('/signin', { replace: true });
        }
    }, []);


    const handleSubmit = async e => {
        if(input.length > 0) {
        
        e.preventDefault();


        const messageData = new FormData();

        messageData.append("message", input);
        messageData.append("user_id", getUser.id);
        messageData.append("reciever_id", '1');

        setInput("");

        sec_http.post("/api/chat/message", messageData)
            .then(res => {
                document.getElementById('messages-container').scrollTop = document.getElementById('messages-container').scrollHeight;
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
                icon : 'info',
                text : 'Please enter a message',
                title : 'Oops...',
            })
        }


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
                    <button type="submit"><BiSend /></button>
                </form>
            </div>




        </Fragment>

    )

}



export default Chat;