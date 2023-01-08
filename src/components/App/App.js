import React, {useState, useEffect}   from 'react';
import { Route, useNavigate, Routes } from "react-router-dom";

import Header from '../HNF/Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../RLP/Profile/Profile';
import Register from '../RLP/Register/Register';
import Login from '../RLP/Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../HNF/Footer/Footer';
import './App.css';
import moviesApi from '../../utils/MoviesApi';
import * as auth from "../../utils/Auth";
import { CurrentUserContext } from "../../configs/currentUserContext";
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();


  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

const [currentUser, setCurrentUser] = useState({});

useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    mainApi.getUser(token).then((user) => {
        setLoggedIn(true);
        setCurrentUser(user);
      }).catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

useEffect(() => {
  moviesApi.getMovies()
  .then((response) => {
    setMovies(response);
  })
  .catch((err) => {
    alert(err);
  });
}, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
        auth.Token(token).then((user) => {
        if (user) {
          setCurrentUser(user);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      }).catch((err) => {
        console.log(err);
      });
      }
    }

  const handleRegister = ({ password, email, name }) => {
    return auth.register({ password, email, name })
      .then((user) => {
        if (user) {
            handleLogin({email, password});
        }
        console.log('fff')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleLogin = ({ password, email }) => {
    return auth.login({ password, email })
      .then((res) => {
        if (res.token) {
           mainApi.setToken(res.token);
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          navigate("/movies");
          checkToken()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate('/');
    localStorage.clear();

  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <main className='content'>
        <Header 
         loggedIn={loggedIn} 
         />
          <Routes>
            <Route path='/signup' element={<Register handleRegister={handleRegister}/>} />
            <Route path='/signin' element={<Login handleLogin={handleLogin}/>} />
            <Route path='/' element={<Main />} /> 
            <Route path="/movies" element={<ProtectedRoute
              component={Movies}
              loggedIn={loggedIn}
              movies={movies}
            />
            } />
            <Route path="/saved-movies" element={<ProtectedRoute
              component={SavedMovies}
              loggedIn={loggedIn}
              movies={movies}


            />
            } />
            <Route path="/profile" element={<ProtectedRoute
              component={Profile}
              loggedIn={loggedIn}
              onProfileExit={handleLogOut} 
            />
            } />
                  <Route path='*' element={<PageNotFound/>} /> 
              </Routes>
          </main>
          <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;




