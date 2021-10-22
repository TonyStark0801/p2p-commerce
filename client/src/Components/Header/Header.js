import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "../../logo.svg";
// import logo from "../../RENT3.png";
import "./Header.css";

function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
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
                <span className="badge">{cartItems.length}</span>
              )}
            </div>
          </Link>
          <div>
            <button className="header__login-button"> Login </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
