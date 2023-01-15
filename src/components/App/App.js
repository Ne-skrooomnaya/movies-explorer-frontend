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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const App = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovie, setSavedMovie] = useState([]);
  const [messageError, setMessageError] = useState(false);
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
    setIsLoading(true);
    if (localStorage.getItem("token")) {
      mainApi
        .getMovies()
        .then((res) => {
          setSavedMovie(
            res.data.filter((i) => i.owner._id === currentUser._id)
          );
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .Token(token)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
            console.log("success");
            navigate("/movies");
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
        }
        console.log("fff");
      })
      .catch(
        setMessageError({
          text: "E-mail занят",
        })
      );
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
        console.log("aaa");
      })
      .catch(
        setMessageError({
          text: "Что-то не так! Попробуйте ещё раз.",
        })
      );
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
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
              element={
                <Register
                  textError={messageError}
                  handleRegister={handleRegister}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login textError={messageError} handleLogin={handleLogin} />
              }
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
