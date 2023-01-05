import React, {useState, useEffect}   from 'react';
import { Route, useNavigate, Routes } from "react-router-dom";
import { useLocation } from 'react-router-dom';

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
  // const [userEmail, setUserEmail] = useState("");
  // const [userName, setUserName] = useState("");
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);
  const [infoTooltipMessage, setInfoTooltipMessage] = useState('');
  const [isGoodInfoTooltip, setIsGoodInfoTooltip] = useState(false);
  // const [selectedCard, setSelectedCard] = useState(null);
//   const [moviesToDelete, setMoviesToDelete] = useState([]);

const [currentUser, setCurrentUser] = useState({});

useEffect(() => {
    checkToken();
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token');
    mainApi.getUser(token).then((data) => {
        setLoggedIn(true);
        console.log(data.data);
        setCurrentUser(data);
        // setUserEmail(data.email);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn ]);

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
    function logOut() {
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
      setLoggedIn(false);
          localStorage.clear();
    }


  function updateProfile({name, email}) {
    mainApi.editUser({name, email}).then(() => {
        setIsInfoTooltip(true);
        setIsGoodInfoTooltip(true);
        setInfoTooltipMessage('Профиль успешно обновлен.')
      })
    .catch((err) =>  {
      console.log(err);
    });
  }


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
              onProfileExit={logOut} 
               onUpdateProfileData={updateProfile}
            // email={userEmail} 
            // name={userName} 
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

// useEffect(() => {
//     if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/profile'
//         || location.pathname === '/saved-movies' || location.pathname === '/signin' || location.pathname === '/signup') {
//         setIsHeader(true);
//     } else {
//         setIsHeader(false);
//     }
// }, [location, isHeader]);

// useEffect(() => {
//     if (location.pathname === '/' || location.pathname === '/movies' || location.pathname === '/saved-movies') {
//         setIsFooter(true);
//     } else {
//         setIsFooter(false);
//     }
// }, [location, isHeader]);



//   useEffect(() => {
//     if (loggedIn) {
//       mainApi.getUser()
//       .then((data) => {
//         setCurrentUser(data);
//       }).catch((err) => console.log(`Ошибка: ${err}`));
//     }
//   }, [loggedIn]);\