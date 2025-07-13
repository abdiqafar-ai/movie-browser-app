import Link from "next/link";

export default function Header({
  searchTerm,
  setSearchTerm,
  handleSearch,
  currentUser,
  onLogout,
  onOpenAuth,
}) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-400 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            MovieBrowser
          </Link>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-xl mx-4 mb-4 md:mb-0"
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search movies..."
              className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        <div className="flex items-center">
          {currentUser ? (
            <div className="flex items-center">
              <span className="mr-4 text-gray-300 hidden md:inline">
                Hi, {currentUser.email.split("@")[0]}
              </span>
              <button
                onClick={onLogout}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => onOpenAuth("login")}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth("signup")}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
