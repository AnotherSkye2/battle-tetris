import { socket } from '../socket';
import {useState, useEffect} from 'react'
import { useParams } from "react-router";

export default function Chat() {
  const [inputValue, setInputValue] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const {roomId} = useParams();
  
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
      console.log(msg)
        setChatMessages([...chatMessages, msg]);
        window.scrollTo(0, document.body.scrollHeight);
    });
    return () => {
        socket.off("chat message")
    }
  }, [chatMessages])
  
  useEffect(() => {
    socket.connect();
    socket.emit('join', roomId);
    return () => {
      socket.emit('leave', roomId)
      socket.disconnect();
    }
  }, [])


  return ( <>
    <ul id="messages" >{chatMessages.map((message, i) => <li key={i}>{message}</li>)}</ul>
    <form id="form" onSubmit={handleSubmit} >
    <input id="input" autoComplete="off" onChange={handleChange}/><button type="submit">Send</button>
    </form>
  </> 
  )
}