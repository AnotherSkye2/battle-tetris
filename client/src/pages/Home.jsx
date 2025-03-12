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
      <header className="flex-center">Tetris Game</header>
      <main className="content-wrap, flex-center">
        { showInfo ? 
          <div className="grid-center" >
              <h1>Welcome to Tetris Game!</h1>
              <p>
                To join a game, either:
                <ul>
                  <li>join a friend's lobby by inserting the URL they shared into your browser's search bar</li>
                  <h4>OR...</h4>
                  <li>create a lobby yourself!</li>
                </ul>
              </p>
              <button id="display" className='pixel-corners' onClick={toggleInfo}>Go back</button>
          </div>
        :
          <div className="button-container" >
            <button id="display" className='pixel-corners' onClick={toggleInfo}>How to join a game?</button>
            <button id="create" className='pixel-corners' onClick={toLobby}>Create Lobby</button>
          </div>
        }
      </main>
      <footer className="center">by Robert and Skye!</footer>
      </div>
    </> 
    )
}