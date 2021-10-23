import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../../logo.svg";
import { signout } from "../../Redux/Actions/UserAction";
// import logo from "../../RENT3.png";
import "./Header.css";

function Header() {
  const getPropValue = (obj, key) =>
    key.split(".").reduce((o, x) => (o == undefined ? o : o[x]), obj);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const username = getPropValue(userInfo, "user.username");
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(signout());
  };
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="" />
        </Link>
        <div className="header__searchbox">
          <input
            className="searchbox__search"
            type="text"
            placeholder="Search"
          />
          <button className="searchbox__button" type="button">
            <i className="fa fa-search"> </i>
          </button>
        </div>
        <div className="header__content">
          <Link to={`/cart/`}>
            <div className="header__cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge"> {cartItems.length} </span>
              )}
            </div>
          </Link>

          {userInfo ? (
            <>
              <Link to={"/upload"}>
                <div className="header__upload">Upload</div>
              </Link>
              <Link to={"/"}>
                <div className="header__username">
                  <i className="fa fa-user"></i>
                  {username}
                </div>
              </Link>
              <Link to={"/"} onClick={logoutHandler}>
                <div>
                  <button className="header__login-button"> Log Out </button>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/register"}>
                <div className="header__register">Register</div>
              </Link>
              <Link to={"/login"}>
                <div>
                  <button className="header__login-button"> Login </button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
