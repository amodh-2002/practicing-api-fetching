import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  const searchMovies = async () => {
    if (query.trim() === '') return;

    const response = await axios.get(
      `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
    );
    if (response.data.Search) {
      console.log(response.data.Search);
      setMovies(response.data.Search);
    } else {
      setMovies([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Movie Search App</h1>

      <div className="flex items-center bg-gray-800 rounded-lg p-2">
        <input
          type="text"
          placeholder="Search For A Movie.."
          value={query}
          className="text-black"
          onChange={(event) => setQuery(event.target.value)}
        />
        <button onClick={searchMovies}>
          <FaSearch />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <h2>{movie.Title}</h2>
              <p>{movie.Year}</p>
            </div>
          ))
        ) : (
          <p>No Movies found!!</p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
