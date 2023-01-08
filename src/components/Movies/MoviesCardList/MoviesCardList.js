import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import movies from '../../../configs/utils'
import { useLocation } from 'react-router-dom';

const MoviesCardList = () => {

  const location = useLocation();

  const moviesButtonClass = location.pathname === '/saved-movies' ? 'movies__btn_hidden' : 'movies__btn';

  return (
    <section className="movies">
        <div className="movies__container">
            <ul className="movies__list">
                {movies.map((movie) => {
                    return (
                    <MoviesCard key={movie._id} movie={movie} />
                    );
                })}
            </ul>
        </div>
        <div className='movies__container-btn'>
            <button className={moviesButtonClass} type='button'>Ещё</button>
        </div>
    </section>
  );
};

export default MoviesCardList;