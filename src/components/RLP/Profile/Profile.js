import './Profile.css';
import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../configs/currentUserContext";
import mainApi from '../../../utils/MainApi';

function Profile({onProfileExit}) {
    const currentUser = useContext(CurrentUserContext);
    const [userName, setUserName] = useState(currentUser.name);
    const [newUserName, setNewUserName] = useState(currentUser.name);
    const [userEmail, setUserEmail] = useState(currentUser.email);
    const [newUserEmail, setNewUserEmail] = useState(currentUser.email);
    const [textInfo, setTextInfo] = useState(null);
    const [isVisibleButton, setVisibleButton] = useState(false);
  
    function handelSubmit(e) {
      e.preventDefault();
  
      mainApi.editUser(newUserName, newUserEmail)
        .then((res) => {
          setVisibleButton(false);
          setUserName(newUserName);
          setUserEmail(newUserEmail);
          setTextInfo("Данные успешно изменены.");
        })
        .catch((err) => {
          setTextInfo("Что то пошло не так.");
          console.log("Ошибка сохранения данных ", err);
        });
    }
  
    function handleNameChange(e) {
      const name = e.target.value;
      setNewUserName(name);
  
      if (name !== userName) {
        setVisibleButton(true);
      } else {
        setVisibleButton(false);
      }
    }
  
    function handleEmailChange(e) {
      const email = e.target.value;
      setNewUserEmail(email);
  
      if (email !== userEmail) {
        setVisibleButton(true);
      } else {
        setVisibleButton(false);
      }
    }
  return (
    <section className="profile">
      <h1 className="profile__title">{`Привет, ${newUserName}!`}</h1>
      <form className="profile__form" onSubmit={handelSubmit}>
        <label className="profile__input-container">
            <span className="profile__text">Имя</span>
          <input
            className="profile__input"
            name="name"
            type="name"
            pattern="^[A-Za-zА-Яа-я-\s]+$"
            required
            value={newUserName}
              onChange={handleNameChange}
            formNoValidate
          />
        </label>
        <label className="profile__input-container">
        <span className="profile__text">E-mail</span>
          <input
          className="profile__input"
          name="email"
          type="email"
          pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
          required
          value={newUserEmail}
              onChange={handleEmailChange}
          formNoValidate
          />
        </label>
      </form>
      <div className='profile__container-btn'>
      <span className='profile__error'>{textInfo}</span>
      <button
              className="profile__btn profile__btn_submit"
              type="submit"
              disabled={!isVisibleButton}
            >
              Редактировать
            </button>
            <button
              className="profile__btn profile__btn_out"
              type="button"
              onClick={onProfileExit}
            >
              Выйти из аккаунта
            </button>
      </div>
    </section>
  );
};

export default Profile;