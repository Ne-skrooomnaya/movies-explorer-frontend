import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
// import movies from '../../../utils/utils'
import React from "react";
import { useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const MoviesCardList = ({
  cards,
  isLoading,
  error,
  handleLoadMore,
  visibleMoviesCount,
  errorText,
  saveMovies,
  deleteMovieCard,
  savedMovie,
  submitButtonDisabled,
}) => {
  const location = useLocation();

  console.log(cards);

  return (
    <section className="movies">
      {isLoading ? (
        <Preloader />
      ) : error ? (
        <p className="movies__error">{errorText}</p>
      ) : (
        <>
          <div className="movies__container">
            {location.pathname === "/movies" &&
              cards
                .slice(0, visibleMoviesCount)
                .map((card) => (
                  <MoviesCard
                    key={card.id}
                    card={card}
                    savedMovie={savedMovie}
                    deleteMovieCard={deleteMovieCard}
                    saveMovies={saveMovies}
                    submitButtonDisabled={submitButtonDisabled}
                  />
                ))}
            {location.pathname === "/saved-movies" &&
              cards.map((card) => (
                <MoviesCard
                  key={card.movieId}
                  card={card}
                  deleteMovieCard={deleteMovieCard}
                  saveMovies={saveMovies}
                  savedMovie={savedMovie}
                  submitButtonDisabled={submitButtonDisabled}
                />
              ))}
          </div>
          {location.pathname === "/saved-movies" && (
            <div className="movies__container-empty"></div>
          )}
          {location.pathname === "/movies" &&
            visibleMoviesCount < cards.length && (
              <div className="movies__container-btn" onClick={handleLoadMore}>
                <button className="movies__btn">Ещё</button>
              </div>
            )}
        </>
      )}
    </section>
  );
};

export default MoviesCardList;
