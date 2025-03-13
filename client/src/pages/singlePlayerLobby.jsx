import { useParams } from "react-router";
import { socket } from '../socket';
import { useEffect,useState } from 'react';


export default function SinglePlayerLobby(){

  const [users, setUsers] = useState([]);
  const {roomId} = useParams()

  useEffect(() => {
    if (!socket.connected) {
      console.log("Reconnecting socket...");
      socket.connect();
    }
  
    socket.on("connect", () => {
      console.log("Socket connected!", socket.id);
    });
  
    return () => {
      socket.off("connect");
    };
  }, []);

  useEffect(() => {
    const userName = `Player`; 

    socket.emit('join', roomId, userName, (users) => {
      console.log("emitted join")
      setUsers(users); 
    });

    socket.on('join', (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    return () => {
      socket.off('join'); 
    };
  }, [roomId]);

  const handleStart = () => {
    console.log("Starting game!");
    sessionStorage.setItem("userNames", JSON.stringify(users));
    sessionStorage.setItem("userName", "Player");
    window.location = `../game/${roomId}`;
  };


  const handleAddBot = () => {
    if (users.length >= 4) {
      return; 
    }
    const botName = `Bot ${users.length + 1} <bot difficulty placeholder>`;
    const newUser = { name: botName, socketId: `bot-${users.length + 1}` }; 
  
    setUsers([...users, newUser]);
    sessionStorage.setItem("userNames", JSON.stringify([...users, newUser]));
  

    socket.emit("join", roomId, botName, (updatedUsers) => {
      setUsers(updatedUsers); 
      sessionStorage.setItem("userNames", JSON.stringify(updatedUsers));
    });
  };

     return(
        <div className="create-game page-wrap">
          <header className="flex-center">Tetris Game</header>
          <div className="content-wrap">
            <main className="flex-center" >
              <div className="lobby-container" >
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
              <h4>Bots:</h4>
              <ul>
              {users.map((user, i) => (
               <li key={i}>{user.name}</li>
              ))}
            </ul>
            <button className="pixel-corners" onClick={handleAddBot}>Add Bot</button>
              <button className='pixel-corners' onClick={handleStart}>Start!</button>
            </div>
          </div>
          <footer className="flex-center">by Robert and Skye!</footer>

        </div>
      )
}