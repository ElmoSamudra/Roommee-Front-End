import React, { useState, useEffect } from "react";
import queryString from 'query-string'
import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../components/Message'

let socket;
function Chat({ location }) {

    
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'localhost:3000'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)
        console.log(socket)

        socket.emit('join', { name:name, room:room }, () =>{})

        return () => {
            socket.emit('disconnect')

            socket.off()
        }
    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => {setMessage('')})
        }
    }
    console.log(message, messages);

  return (
    <div>
        <div>
            Logs
        </div>
        <div>
            <ScrollToBottom>
                {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
            </ScrollToBottom>
        </div>
        <div>
            <input value={message} placeholder="message here" 
                onChange={(event) => {setMessage(event.target.value)}} 
                onKeyPress={event => event.key === "Enter" ? sendMessage(event) : null}
            />
            <button onClick={(event) => sendMessage(event)}>Enter</button>
        </div>
    </div>
  );
}

export default Chat;