import './SavedMovies.css'
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

const SavedMovies = () => {
    return (
        <>
          <SearchForm />
          <MoviesCardList />
        </>
    )
}

export default SavedMovies;