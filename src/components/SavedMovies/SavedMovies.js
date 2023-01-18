import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import React, { useEffect, useState } from "react";
import "../Movies/Movies.css";
import { filter } from "../../configs/filter";

const SavedMovies = ({
  savedMovie,
  deleteMovieCard,
  setIsLoading,
  isLoading,
  submitButtonDisabled,
}) => {
  const [film, setFilm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [checkShorts, setCheckShorts] = useState(false);
  const [doSearch, setDoSearch] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setIsLoading(false);
    console.log(isLoading, "hjfbhdfbc");
  }, []);

  useEffect(() => {
    if (savedMovie.length > 0) {
      setSearchResult(savedMovie);
    }
  }, [savedMovie]);

  useEffect(() => {
    if (savedMovie.length === 0) {
      setSearchResult(savedMovie);
    }
  }, [deleteMovieCard]);

  useEffect(() => {
    const filteredMovies = filter(savedMovie, film, checkShorts);
    setSearchResult(filteredMovies);
    setDoSearch(false);
    setError(false);

    if (filteredMovies.length === 0 && film.length > 0) {
      setErrorText("Ничего не найдено");
      return setError(true);
    }
  }, [doSearch, checkShorts]);

  function showShortMovies() {
    setCheckShorts(!checkShorts);
  }

  function handleFilmSearch(e) {
    e.preventDefault();
    if (film === "") {
      setErrorText("Нужно ввести ключевое слово");
      return setError(true);
    } else {
      setDoSearch(true);
    }
  }

  function handleFilmChange(e) {
    setFilm(e.target.value);
  }

  return (
    <>
      <SearchForm
        film={film}
        handleFilmChange={handleFilmChange}
        showShortMovies={showShortMovies}
        handleFilmSearch={handleFilmSearch}
        checkShorts={checkShorts}
      />
      <MoviesCardList
        cards={searchResult}
        deleteMovieCard={deleteMovieCard}
        isLoading={isLoading}
        error={error}
        errorText={errorText}
        submitButtonDisabled={submitButtonDisabled}
      />
    </>
  );
};

export default SavedMovies;
