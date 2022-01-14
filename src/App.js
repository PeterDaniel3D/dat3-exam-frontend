import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom'
import Facade from './apiFacade'
import Home from './Components/Home'
import Header from './Components/Header'
import US_1 from './Components/US_1'
import US_2 from "./Components/US_2"
import US_3 from "./Components/US_3"
import US_4 from "./Components/US_4"

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
          <Route exact path='/'>
            <Home loggedIn={loggedIn} login={login} facade={Facade} logout={logout} />
          </Route>
          <Route exact path='/US_1'>
            <US_1 facade={Facade} />
          </Route>
          <Route exact path='/US_2'>
            {Facade.hasUserAccess('owner', loggedIn) && <US_2 facade={Facade} />}
          </Route>
          <Route exact path='/US_3'>
            {Facade.hasUserAccess('owner', loggedIn) && <US_3 facade={Facade} />}
          </Route>
          <Route exact path='/US_4'>
            {Facade.hasUserAccess('owner', loggedIn) && <US_4 facade={Facade} />}
          </Route>
        </Switch>
      </Router>
    </Container>
  )
}
export default App;
