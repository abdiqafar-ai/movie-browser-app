import { useState, useEffect } from "react";
import { useMyList } from "../context/MyListContext";
import { useAuth } from "../context/AuthContext"; // Added auth context

export default function MovieCard({ movie, onOpenAuth }) {
  const [formattedDate, setFormattedDate] = useState("Unknown");
  const [isClient, setIsClient] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [detailedMovie, setDetailedMovie] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState(null);

  // Get current user from auth context
  const { currentUser } = useAuth();
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  const isSaved = isInMyList(movie.id);

  useEffect(() => {
    setIsClient(true);
    if (movie.release_date) {
      const date = new Date(movie.release_date);
      setFormattedDate(
        date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
    }
  }, [movie.release_date]);

  const fetchMovieDetails = async () => {
    setLoadingDetails(true);
    setError(null);

    try {
      // First get TMDB ID to IMDb ID conversion
      const tmdbRes = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=68e1a730a717815ae12bb720d90a2e38`
      );
      const tmdbData = await tmdbRes.json();
      const imdbId = tmdbData.imdb_id;

      if (!imdbId) {
        throw new Error("IMDb ID not found for this movie");
      }

      // Then fetch details from OMDB API
      const omdbRes = await fetch(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=b1026bdf`
      );
      const omdbData = await omdbRes.json();

      if (omdbData.Response === "False") {
        throw new Error(omdbData.Error || "Failed to fetch movie details");
      }

      setDetailedMovie({
        title: omdbData.Title,
        overview: omdbData.Plot,
        release_date: omdbData.Released,
        vote_average: parseFloat(omdbData.imdbRating) || 0,
        genres: omdbData.Genre
          ? omdbData.Genre.split(", ").map((name, i) => ({ id: i, name }))
          : [],
        poster_path: omdbData.Poster !== "N/A" ? omdbData.Poster : null,
        runtime: omdbData.Runtime ? parseInt(omdbData.Runtime) : 0,
        ratings: omdbData.Ratings || [],
        director: omdbData.Director,
        actors: omdbData.Actors,
        box_office: omdbData.BoxOffice,
        imdb_id: omdbData.imdbID,
        year: omdbData.Year,
        country: omdbData.Country,
        language: omdbData.Language,
        awards: omdbData.Awards,
      });
    } catch (error) {
      console.error("Failed to load movie details:", error);
      setError(error.message || "Failed to load movie details");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleViewDetails = () => {
    setShowDetails(true);
    if (!detailedMovie && !error) {
      fetchMovieDetails();
    }
  };

  // Fixed heart button functionality
  const handleHeartClick = (e) => {
    e.stopPropagation();

    // If user is not logged in, open auth modal
    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    // If user is logged in, toggle movie in list
    if (isSaved) {
      removeFromMyList(movie.id);
    } else {
      addToMyList(movie);
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-[2/3]">
          {movie.poster_path && !imageError ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-80"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Image Not Available</span>
            </div>
          )}
          <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold px-2 py-1 rounded-lg flex items-center">
            <span className="mr-1">★</span>
            {movie.vote_average.toFixed(1)}
          </div>

          {/* Heart button with fixed onClick */}
          <button
            onClick={handleHeartClick}
            className={`absolute top-2 left-2 p-2 rounded-full ${
              isSaved
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-700 hover:bg-gray-600"
            } transition-colors`}
            title={isSaved ? "Remove from My List" : "Add to My List"}
          >
            {isSaved ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-xl mb-2 line-clamp-1">{movie.title}</h3>

          <div className="flex justify-between items-center mb-3 text-sm text-gray-400">
            <span>
              {isClient
                ? formattedDate
                : movie.release_date?.split("-")[0] || "Unknown"}
            </span>
            <span>{movie.original_language.toUpperCase()}</span>
          </div>

          <p className="text-gray-300 text-sm line-clamp-3">
            {movie.overview || "No description available."}
          </p>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleViewDetails}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              View Details
            </button>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                movie.title + " trailer"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Trailer
            </a>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {showDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setShowDetails(false)}
        >
          <div
            className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">
                  {detailedMovie?.title || movie.title}
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
              </div>

              {loadingDetails ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                  <span className="ml-4">Loading movie details...</span>
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <div className="text-red-500 text-xl mb-4">{error}</div>
                  <button
                    onClick={fetchMovieDetails}
                    className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="rounded-xl overflow-hidden shadow-2xl aspect-[2/3] relative">
                      {detailedMovie?.poster_path ? (
                        <img
                          src={detailedMovie.poster_path}
                          alt={detailedMovie.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500">
                            Poster Not Available
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="bg-yellow-500 text-gray-900 font-bold px-3 py-1 rounded-lg flex items-center">
                        <span className="mr-1">★</span>
                        {detailedMovie?.vote_average?.toFixed(1) ||
                          movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-gray-300">
                        {detailedMovie?.release_date || formattedDate}
                      </span>
                      {detailedMovie?.runtime > 0 && (
                        <>
                          <span className="hidden md:block">•</span>
                          <span>{detailedMovie.runtime} minutes</span>
                        </>
                      )}
                    </div>

                    {detailedMovie?.director && (
                      <div className="mb-4">
                        <span className="font-semibold">Director: </span>
                        <span className="text-gray-300">
                          {detailedMovie.director}
                        </span>
                      </div>
                    )}

                    {detailedMovie?.actors && (
                      <div className="mb-4">
                        <span className="font-semibold">Cast: </span>
                        <span className="text-gray-300">
                          {detailedMovie.actors}
                        </span>
                      </div>
                    )}

                    {detailedMovie?.box_office && (
                      <div className="mb-6">
                        <span className="font-semibold">Box Office: </span>
                        <span className="text-gray-300">
                          {detailedMovie.box_office}
                        </span>
                      </div>
                    )}

                    {detailedMovie?.overview && (
                      <>
                        <h3 className="text-xl font-bold mb-3">Overview</h3>
                        <p className="text-gray-300 mb-8">
                          {detailedMovie.overview}
                        </p>
                      </>
                    )}

                    {detailedMovie?.genres?.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {detailedMovie.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {detailedMovie?.ratings?.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4">Ratings</h3>
                        <div className="space-y-2">
                          {detailedMovie.ratings.map((rating, index) => (
                            <div key={index} className="flex items-center">
                              <span className="font-medium w-32">
                                {rating.Source}:
                              </span>
                              <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-sm">
                                {rating.Value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                        movie.title + " trailer"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Watch Trailer
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
