import "./Login.css";
import Logo from "../../Logo/Logo";
import { NavLink } from "react-router-dom";
import React, { useState } from "react";

function Login({ handleLogin }) {
  const [state, setState] = useState({
    password: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({ ...errors, [name]: e.target.validationMessage });
    if (name === "email") {
      if (value.length === 0) {
        setErrors({
          ...errors,
          [name]: "Пожалуйста заполните это поле. Пример: Anna@em.ru",
        });
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        setErrors({
          ...errors,
          [name]:
            "Пожалуйста заполните это поле: от 2 до 40 символов и без использования специальных знаков",
        });
      }
    }
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(state);
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
            name="email"
            type="text"
            value={state.email || ""}
            onChange={handleChange}
            id="login__email"
            required
            minLength={2}
            maxLength={40}
            placeholder="E-mail"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          />
          <span
            className={`login__input-error ${
              errors.email ? "login__input-error_show" : ""
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="form__input-container">
          <span className="form__input-text">Пароль</span>
          <input
            className="form__input"
            name="password"
            type="password"
            value={state.password || ""}
            onChange={handleChange}
            id="login__password"
            required
            minLength={2}
            maxLength={40}
            placeholder="Пароль"
            pattern="[\w]{2,40}$"
          />
          <span
            className={`login__input-error ${
              errors.password ? "login__input-error_show" : ""
            }`}
          >
            {errors.password}
          </span>
        </label>
        <button
          className={`form__btn-submit ${
            !isValid ? "form__btn-submit_disabled" : ""
          }`}
          type="submit"
          disabled={!isValid}
        >
          Войти
        </button>
        <div className="form__subtitle">
          <span className="form__text">Ещё не зарегистрированы?</span>
          <NavLink className="form__link" to="/signup">
            Регистрация
          </NavLink>
        </div>
      </form>
    </section>
  );
}

export default Login;
