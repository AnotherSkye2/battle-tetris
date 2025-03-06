import Game from './pages/Game';
import Lobby from './pages/Lobby';
import Home from './pages/Home';

export default function App() {  
  let self = this;

  self.test = function () {
    console.log(arguments);
  };

  return (render) => render`<>
      <Router>
          <Route path="/" :controller="${Home}" />
          <Route path="/lobby" :controller="${Lobby}" />
          <Route path="/create" :controller="${Home}" />
      </Router>
  </>`;
}