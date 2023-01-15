import "./Promo.css";
import NavTab from "../NavTab/NavTab";

const Promo = () => {
  return (
    <section className="promo">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <NavTab></NavTab>
    </section>
  );
};

export default Promo;
