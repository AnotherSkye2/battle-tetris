import Home from './pages/Home';
import Chat from './pages/Chat';

export default function App() {
  let self = this;

  self.test = function () {
    console.log(arguments);
  };

  return (render) => render`<>
      <Router>
          <Route path="/" :controller="${Home}" />
          <Route path="/chat" :controller="${Chat}" />
      </Router>
  </>`;
}