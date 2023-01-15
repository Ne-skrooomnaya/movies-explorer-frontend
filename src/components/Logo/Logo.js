import React from 'react'
import "./Logo.css";
import { Link } from "react-router-dom";
import logo from "../../images/logof.svg";

const Logo = () => {
  return (
    <Link className="logo" to="/">
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
