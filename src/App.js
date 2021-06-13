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
        {/* <Route exact path="/objects"> */}
          {/* <LightStack data={data} /> */}
          {/* <InfoCard data={data} label="Info" /> */}
        {/* </Route> */}
        {/* <Route exact path="/factory_details/:id"  component={FactoryDetails}> */}
          {/* <FactoryDetails /> */}
        {/* </Route> */}

      </Switch>
      </div>
    </Router>
  );
}

export default App;
