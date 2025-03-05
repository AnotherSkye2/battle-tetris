import Home from './pages/Home';

export default function App() {
  let self = this;

  self.test = function () {
    console.log(arguments);
  };

  return (render) => render`<>
      <Router>
          <Route path="(.*)" :controller="${Home}" />
      </Router>
      <Toolbar>
          <Icon content="inbox" title="Inbox" route="/tests/home" />
          <Icon content="create" title="New message" route="/tests/compose" />
          <Icon content="person" title="Profile" route="/tests/profile" />
      </Toolbar>
  </>`;
}