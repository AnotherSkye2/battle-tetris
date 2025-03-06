export default function Chat() {
    const self = this;
    console.log("self, this: ", self, this);
    
    self.handleSubmit = (e) => {
      e.preventDefault();
      if (self.input.value) {
        self.socket.emit('chat message', self.input.value);
        self.input.value = '';
      }
    }
    
    self.onload = () => {
      self.socket.on('chat message', function(msg) {
        var item = document.createElement('li');
        item.textContent = msg;
        self.messages.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
      });
    }
  

    return `   <>
      <ul id="messages" :ref="self.messages"></ul>
      <form id=form onsubmit="self.handleSubmit">
      <input id="input" autocomplete="off" :ref="self.input"/><button type="submit">Send</button>
      </form>
    </> 
    `
}