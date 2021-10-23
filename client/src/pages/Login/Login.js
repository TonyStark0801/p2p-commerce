import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessage";
import Loading from "../../Components/Loading/Loading";
import { signin } from "../../Redux/Actions/UserAction";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [props.history, userInfo]);
  return (
    <>
      {loading && <Loading></Loading>}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      <div className="login__container">
        <h1 className="login__heading">&bull; Login &bull;</h1>
        <div className="login__underline"> </div>
        <form className="login__form" onSubmit={submitHandler}>
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
            <input type="submit" value="Login" className="form_button" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
