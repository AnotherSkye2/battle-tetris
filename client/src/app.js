import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Chat from './pages/Chat';
import Home from './pages/Home';

export default function App() {
  let self = this;

  self.test = function () {
    console.log(arguments);
  };

  return (render) => render`<>
      <Router>
          <Route path="/" :controller="${Home}" />
          <Route path="/chat" :controller="${Chat}" />
          <Route path="/create" :controller="${Home}" />
      </Router>
  </>`;
}