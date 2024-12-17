import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import './App.css';

const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const fetchMovies = useCallback(async (term) => {
    const url = term ? `${SEARCH_API}${term}` : API_URL;

    if (!navigator.onLine) {
      console.warn('Offline: Using cached data');
      const cachedData = localStorage.getItem(url);
      if (cachedData) {
        setMovies(JSON.parse(cachedData));
      }
      return;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (data.results) {
      setMovies(data.results);
      localStorage.setItem(url, JSON.stringify(data.results));
    }
  }, []);

  useEffect(() => {
    fetchMovies();

    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [fetchMovies]);

  return (
    <div className="App">
      <Header />
      {isOffline && <div className="offline-banner">You are offline! Serving cached movies.</div>}
      <main>
        <form onSubmit={(e) => { e.preventDefault(); fetchMovies(searchTerm); }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="submit">Search</button>
        </form>
        <div className="card-container">
          {movies.length > 0 ? movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          )) : (
            <div className="loading">Loading movies...</div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
