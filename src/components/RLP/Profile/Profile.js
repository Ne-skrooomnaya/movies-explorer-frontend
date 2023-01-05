import './Profile.css';
import { useContext, useState, useEffect } from "react";

import  useFormValidation   from '../../../configs/useFormValidation'
import { CurrentUserContext } from "../../../configs/currentUserContext";

function Profile({onUpdateProfileData, onProfileExit}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid } = useFormValidation();
  const [checkUser, setCheckUser] = useState(false);
  const [nameError, setNameError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitString, setSubmitString] = useState('Редактировать');

  useEffect(() => {
    values.name = values.name || currentUser.name;
    values.email = values.email || currentUser.email;

    if (checkUser && values.name === currentUser.name && values.email === currentUser.email) {
      setNameError('Имя совпадает с предыдущим');
      setSubmitError('Email совпадает с предыдущим');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleInputValue = (e) => {
    handleChange(e);
    setNameError('');
    setSubmitError('');
    setCheckUser(true);
  }

  function handleSubmitForm(e) {
    e.preventDefault();

    onUpdateProfileData({
      name: values.name,
      email: values.email,
    }, () => {
      setCheckUser(false);
      setSubmitString('Сохранено');
      setTimeout(() => {
        setSubmitString('Редактировать');
      }, 2000);
    }, setSubmitError);
  }

  const buttonDisabled = submitError.length > 0 ? true : !isValid;

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmitForm}>
        <label className="profile__input-container">
            <span className="profile__text">Имя</span>
          <input
            className="profile__input"
            name="name"
            type="name"
            pattern="^[A-Za-zА-Яа-я-\s]+$"
            required
            onChange={handleInputValue}
            defaultValue={currentUser.name}
            formNoValidate
          />
        </label>
        <span className='profile__span profile__span_error'>{errors.name || nameError}</span>
        <label className="profile__input-container">
        <span className="profile__text">E-mail</span>
          <input
          className="profile__input"
          name="email"
          type="email"
          pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
          required
          defaultValue={currentUser.email}
          onChange={handleInputValue}
          formNoValidate
          />
        </label>
        <span className='profile__span profile__span_error'>{errors.email || submitError}</span>
      </form>
      <div className='profile__container-btn'>
      <button className={`profile__btn ${buttonDisabled ? "profile__btn_disabled" : ""}`} 
      type="submit" disabled={buttonDisabled ? true : ''}>{submitString}</button>
        <button className="profile__btn" type="button" onClick={onProfileExit}>
          Выйти из аккаунта
        </button>
      </div>
    </section>
  );
};

export default Profile;