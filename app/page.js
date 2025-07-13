import Head from "next/head";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FeatureGrid from "./components/FeatureGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Head>
        <title>Movie Explorer | Discover Your Next Favorite Film</title>
        <meta
          name="description"
          content="Explore thousands of movies with Movie Explorer"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Enhanced Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="bg-gradient-to-t from-gray-900 to-transparent absolute inset-0 z-10"></div>
            <div className="bg-gradient-to-r from-gray-900 to-transparent absolute inset-0 z-10"></div>
            <div className="bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center w-full h-full opacity-30"></div>
          </div>

          <div className="container mx-auto px-4 z-20 text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Your Next Favorite Film
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Explore thousands of movies, curated collections, and personalized
              recommendations
            </p>
            <Link
              href="/movies"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl transition duration-300 transform hover:scale-105"
            >
              Explore Movies
            </Link>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                Discover Amazing Movies
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Browse through our curated collections of popular, top-rated,
                and upcoming films. Find your next movie night favorite with our
                powerful search and discovery tools.
              </p>
            </div>

            <FeatureGrid />

            <div className="text-center mt-16">
              <Link
                href="/movies"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Explore All Movies
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-800">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                {/* Enhanced Featured Movie Preview */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10"></div>
                  <div className="bg-[url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center w-full h-96"></div>

                  <div className="absolute bottom-0 left-0 p-8 z-20">
                    <div className="flex items-center mb-3">
                      <span className="bg-yellow-500 text-gray-900 font-bold py-1 px-3 rounded-md mr-3">
                        4.8 ★
                      </span>
                      <span className="bg-red-600 text-white py-1 px-3 rounded-md">
                        NEW
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">
                      The Midnight Runner
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Action | Thriller | 2023
                    </p>
                    <button className="bg-white text-gray-900 hover:bg-gray-200 font-bold py-2 px-6 rounded-lg flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Watch Trailer
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl font-bold mb-6">
                  Personalized Recommendations
                </h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our intelligent system learns your preferences and suggests
                  movies you'll love. Rate films to improve your recommendations
                  and create your personal watchlist.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-1 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Personalized movie recommendations</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-1 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="CurrentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Create and share watchlists</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-1 mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Get notified about new releases</span>
                  </li>
                </ul>
                <Link
                  href="/movies"
                  className="inline-block bg-transparent hover:bg-blue-600 text-blue-500 hover:text-white border-2 border-blue-500 text-lg font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Create Your Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
