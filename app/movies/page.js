"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";
import { useMyList } from "../context/MyListContext";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("popular");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "signup"

  const { currentUser, logout } = useAuth();
  const { myList } = useMyList();

  const API_KEY = "68e1a730a717815ae12bb720d90a2e38";
  const BASE_URL = "https://api.themoviedb.org/3";

  const fetchMovies = async (category, page = 1) => {
    try {
      setLoading(true);
      setError(null);

      let endpoint = "";

      if (category === "my_list") {
        setMovies(myList);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      switch (category) {
        case "popular":
          endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
          break;
        case "top_rated":
          endpoint = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`;
          break;
        case "upcoming":
          endpoint = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`;
          break;
        case "now_playing":
          endpoint = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`;
          break;
        case "search":
          endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            searchTerm
          )}&page=${page}`;
          break;
        default:
          endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
      }

      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const moviesWithImdbId = data.results.map((movie) => ({
          ...movie,
          imdb_id: movie.imdb_id || null,
        }));

        setMovies(moviesWithImdbId);
        setTotalPages(data.total_pages);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to load movies. Please try again later.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setActiveCategory("search");
      setCurrentPage(1);
      fetchMovies("search");
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setSearchTerm("");
    fetchMovies(category);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchMovies(activeCategory, newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  useEffect(() => {
    fetchMovies("popular");
  }, []);

  // Refresh my list when it changes
  useEffect(() => {
    if (activeCategory === "my_list") {
      fetchMovies("my_list");
    }
  }, [myList]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>Movie Browser | Discover Films</title>
        <meta name="description" content="Browse thousands of movies" />
      </Head>

      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        currentUser={currentUser}
        onLogout={logout}
        onOpenAuth={handleOpenAuthModal}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Movie Explorer
          </h1>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["popular", "top_rated", "upcoming", "now_playing", "my_list"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-gray-800 hover:bg-gray-700"
                  } ${
                    category === "my_list" && !currentUser
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  disabled={category === "my_list" && !currentUser}
                  title={
                    category === "my_list" && !currentUser
                      ? "Login to view your list"
                      : ""
                  }
                >
                  {category === "my_list"
                    ? "MY LIST"
                    : category.replace("_", " ").toUpperCase()}
                </button>
              )
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <div className="text-red-500 text-xl mb-4">{error}</div>
            <button
              onClick={() => fetchMovies(activeCategory, currentPage)}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : activeCategory === "my_list" && myList.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-xl mb-4">Your list is empty</div>
            <p className="mb-6">Add movies to your list to see them here</p>
            <button
              onClick={() => handleCategoryChange("popular")}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Movies
            </button>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-xl mb-4">No movies found</div>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveCategory("popular");
                fetchMovies("popular");
              }}
              className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Popular Movies
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onOpenAuth={() => handleOpenAuthModal("login")} // Add this prop
                />
              ))}
            </div>

            {activeCategory !== "my_list" && (
              <div className="flex justify-center mt-12 space-x-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-700 cursor-not-allowed opacity-50"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  Previous
                </button>

                <div className="flex items-center px-6 py-3 bg-gray-800 rounded-lg">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-3 rounded-lg ${
                    currentPage === totalPages
                      ? "bg-gray-700 cursor-not-allowed opacity-50"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div
            className="bg-gray-800 rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {authMode === "login" ? "Login" : "Create Account"}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <AuthForm
              mode={authMode}
              onClose={() => setShowAuthModal(false)}
              onSwitchMode={() =>
                setAuthMode(authMode === "login" ? "signup" : "login")
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}
