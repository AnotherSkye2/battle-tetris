
export default function Lobby() {
  
  const self = this
  self.socket = io()
  self.inputValue = "wee"

  self.copyToClipboard = () => {
    async function copyPageUrl() {
      try {
        await navigator.clipboard.writeText(self.inputValue);
        console.log('Page URL copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
    copyPageUrl().then(() => {self.copyButton.innerHTML = "Copied!"})
  }

  return(
  <div class="create-game page-wrap">
    <header class="center">Tetris Game</header>
    <div class="content-wrap">
      <div class="chat-container" >
        <Chat />
      </div>
      <main class="center" >
        <div class="lobby-container" >
          <input type="text" id="display" readonly></input>
          <button id="create">Copy!</button>
        </div>
      </main>
    </div>
    <footer class="center">Wee-woo!</footer>
  </div>
  )
}