import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from "react"
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Facade from "./apiFacade";
import Home from "./Components/Home"
import Header from "./Components/Header"
import Auctions from './Components/Auctions';

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const logout = () => {
    Facade.logout()
    setLoggedIn(false)
  }

  const login = (user, pass) => {
    Facade.login(user, pass)
      .then(res => setLoggedIn(true));
  }

  useEffect(() => {
    if (Facade.getToken() != null) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <Container>
      <Router>
        <Header facade={Facade} loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Home loggedIn={loggedIn} login={login} facade={Facade} logout={logout} />
          </Route>
          <Route exact path="/Auctions">
            <Auctions facade={Facade} />
          </Route>
          {/* <Route exact path="/Auctions">
            {Facade.hasUserAccess('user', loggedIn) && <Auctions facade={Facade} />}
          </Route> */}
        </Switch>
      </Router>
    </Container>
  )
}
export default App;
