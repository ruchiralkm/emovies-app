import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "https://www.omdbapi.com/?apikey=fd416966";

const MovieCard = ({ movie }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    <img
      src={
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/400x600?text=No+Poster"
      }
      alt={movie.Title}
      className="w-full h-64 object-cover"
    />
    <motion.div
      className="p-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <span className="text-sm text-green-400 font-semibold">{movie.Type}</span>
      <h3 className="text-xl font-bold text-white mt-2">{movie.Title}</h3>
      <p className="text-gray-400 mt-1">{movie.Year}</p>
    </motion.div>
  </motion.div>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.header
        className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg py-4 sticky top-0 z-10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <div className="container mx-auto px-4">
          <nav className="flex justify-between items-center">
            <motion.h1
              className="text-3xl font-bold text-green-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              EMovies
            </motion.h1>
            <div className="space-x-6">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-green-400 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </nav>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-12">
        <motion.form
          onSubmit={handleSearch}
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search any movies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 px-5 pr-12 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
            />
            <motion.button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={24} />
            </motion.button>
          </div>
        </motion.form>

        {loading && (
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}

        {error && (
          <motion.p
            className="text-center text-red-500 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
          >
            {error}
          </motion.p>
        )}

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default MovieSearch;
