import { useEffect, useState } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
// http://www.omdbapi.com/?apikey=fdebce96
// key: fdebce96

const API_URL = 'https://www.omdbapi.com/?apikey=fdebce96';

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('Star wars');
  }, []);

  return (
      <div className="app">
        <h1>MovieOcean</h1>

        <div className="search">
          <input 
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
          />
          <img 
            src={SearchIcon}
            alt="Search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>
        {
          movies?.length > 0 ? (
            <div className="container">
              {movies.map((movie) => (
                <MovieCard movie={movie}/>
              ))}
              
            </div>
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }
        
      </div>
  );
}

export default App;
