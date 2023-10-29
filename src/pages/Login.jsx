import { useState } from "react";
import "../styles/Login.scss";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  async function handleBtnClick(e) {
    e.preventDefault();
    try {
      const user = {
        username: username,
        password: password,
      };
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(user), // body data type must match "Content-Type" header
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        throw new Error("no token");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="login-page">
      <div className="pitch-container"></div>
      <div className="form-container">
        <header>
          <h1>Welcome Back!</h1>
          <h3>Please enter your details.</h3>
        </header>

        <form method="Post" action="">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button onClick={handleBtnClick}>Login</button>
        </form>
        <footer>
          <h3>Don&apos;t have an account?</h3>
          <Link to="/sign-up">Sing Up!</Link>
        </footer>
      </div>
    </div>
  );
}

export default Login;
