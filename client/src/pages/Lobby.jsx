import {useState, useEffect} from 'react'
import Chat from "../components/Chat"
import NamePopup from "../components/NamePopup"
import { socket } from '../socket';
import { useParams } from "react-router";

export default function Lobby() {
  const [link, setLink] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [users, setUsers] = useState([])
  const [userHasName, setUserHasName] = useState(false)
  const {roomId} = useParams();



  const copyToClipboard = (e) => {
    async function copyPageUrl() {
      try {
        await navigator.clipboard.writeText(link);
        console.log('Page URL copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
    copyPageUrl().then(() => {e.target.innerHTML = "Copied!"})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue)
    if (!inputValue) {
      setInputValue(`Guest ${new Date().getMilliseconds()}`)
    }
    setUserHasName(true)
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
    socket.on("join", (user) => {setUsers([...users, user])})
    return () => {
      socket.off("join")
    }
  },[users])

  useEffect(() => {
    if (userHasName) {
      setLink(`http://localhost:5173/lobby/${roomId}`)
      socket.connect();
      socket.username = inputValue;
      console.log("socket.username:", socket.username)
      socket.emit('join', roomId, inputValue, (roomUsers) => {
        console.log("roomSocketIds, socket.id:", roomUsers, socket.id)
        setUsers(u => [...u, ...roomUsers])
      });
      return () => {
        socket.emit('leave', roomId)
        socket.disconnect();
      }
    }
  }, [userHasName])

  return(
    <div className="create-game page-wrap">
      <header className="center">Tetris Game</header>
      <div className="content-wrap">
        <div className="chat-container" >
          <Chat chatMessages={chatMessages}/>
        </div>
        <main className="center" >
          <div className="lobby-container" >
            <input type="text" id="display" value={link} readOnly></input>
            <button id="create" onClick={copyToClipboard}>Copy!</button>
          </div>
        </main>
        <div>
          <h4>Users:</h4>
          <ul id='users'>{users.map((message, i) => <li key={i}>{Object.keys(message)[0]}</li>)}</ul>
        </div>
      </div>
      <footer className="center">Wee-woo!</footer>
      <NamePopup handleSubmit={handleSubmit} handleChange={handleChange}/>
    </div>
  )
}