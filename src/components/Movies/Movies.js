import './Movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

const Movies = ({loggedIn, movies}) => {
    return (
        <>
          <SearchForm />
          <MoviesCardList loggedIn={loggedIn} movies={movies}/>
        </>
    )
}

export default Movies;