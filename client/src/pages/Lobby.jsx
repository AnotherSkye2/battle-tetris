import {useState, useEffect} from 'react'
import Chat from "../components/Chat"
import { socket } from '../socket';
import { useParams } from "react-router";

export default function Lobby() {
  const [inputValue, setInputValue] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [socketIds, setSocketIds] = useState([])
  // const [users, setUsers] = useState([])
  const {roomId} = useParams();

  const copyToClipboard = (e) => {
    async function copyPageUrl() {
      try {
        await navigator.clipboard.writeText(inputValue);
        console.log('Page URL copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
    copyPageUrl().then(() => {e.target.innerHTML = "Copied!"})
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
    console.log("socketIds: ", socketIds)
    socket.on("join", (newSocketId) => {setSocketIds([...socketIds, newSocketId])})
  },[socketIds])

  useEffect(() => {
    setInputValue(`http://localhost:5173/lobby/${roomId}`)
    socket.connect();
    socket.emit('join', roomId, (roomSocketIds) => {
      console.log("roomSocketIds, socket.id:", roomSocketIds, socket.id)
      setSocketIds([...socketIds, ...roomSocketIds])
    });
    return () => {
      socket.emit('leave', roomId)
      socket.disconnect();
    }
  }, [])

  return(
    <div className="create-game page-wrap">
      <header className="center">Tetris Game</header>
      <div className="content-wrap">
        <div className="chat-container" >
          <Chat chatMessages={chatMessages}/>
        </div>
        <main className="center" >
          <div className="lobby-container" >
            <input type="text" id="display" value={inputValue} readOnly></input>
            <button id="create" onClick={copyToClipboard}>Copy!</button>
          </div>
        </main>
      </div>
      <footer className="center">Wee-woo!</footer>
    </div>
  )
}