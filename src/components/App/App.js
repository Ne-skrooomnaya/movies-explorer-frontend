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

import * as auth from "../../utils/Auth";
import { CurrentUserContext } from "../../configs/currentUserContext";
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  const navigate = useNavigate();
  
  const [movies, setMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [selectedCard, setSelectedCard] = useState(null);
//   const [moviesToDelete, setMoviesToDelete] = useState([]);

const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});

useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      navigate("/movies");
    }
  }, [loggedIn, navigate]);

//   useEffect(() => {
//     if (loggedIn) {
//       mainApi.getUser()
//       .then((data) => {
//         setCurrentUser(data);
//       }).catch((err) => console.log(`Ошибка: ${err}`));
//     }
//   }, [loggedIn]);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
        auth.Token(token).then((res) => {
        if (res.email) {
          setUserEmail(res.email);
          setLoggedIn(true);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

//   const handleLogin = ({ email, password }) => {
//       setLoggedIn(true);
//       console.log({ email, password });
//       navigate('/movies');
//   };

  const handleLogin = ({ password, email }) => {
    return auth.login({ password, email })
      .then((res) => {
        if (res.token) {
          mainApi.setToken(res.token);
          localStorage.setItem("token", res.token);
          // tokenCheck();
          navigate("/movies");
        }
        setLoggedIn(true);
        setUserEmail(email);
      })
      .catch((err) => {
        console.log(err);
        // setInfoTooltipOpen({ opened: true, success: false });
      });
  }
//   const handleRegister = ({ name, email, password }) => {
//       setLoggedIn(true);
//       console.log({ name, email, password });
//       navigate('/movies');
//   };

const handleRegister = ({ password, email, name }) => {
    return auth.register({ password, email, name })
      .then((data) => {
        if (data.email) {
          localStorage.setItem("token", data.token);
          setUserEmail(email);
        }
        // setInfoTooltipOpen({ opened: true, success: true });
        navigate("/movies");
      })
      .catch((err) => {
        console.log(err);
        // setInfoTooltipOpen({ opened: true, success: false });
      });
  }

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    // setCurrentUser({});
    setUserEmail(null);
    setLoggedIn(false);
  }

  const handleClick = (card) => {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <main className='content'>
        <Header 
         email={userEmail} 
         loggedIn={loggedIn} 
         onClick={handleClick}
         handleLogOut={handleLogOut} 
         />
                  <Routes>
                  <Route path='/signup' element={<Register handleRegister={handleRegister}/>} />
                  <Route path='/signin' element={<Login handleLogin={handleLogin}/>} />
                  <Route path='/' element={<Main />} /> 
                  {/* <Route path='/movies' element={<Movies />} /> */}

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
            handleLogOut={handleLogOut}            />
            } />
                  {/* <Route path='/saved-movies' element={<SavedMovies />} /> */}
                  {/* <Route path='/profile' element={<Profile handleLogOut={handleLogOut}/>} /> */}
                  <Route path='*' element={<PageNotFound/>} /> 
              </Routes>
          </main>
          <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;
