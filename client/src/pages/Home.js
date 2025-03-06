export default function Home() {
    const self = this
    console.log("self, this: ", self, this);

    self.displayInfo = () => {
        self.buttons.classList.toggle("hidden")
        self.info.classList.toggle("hidden")
    }

    self.toLobby = () => {
      window.location = "./lobby"
    }

    return `    <div class="create-game page-wrap">
      <header class="center">Tetris Game</header>
      <main class="content-wrap, center">
        <div class="button-container" :ref="self.buttons">
          <button id="display" onclick="self.displayInfo">How to join a game?</button>
          <button id="create" onclick="self.toLobby">Create Game</button>
        </div>
        <div class="button-container hidden" :ref="self.info">
            <p>Info</p>
            <button id="display" onclick="self.displayInfo">Go back</button>
        </div>
      </main>
      <footer class="center">Wee-woo!</footer>
    </div>`
}