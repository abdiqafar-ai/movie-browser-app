const OMDB_KEY = process.env.OMDB_API_KEY || "b1026bdf";
const OMDB_BASE = "https://www.omdbapi.com/";

export async function getMovieFromOmdb(imdbID) {
  const url = `${OMDB_BASE}?i=${imdbID}&apikey=${OMDB_KEY}`;

  // Set a timeout of 8 seconds
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`OMDb API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.Response === "False") {
      throw new Error(data.Error || "OMDb API returned an error");
    }

    return {
      id: data.imdbID,
      title: data.Title,
      overview: data.Plot,
      release_date: data.Released,
      vote_average: parseFloat(data.imdbRating) || 0,
      genres: data.Genre
        ? data.Genre.split(", ").map((name, i) => ({ id: i, name }))
        : [],
      poster_path: data.Poster !== "N/A" ? data.Poster : null,
      runtime: data.Runtime ? parseInt(data.Runtime, 10) || 0 : 0,
      ratings: data.Ratings || [],
      director: data.Director,
      actors: data.Actors,
      box_office: data.BoxOffice,
      imdb_id: data.imdbID,
      year: data.Year,
      country: data.Country,
      language: data.Language,
      awards: data.Awards,
      metascore: data.Metascore,
      imdb_votes: data.imdbVotes,
      type: data.Type,
      dvd: data.DVD,
      production: data.Production,
      website: data.Website,
    };
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`Error fetching movie ${imdbID} from OMDb:`, error);
    return {
      id: imdbID,
      title: "Movie Loading Failed",
      overview: "We couldn't load movie details. Please try again later.",
      release_date: new Date().toISOString().split("T")[0],
      vote_average: 0,
      genres: [],
      runtime: 0,
      ratings: [],
      director: "",
      actors: "",
      box_office: "",
    };
  }
}

// TMDB functions for the movie list page
const TMDB_API_KEY = "68e1a730a717815ae12bb720d90a2e38";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getTmdbMovieById(id) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching TMDB movie ID ${id}:`, error);
    return {
      id,
      title: "Movie Loading Failed",
      overview: "We couldn't load movie details. Please try again later.",
      release_date: new Date().toISOString().split("T")[0],
      vote_average: 0,
      genres: [],
      production_companies: [],
      runtime: 0,
    };
  }
}

export async function getPopularMovies(page = 1) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { results: [], total_pages: 1 };
  }
}

export async function searchMovies(query, page = 1) {
  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`
    );
    return await response.json();
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [], total_pages: 1 };
  }
}
