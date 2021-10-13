import React from "react";
import logo from "../../logo.svg";
import "./Header.css";

function Header() {
  return (
    <header>
      <div className="header">
        <img className="header__logo" src={logo} alt="" />
        <div className="header__searchbox">
          <input
            className="searchbox__search"
            type="text"
            placeholder="Search"
          />
          <button className="searchbox__button" type="button">
            <i class="fa fa-search"> </i>
          </button>
        </div>
        <div className="header__content">
          <div>
            <p className="header__rent"> Rent </p>
          </div>
          <div>
            <button className="header__login-button"> Login </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
