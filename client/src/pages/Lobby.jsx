import {useState, useEffect} from 'react'
import Chat from "../components/Chat"
import NamePopup from "../components/NamePopup"
import { socket } from '../socket';
import { useParams } from "react-router";

export default function Lobby() {
  const [link, setLink] = useState("")
  const [userName, setUserName] = useState("")
  const [userNameInput, setUserNameInput] = useState("")
  const [userNameInputError, setUserNameInputError] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [users, setUsers] = useState([])
  const [userHasName, setUserHasName] = useState(false)
  const [isHost, setIsHost] = useState(false)
  const [open, setOpen] = useState(true)
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
    if (socket.connected === false) { socket.connect() }
    e.preventDefault();
    setOpen(false)
    console.log(socket, userName)
    socket.emit('users', roomId, (users) => {
      let userNameToCheck = userNameInput
      if (!userNameToCheck) {
        userNameToCheck = `Guest ${new Date().getMilliseconds()}`
      }
      let isUnique;
      const userNames = users.map((user) => user.name)
      userNames.includes(userNameToCheck) ? isUnique = false : isUnique = true
      console.log("userNameToCheck, users: ", userNameToCheck, userNames, isUnique)
      setOpen(!isUnique)
      if (isUnique) {
        setUserName(userNameToCheck)
      } else {
        setUserNameInputError("The name you chose is already taken!")
      }
      setUserHasName(isUnique)
      setUserNameInput("")
    })
  }

  const handleChange = (e) => {
      setUserNameInput(e.target.value)
  }

  const handleStart = () => {
    console.log("Start!")
    socket.emit('start', roomId)
  }

  useEffect(() => {
    sessionStorage.clear();
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('chat message', function(msg) {
        console.log(msg)
        setChatMessages([...chatMessages, msg]);
        window.scrollTo(0, document.body.scrollHeight);
      });
      return () => {
          socket.off("chat message")
          socket.off('start')
      }
    }
  }, [chatMessages, socket])
  
  useEffect(() => {
    if (socket) {
      console.log("users: ", users)
      if (users[0]?.name === userName) {setIsHost(true)}
      socket.on("join", (user) => {setUsers([...users, user])})
      socket.on("leave", (userToRemove) => {
        setUsers([...users.filter((user) => user.name != userToRemove.name)])
      })
      socket.on('start', (msg) => {
        console.log(msg, users)
        sessionStorage.setItem('userNames', JSON.stringify(users))
        sessionStorage.setItem('userName', userName)
        window.location = `../game/${roomId}`
      })
      return () => {
        setIsHost(false)
        socket.off("join")
        socket.off("leave")
      }
    }
  },[users, socket])

  useEffect(() => {
    if (userHasName && socket) {
      setLink(window.location.href)
      socket.username = userName;
      console.log("socket.username:", socket.username)
      socket.emit('join', roomId, userName, (roomUsers) => {
        console.log("roomUsers, socket.id", roomUsers, socket.id)
        setUsers(u => [...u, ...roomUsers])
      });
      const listener = () => {
        socket.emit('leave', roomId)
        socket.disconnect();
      }
      window.addEventListener("pagehide", listener);
      return () => {
        removeEventListener("pagehide", listener)
        socket.emit('leave', roomId)
        socket.disconnect();
      }
    }
  }, [userHasName, socket])

  return(
    <div className="create-game page-wrap">
      <header className="flex-center">Tetris Game</header>
      <div className="content-wrap">
        <div className="chat-container" >
          <Chat chatMessages={chatMessages}/>
        </div>
        <main className="flex-center" >
          <div className="lobby-container" >
            <input type="text" id="display" value={link} readOnly></input>
            <button id="create" className='pixel-corners' onClick={copyToClipboard}>Copy!</button>
            <h3>How to play:</h3>
          <ul>
            <li>Left/Right Arrow: Move tetromino left/right</li>
            <li>Up Arrow: Rotate tetromino</li>
            <li>Down Arrow: Move tetromino down faster</li>
            <li>Space: Instantly drop tetromino</li>
            <li>Esc: Pause game</li>
          </ul>
          </div>
        </main>
        <div>
          <h4>Users:</h4>
          <ul id='users'>{users.map((user, i) => <li key={i}>{userName == user.name ? user.name + " (you!)": user.name}</li>)}</ul>
          {isHost ? <button className='pixel-corners' onClick={handleStart}>Start!</button> : null}
        </div>
      </div>
      <footer className="flex-center">by Robert and Skye!</footer>
      <NamePopup open={open} handleSubmit={handleSubmit} handleChange={handleChange} errorMessage={userNameInputError}/>
    </div>
  )
}