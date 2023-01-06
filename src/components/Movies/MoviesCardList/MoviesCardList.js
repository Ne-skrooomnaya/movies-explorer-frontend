import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
// import movies from '../../../utils/utils'
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {

  const location = useLocation();

  const moviesButtonClass = location.pathname === '/saved-movies' ? 'movies__btn_hidden' : 'movies__btn';

  return (
    <section className="movies">
        <div className="movies__container">
            <ul className="movies__list">
            {
              // eslint-disable-next-line array-callback-return
              props.movies.map((movie) => {
                    <MoviesCard 
                    key={movie._id} 
                    movie={movie} 
                    // onCardClick={props.onCardClick}
                    // onCardLike={props.onCardLike}
                    // onCardDelete={props.onCardDelete}
                    />
                })
                }
            </ul>
        </div>
        <div className='movies__container-btn'>
            <button className={moviesButtonClass} type='button'>Ещё</button>
        </div>
    </section>
  );
};

export default MoviesCardList;