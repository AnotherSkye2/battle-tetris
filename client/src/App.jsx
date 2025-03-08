import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Home from './pages/Home'
import Lobby from './pages/Lobby'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobby/:id" element={<Lobby />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
