import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Home from './pages/Home'
import Lobby from './pages/Lobby'
import Game from './pages/Game'
import SinglePlayerLobby from "./pages/singlePlayerLobby";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobby/:roomId" element={<Lobby />} />
      <Route path="/game/:roomId" element={<Game />} />
      <Route path ="/single/lobby/:roomId" element={< SinglePlayerLobby/>}/>
      <Route path="/single/game/:roomId" element={<Game />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
