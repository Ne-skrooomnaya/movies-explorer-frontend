import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const setMenuActiveLink = ({ isActive }) => (isActive ? 'menu__link-active' : 'menu__link');

  return (
    <>
      <nav className={`menu__nav ${isMenuOpen && 'menu__nav_opened'}`}>
        <ul className="menu__nav-container">
          <li className="menu__list" onClick={closeMenu}>
            <NavLink className={setMenuActiveLink} end to="/">
              Главная
            </NavLink>
          </li>
          <li className="menu__list" onClick={closeMenu}>
            <NavLink className={setMenuActiveLink} to="/movies">
              Фильмы
            </NavLink>
          </li>
          <li className="menu__list" onClick={closeMenu}>
            <NavLink className={setMenuActiveLink} to="/saved-movies">
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className='navigation__btn-container'>
            <NavLink className="navigation__acc-btn" to="/profile" onClick={closeMenu}>
                Аккаунт
            </NavLink>
            <NavLink  to="/profile" onClick={closeMenu}>
                <div className="navigation__item navigation__item_dark"></div>
            </NavLink>
        </div>
      </nav>
      <div className={`menu__background ${isMenuOpen ? 'menu__background_active' : ''}`} onClick={closeMenu}></div>
      <button className={`menu__btn ${isMenuOpen && 'menu__btn_close'}`} onClick={() => setIsMenuOpen(!isMenuOpen)} type='button'></button>
    </>
  );
};

export default Menu;