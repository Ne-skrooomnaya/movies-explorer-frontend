import './Movies.css'
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

const Movies = () => {
    return (
        <>
          <SearchForm />
          <MoviesCardList />
        </>
    )
}

export default Movies;