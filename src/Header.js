import React from "react";
import { NavLink as Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

function Header({ match }) {
  return (
    <header className="Header">
      <Link to="/">
        <img src={logo} className="Header-logo" alt="logo" />
      </Link>
      <div className="Header-link-group">
        <Link activeClassName="active" className="Header-link" to="/page1">
          Page1
        </Link>
        <Link activeClassName="active" className="Header-link" to="/page2">
          Page2
        </Link>
        <Link activeClassName="active" className="Header-link" to="/page3">
          Page3
        </Link>
      </div>
    </header>
  );
}

export default Header;
