import axios from "axios";
import React, { useState } from "react";
import "./Register.css";
function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function submitHandler(e) {
    e.preventDefault();
    axios.post("https://p2p-comm-server.herokuapp.com/api/signup", {
      username: username,
      email: email,
      password: password,
    });
    alert("User Registered Successfully");
    props.history.push("/login");
  }
  return (
    <>
      <div className="login__container">
        <h1 className="login__heading">&bull; Register &bull;</h1>
        <div className="login__underline"> </div>
        <form className="login__form" onSubmit={submitHandler}>
          <div className="text-input">
            <div className="username">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="username__input"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="text-input">
            <div className="email">
              <input
                type="email"
                placeholder="Email"
                className="email__input"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="text-input">
            <div className="pass">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="pass__input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="submit">
            <input type="submit" value="Register" className="form_button" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
