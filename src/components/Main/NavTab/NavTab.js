import React from 'react'
import "./NavTab.css";

const NavTab = () => {
  return (
    <nav className="navtab">
      <div className="navtab__container">
        <a className="navtab__btn" href="#about">
          {" "}
          О проекте{" "}
        </a>
        <a className="navtab__btn" href="#techs">
          {" "}
          Технологии{" "}
        </a>
        <a className="navtab__btn" href="#about-me">
          {" "}
          Студент{" "}
        </a>
      </div>
    </nav>
  );
};

export default NavTab;
