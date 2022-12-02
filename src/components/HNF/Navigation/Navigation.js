import { useLocation, NavLink } from 'react-router-dom';
import './Navigation.css';
import React from 'react';
import Menu from './Menu/Menu';

const Navigation = ({ loggedIn }) => {
  return <>
  {!loggedIn ? <NavigationStart /> : <NavigationMovies />}
  </>;
};

const setActiveLink = ({ isActive }) => (isActive ? 'navigation__link-active' : 'navigation__link');

const NavigationStart = () => {
  return (
    <>
      <nav className="navigation">
        <div className="navigation__container">
          <NavLink className='navigation__link navigation__link_register' to="/signup">
            Регистрация
          </NavLink>
          <NavLink className="navigation__entry-btn" to="/signin">
            Войти
          </NavLink>
        </div>
      </nav>
    </>
  );
};

const NavigationMovies = () => {

  const location = useLocation();
  const navigationItemDark = `navigation__item ${location.pathname !== '/' ? 'navigation__item_dark' : ''}`;

  return (
    <>
    <Menu />
        <nav className="navigation navigation-movies">
            <div className="navigation__container">
                <div className='navigation__container-movies'>
                    <NavLink className={setActiveLink} to="/movies">
                        Фильмы
                    </NavLink>
                    <NavLink className={setActiveLink} to="/saved-movies">
                        Сохранённые фильмы
                    </NavLink>
                </div>
                <div className='navigation__btn-container'>
                    <NavLink className="navigation__acc-btn navigation__acc-btn_hidden" to="/profile">
                        Аккаунт
                    </NavLink>
                    <NavLink  to="/profile"><div className={navigationItemDark}></div></NavLink>
                </div>
            </div>
        </nav>
    </>
  );
};

export default Navigation;