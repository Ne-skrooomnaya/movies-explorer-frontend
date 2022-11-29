import './Login.css';
import Logo from '../../Logo/Logo';
import {NavLink} from 'react-router-dom';
import React, {useState} from 'react';

  const Login = ({handleLogin}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(data);
  };

  return (
    <section className="form login">
      <form className="form__form login__form" onSubmit={handleSubmit}>
        <Logo />
        <h1 className="form__title">Рады видеть!</h1>
        <label className="form__input-container">
          <span className="form__input-text">E-mail</span>
          <input
          className="form__input"
          name='email'
          type='text'
          onChange={handleChange}
          value={data.email}
           />
        </label>
        <label className="form__input-container">
          <span className="form__input-text">Пароль</span>
          <input
          className="form__input"
          name="password"
          type="password"
          onChange={handleChange}
          value={data.password}
           />
        </label>
      </form>
      <button
      className="form__btn-submit"
      onClick={handleLogin}
      type='button'
      >
        Войти
        </button>
      <div className='form__subtitle'>
        <span className="form__text">Ещё не зарегистрированы?</span>
        <NavLink className="form__link" to="/signup">
            Регистрация
        </NavLink>
      </div>
    </section>
  );
};

export default Login;