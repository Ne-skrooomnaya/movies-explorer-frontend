import "./FilterCheckBox.css";
import React from "react";

const FilterCheckBox = ({ showShortMovies, checkShorts }) => {
  return (
    <>
      <div className="checkbox">
        <label className="checkbox__container">
          <input
            type="checkbox"
            name="checkbox"
            className="checkbox__input"
            value={checkShorts}
            defaultChecked={checkShorts}
            onChange={showShortMovies}
          />
          <span className="checkbox__slider"></span>
        </label>
        <p className="checkbox__text">Короткометражки</p>
      </div>
    </>
  );
};

export default FilterCheckBox;
