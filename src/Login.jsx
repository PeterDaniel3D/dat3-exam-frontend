import { useState } from "react";

export default function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (event) => {
    event.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (event) => {
    setLoginCredentials({ ...loginCredentials, [event.target.id]: event.target.value })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  )
}