import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  const API_KEY = process.env.REACT_APP_TMDB;

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      )
      .then((res) => {
        setMovie(res.data.results[0]); // pick first movie
      });
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundImage: movie
          ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
          : "none",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">{movie?.title}</h1>
        <p className="banner-description">{movie?.overview}</p>
      </div>
    </header>
  );
}

export default Banner;
