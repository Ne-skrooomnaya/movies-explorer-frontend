import React, { useState, useEffect } from "react";
import { Route, useNavigate, Routes } from "react-router-dom";

import Header from "../HNF/Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../RLP/Profile/Profile";
import Register from "../RLP/Register/Register";
import Login from "../RLP/Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../HNF/Footer/Footer";
import "./App.css";
import * as auth from "../../utils/Auth";
import { CurrentUserContext } from "../../configs/currentUserContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovie, setSavedMovie] = useState([]);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [film, setFilm] = useState(getSearchStoreValue());
  const [allMovies, setAllMovies] = useState(JSON.parse(localStorage.getItem("allMovies")) || []);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    checkToken();
    if (localStorage.getItem("token")) {
      Promise.all([mainApi.getUser()])
        .then(([user]) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getMoviesSaved();
    }
  }, [currentUser]);

  function getMoviesSaved() {
    mainApi
      .getMovies()
      .then((res) => {
        setSavedMovie(res.data.filter((i) => i.owner === currentUser._id));
        setIsLoading(false);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getMovies() {
    moviesApi
      .getMovies()
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem("allMovies", JSON.stringify(res));
        setAllMovies(res);
        localStorage.setItem("filmSearch", film);
      })
      .catch(() => {
        setError(true);
        setErrorText(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getSearchStoreValue() {
    const searchStoreValue = localStorage.getItem("filmSearch");
    if (!searchStoreValue) {
      return "";
    }
    return searchStoreValue;
  }

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth.CheckToken(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            console.log("success");
            
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleRegister = ({ password, email, name }) => {
    return auth
      .register({ password, email, name })
      .then((user) => {
        if (user) {
          handleLogin({ email, password });
          navigate("/movies");
        }
        console.log("fff");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          mainApi.setToken(res.token);
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies");
          checkToken();
        }
      })
      .catch((err) => {
        console.log("Ошибка сохранения данных ", err);
      });
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('moviesAll')
    localStorage.removeItem("movies");
    localStorage.removeItem("word");
    localStorage.removeItem("checkbox");
    localStorage.removeItem("collection");
    localStorage.removeItem("moviesTumbler");
    localStorage.removeItem("moviesInputSearch");
    localStorage.removeItem("savedMoviesTumbler");
    localStorage.removeItem("savedMoviesInputSearch");
    localStorage.clear();
    setLoggedIn(false);

    navigate("/");
  };

  function deleteMovieCard(movie) {
    setSubmitButtonDisabled(true);
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setSavedMovie((state) => state.filter((c) => c._id !== movie._id));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setSubmitButtonDisabled(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <main className="content">
          <Header loggedIn={loggedIn} />
          <Routes>
            <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
            <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/" element={<Main />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies}
                  loggedIn={loggedIn}
                  setSavedMovie={setSavedMovie}
                  savedMovie={savedMovie}
                  deleteMovieCard={deleteMovieCard}
                  setSubmitButtonDisabled={setSubmitButtonDisabled}
                  submitButtonDisabled={submitButtonDisabled}
                  getMovies={getMovies}
                  allMovies={allMovies}
                  setAllMovies={setAllMovies}
                  film={film}
                  setFilm={setFilm}
                  error={error}
                  setError={setError}
                  errorText={errorText}
                  setErrorText={setErrorText}
                  getSearchStoreValue={getSearchStoreValue}
                  getMoviesSaved={getMoviesSaved}
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovie={savedMovie}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  deleteMovieCard={deleteMovieCard}
                  submitButtonDisabled={submitButtonDisabled}
                  setSubmitButtonDisabled={setSubmitButtonDisabled}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  component={Profile}
                  loggedIn={loggedIn}
                  onProfileExit={handleLogOut}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
