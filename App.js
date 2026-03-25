import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB}`)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.error(err));
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
