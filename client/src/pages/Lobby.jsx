import {useState, useEffect} from 'react'
import Chat from "../components/Chat"


export default function Lobby() {
  const [inputValue, setInputValue] = useState("")

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
    setInputValue("wee")
  }, [])

  return(
    <div className="create-game page-wrap">
      <header className="center">Tetris Game</header>
      <div className="content-wrap">
        <div className="chat-container" >
          <Chat />
        </div>
        <main className="center" >
          <div className="lobby-container" >
            <input type="text" id="display" readOnly></input>
            <button id="create" onClick={copyToClipboard}>Copy!</button>
          </div>
        </main>
      </div>
      <footer className="center">Wee-woo!</footer>
    </div>
  )
}