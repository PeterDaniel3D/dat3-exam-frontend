import React from 'react'
import LogIn from "../Login";

const Home = ({ loggedIn, login, facade, logout }) => {
  return (
    <div>
      {!loggedIn ? (<LogIn login={login} />) :
        (<div>

          <button onClick={logout}>Logout</button>
          <h1>Exam</h1>
          <p>Role: {facade.getUserRoles()}</p>
        </div>)}
    </div>
  )
}

export default Home
