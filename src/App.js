import logo from './logo.svg';
import './App.css';

import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Auth/Login'
import Home from './components/Home/Home'
import Customer  from './components/Customer/Customer';

function App() {
  return (
 
    <Router>
      <div className="App">
      <Switch> 
        <Route exact path="/">
          <Customer />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>

      </Switch>
      </div>
    </Router>
  );
}

export default App;
