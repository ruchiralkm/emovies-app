import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const API_URL = "https://www.omdbapi.com/?apikey=fd416966";

const MovieCard = ({ movie }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
    <img
      src={
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/400x600?text=No+Poster"
      }
      alt={movie.Title}
      className="w-full h-64 object-cover"
    />
    <div className="p-4">
      <span className="text-sm text-green-400">{movie.Type}</span>
      <h3 className="text-xl font-semibold text-white mt-2">{movie.Title}</h3>
      <p className="text-gray-400 mt-1">{movie.Year}</p>
    </div>
  </div>
);

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async (title) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&s=${encodeURIComponent(title)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("An error occurred while fetching movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("Jurassic Park");
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-green-400">EMovies</h1>
            <div className="space-x-4">
              <a href="#" className="hover:text-green-400">
                Home
              </a>
              <a href="#" className="hover:text-green-400">
                About
              </a>
              <a href="#" className="hover:text-green-400">
                Services
              </a>
              <a href="#" className="hover:text-green-400">
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSearch} className="flex justify-center mb-8">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search any movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-4 pr-10 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400"
            >
              <Search size={20} />
            </button>
          </div>
        </form>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MovieSearch;
