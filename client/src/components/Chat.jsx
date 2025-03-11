import { socket } from '../socket';
import {useState} from 'react'

export default function Chat({chatMessages}) {
  const [inputValue, setInputValue] = useState("")

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

  return ( 
  <div className='pixel-corners--wrapper'> 
    <div className='chat'>
      <ul id="messages" >{chatMessages.map((message, i) => <li key={i}>{message}</li>)}</ul>
      <form id="form" className='flex-center' onSubmit={handleSubmit} >
      <input id="input" className='pixel-corners micro-5-regular' autoComplete="off" onChange={handleChange}/><button type="submit" className='pixel-corners'>Send</button>
      </form>
    </div>
  </div> 
  )
}