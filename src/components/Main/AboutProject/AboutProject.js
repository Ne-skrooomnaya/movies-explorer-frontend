import React from 'react'
import "./AboutProject.css";

const AboutProject = () => {
  return (
    <section className="about" id="about">
      <h2 className="about__title">О проекте</h2>
      <div className="about__container">
        <div className="about__info">
          <h3 className="about__info-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about__info-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about__info">
          <h3 className="about__info-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about__info-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about__time">
        <div className="about__backend">
          <p className="about__back-title">1 неделя</p>
          <p className="about__text">Back-end</p>
        </div>
        <div className="about__frontend">
          <p className="about__front-title">4 недели</p>
          <p className="about__text">Front-end</p>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
