import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_TMDB; // <-- Correct usage

    console.log("API Key inside React:", API_KEY); // Debug: should NOT be undefined

    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error("TMDB Error:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Hotstar Clone</h1>
      <h2>Popular Movies</h2>

      {movies.map((m) => (
        <div key={m.id}>
          <p>{m.title}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
