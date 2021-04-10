import {
  BrowserRouter as Router, // named export trong JS
  Switch,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import Home from './pages/Home/Home';

// Bộ UI components: React Bootstrap, Material UI, Antd design, Chakra UI
function App() {
  // switch case
  // case path = '/' => render component <div>Home</div>
  // case path = '/login' => render component <div>Login</div>

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/create">
          <div>Create</div>
        </Route>
        <Route path="/posts/:id">
          <div>Detail post</div>
        </Route>
        <Route path="*">
          <div>404 page</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
