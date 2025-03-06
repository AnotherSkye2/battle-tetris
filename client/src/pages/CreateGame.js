export default function CreateGame() {
    const self = this

    self.displayInfo = () => {
        self.buttons.classList.toggle("hidden")
        self.info.classList.toggle("hidden")
    }

    return `    <div class="create-game page-wrap">
      <header class="center">Tetris Game</header>
      <main class="content-wrap, center">
        <div class="button-container" :ref="self.buttons">
          <button id="displayInfo" onclick="self.displayInfo">Join Game</button>
          <button id="create">Create Game</button>
        </div>
        <div class="button-container hidden" :ref="self.info">
            <p>Info</p>
            <button id="back" onclick="self.displayInfo">Go back</button>
        </div>
      </main>
      <footer class="center">Wee-woo!</footer>
    </div>`
}