import React from "react";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import "./SearchForm.css";
import search from "../../../images/search.svg";

const SearchForm = ({
  handleFilmSearch,
  handleFilmChange,
  film,
  showShortMovies,
  checkShorts,
}) => {
  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search"
          onSubmit={handleFilmSearch}
          noValidate
        >
          <input
            className="search__input"
            type="text"
            defaultValue={film || ""}
            onChange={handleFilmChange}
            placeholder="Фильм"
            required
          />
          <button className="search__btn" type="submit">
            <img className="search__icon" src={search} alt="поиск" />
          </button>
        </form>
        <FilterCheckBox
          showShortMovies={showShortMovies}
          checkShorts={checkShorts}
        />
      </div>
    </section>
  );
};

export default SearchForm;
