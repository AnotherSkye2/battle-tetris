import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Chat from './pages/Chat';
import Home from './pages/Home';

export default function App() {
  let self = this;

  var socket = io();

  self.test = function () {
    console.log(arguments);
  };

  return (render) => render`<>
      <Router>
          <Route path="/" :controller="${Home}" />
          <Route path="/chat" :controller="${() => Chat(socket)}" />
          <Route path="/lobby" :controller="${() => Lobby(socket)}" />
          <Route path="/create" :controller="${Home}" />
      </Router>
  </>`;
}