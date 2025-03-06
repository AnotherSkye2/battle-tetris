export default function CreateGame() {
    const self = this

    self.info = () => {
        alert("Info!")
    }

    return `    <div class="create-game page-wrap">
      <header class="center">Tetris Game</header>
      <main class="content-wrap, center">
        <div class="button-container">
          <button id="join" onclick="self.info">Join Game</button>
          <button id="create">Create Game</button>
        </div>
      </main>
      <footer class="center">Wee-woo!</footer>
    </div>`
}