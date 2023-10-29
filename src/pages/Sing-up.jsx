import "../styles/Sign-up.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }
  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
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
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
      };
      const response = await fetch("http://localhost:3000/auth/sign-up", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "omit", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
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
      console.log(error);
    }
  }
  return (
    <div className="sign-up-page">
      <div className="pitch-container"></div>
      <div className="form-container">
        <header>
          <h1>Welcome!</h1>
          <h3>Please enter your details.</h3>
        </header>

        <form method="Post" action="">
          <div className="full-name">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
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
          <button onClick={handleBtnClick}>Sign Up</button>
        </form>
        <footer>
          <h3>Don&apos;t have an account?</h3>
          <Link to="/login">Login!</Link>
        </footer>
      </div>
    </div>
  );
}

export default SignUp;
