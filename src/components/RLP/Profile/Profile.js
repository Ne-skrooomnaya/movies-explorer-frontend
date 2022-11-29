import './Profile.css';

const Profile = ({handleLogOut}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogOut();
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__input-container">
            <span className="profile__text">Имя</span>
          <input
          className="profile__input"
          name="name"
          type="text"
          autoComplete="off"
          placeholder='Виталий'
          />
        </label>
        <label className="profile__input-container">
        <span className="profile__text">E-mail</span>
          <input
          className="profile__input"
          name="email"
          type="email"
          autoComplete="off"
          placeholder='pochta@yandex.ru'
          />
        </label>
      </form>
      <div className='profile__container-btn'>
      <button className="profile__btn" type='submit'>Редактировать</button>
      <button className="profile__btn" onClick={handleLogOut} type='submit'>Выйти из аккаунта</button>
      </div>
    </section>
  );
};

export default Profile;