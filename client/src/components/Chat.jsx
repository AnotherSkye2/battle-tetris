import { socket } from '../socket';
import {useState, useEffect} from 'react'


export default function Chat() {
    const [inputValue, setInputValue] = useState("")
    const [chatMessages, setChatMessages] = useState([])
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(inputValue)
      if (inputValue) {
        socket.emit('chat message', inputValue);
        setInputValue("");
      }
      document.getElementById("input").value = ''
    }

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    
    useEffect(() => {
        socket.on('chat message', function(msg) {
            setChatMessages([...chatMessages, msg]);
            window.scrollTo(0, document.body.scrollHeight);
        });
        return () => {
            socket.off("chat message")
        }
    }, [chatMessages])


    return ( <>
      <ul id="messages" >{chatMessages.map((message) => <li>{message}</li>)}</ul>
      <form id="form" onSubmit={handleSubmit} >
      <input id="input" autoComplete="off" onChange={handleChange}/><button type="submit">Send</button>
      </form>
    </> 
    )
}