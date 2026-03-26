import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Row.css";

function Row({ title, fetchUrl, onMovieClick }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(fetchUrl).then((res) => setMovies(res.data.results));
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="movies">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            onClick={() => onMovieClick(movie)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
