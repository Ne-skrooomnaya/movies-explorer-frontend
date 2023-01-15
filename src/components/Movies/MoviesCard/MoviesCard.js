import "./MoviesCard.css";
import React from "react";
import { useLocation } from "react-router-dom";
import save from "../../../images/save.svg";
import del from "../../../images/delete.svg";
import nosave from "../../../images/nosave.svg";

const MoviesCard = ({
  card,
  saveMovies,
  deleteMovieCard,
  savedMovie,
  submitButtonDisabled,
}) => {
  const location = useLocation();
  const isSaved = card.id
    ? savedMovie.map((i) => i.movieId).includes(card.id)
    : location.pathname === "/saved-movies"
    ? true
    : "";

  function handleDelete() {
    if (location.pathname === "/saved-movies") {
      deleteMovieCard(card);
    }
    if (location.pathname === "/movies")
      deleteMovieCard(savedMovie.find((i) => i.movieId === card.id));
  }

  function handleSave() {
    saveMovies({
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: `https://api.nomoreparties.co/${card.image.url}`,
      trailerLink: card.trailerLink,
      nameRU: card.nameRU,
      nameEN: card.nameEN,
      thumbnail: `https://api.nomoreparties.co/${card.image.formats.thumbnail.url}`,
      movieId: card.id,
    });
  }

  function convertHoursAndMinutes() {
    const minutes = card.duration % 60;
    const hours = Math.floor(card.duration / 60);

    if (hours === 0) {
      return `${card.duration} минут`;
    }
    return `${hours}ч ${minutes}м`;
  }

  return (
    <div className="movie" key={card.id || card.movieId}>
      <div className="movie__block">
        <h2 className="movie__name">{card.nameRU}</h2>
        {location.pathname === "/saved-movies" && (
          <button
            className="movie__button"
            onClick={handleDelete}
            disabled={submitButtonDisabled ? true : false}
          >
            <img
              className="movie__button-img"
              alt="delete movie icon"
              src={del}
            />
          </button>
        )}
        {location.pathname === "/movies" && (
          <button
            className={isSaved ? "movie__button" : "movie__button"}
            onClick={isSaved ? handleDelete : handleSave}
            disabled={submitButtonDisabled ? true : false}
          >
            {isSaved ? (
              <img
                className="movie__button-img"
                alt="saved movie icon"
                src={save}
              />
            ) : (
              <img
                className="movie__button-img"
                alt="saved movie icon"
                src={nosave}
              />
            )}
          </button>
        )}
        <p className="movie__time">{convertHoursAndMinutes()}</p>
      </div>
      <div className="movie__info">
        <a
          href={card.trailerLink}
          className="movie__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="movie__img"
            src={
              location.pathname === "/saved-movies"
                ? `${card.image}`
                : `https://api.nomoreparties.co${card.image.url}`
            }
            alt="movie poster"
          />
        </a>
      </div>
    </div>
  );
};

export default MoviesCard;
