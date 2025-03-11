import {useState} from 'react'

export default function Home() {
    const [showInfo, setShowInfo] = useState(false)

    const toggleInfo = () => {
      setShowInfo(!showInfo)
    }

    const toLobby = () => {
      window.location = `./lobby/${Math.floor(Math.random() * 100000)}`
    }



    return ( <>
      <div className="create-game page-wrap">
      <header className="center">Tetris Game</header>
      <main className="content-wrap, center">
        { showInfo ? 
          <div className="button-container" >
              <p>Info</p>
              <button id="display" onClick={toggleInfo}>Go back</button>
          </div>
        :
          <div className="button-container" >
            <button id="display" onClick={toggleInfo}>How to join a game?</button>
            <button id="create" onClick={toLobby}>Create Lobby</button>
          </div>
        }
      </main>
      <footer className="center">Wee-woo!</footer>
      </div>
    </> 
    )
}