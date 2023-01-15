import "../Login/Login.css";
import { NavLink } from "react-router-dom";
import Logo from "../../Logo/Logo";
import React, { useState } from "react";

function Register(props) {
  const [state, setState] = useState({
    password: "",
    email: "",
    name: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
    setErrors({ ...errors, [name]: e.target.validationMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleRegister(state);
  };

  return (
    <section className="form register">
      <form className="form__form register__form" onSubmit={handleSubmit}>
        <Logo />
        <h1 className="form__title">Добро пожаловать!</h1>
        <label className="form__input-container">
          <span className="form__input-text">Имя</span>
          <input
            className="form__input"
            name="name"
            type="text"
            value={state.name}
            onChange={handleChange}
            id="register__name"
            minLength={2}
            maxLength={40}
            placeholder="Имя"
            pattern="[A-Za-zа-яА-ЯёЁ0-9-\s]{2,40}"
          />
        </label>
        <span
          className={`login__input-error ${
            errors.name ? "login__input-error_show" : ""
          }`}
        >
          {errors.name}
        </span>
        <label className="form__input-container">
          <span className="form__input-text">E-mail</span>
          <input
            className="form__input"
            name="email"
            type="text"
            value={state.email}
            onChange={handleChange}
            id="register__email"
            minLength={2}
            maxLength={40}
            placeholder="E-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
        </label>
        <span
          className={`login__input-error ${
            errors.email ? "login__input-error_show" : ""
          }`}
        >
          {errors.email}
        </span>
        <label className="form__input-container">
          <span className="form__input-text">Пароль</span>
          <input
            className="form__input"
            name="password"
            type="password"
            value={state.password}
            onChange={handleChange}
            id="register__password"
            minLength={2}
            maxLength={40}
            placeholder="Пароль"
            pattern="[\w]{2,40}$"
          />
        </label>
        <span
          className={`login__input-error ${
            errors.password ? "login__input-error_show" : ""
          }`}
        >
          {errors.password}
        </span>
      </form>
      <button className="form__btn-submit" type="submit" onClick={handleSubmit}>
        Зарегистрироваться
      </button>
      <div className="form__subtitle">
        <span className="form__text">Уже зарегистрированы?</span>
        <NavLink className="form__link" to="/signin">
          Войти
        </NavLink>
      </div>
    </section>
  );
}

export default Register;
