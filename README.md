# Movie Browser - Discover Your Next Favorite Film

## Overview
Movie Browser is a comprehensive movie discovery platform that helps you find, explore, and save your favorite films. Built with Next.js and leveraging TMDB and OMDb APIs, this application offers a seamless experience for movie enthusiasts to browse thousands of titles, get personalized recommendations, and create custom watchlists.

```bash
# Movie Browser Directory Structure
movie-browser/
├── .env.local              # Environment variables
├── components/
│   ├── AuthForm.js         # Authentication modal
│   ├── FeatureGrid.js      # Featured movie grid
│   ├── Footer.js           # Site footer
│   ├── Header.js           # Navigation header
│   ├── HeroSection.js      # Main hero component
│   └── MovieCard.js        # Individual movie card
├── context/
│   ├── AuthContext.js      # User authentication context
│   └── MyListContext.js    # Watchlist context
├── pages/
│   ├── index.js            # Home page
│   └── movies.js           # Movie browsing page
├── public/                 # Static assets
├── styles/                 # Global styles
├── utils/                  # Utility functions
└── README.md               # Project documentation
```

## Key Features
- 🎬 **Cinematic UI** with dark theme and immersive visuals
- 🔍 **Advanced Search** with real-time results
- ⭐ **Personalized Recommendations** based on preferences
- 📺 **My Watchlist** functionality with local storage
- 📱 **Fully Responsive** design for all devices
- 🔒 **User Authentication** with signup/login
- 🎥 **Detailed Movie Information** with trailers

## Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- TMDB API key (free tier available)
- OMDb API key (free tier available)

## Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-browser.git
cd movie-browser
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser at:
```
http://localhost:3000
```

## API Integration
Movie Browser integrates with two powerful movie APIs:

1. **The Movie Database (TMDB) API**:
   - Primary source for movie data
   - Provides up-to-date movie information
   - Handles search, filtering, and categorization

2. **OMDb API**:
   - Supplemental movie details
   - Ratings from multiple sources
   - Extended metadata (director, cast, box office)

## Key Components
### `MovieCard.js`
The heart of the application - displays movie information with:
- Dynamic poster loading
- Rating display
- Add to watchlist functionality
- View details modal with extended information
- Direct trailer access

### `AuthContext.js`
Manages user authentication with:
- Signup/login functionality
- Session persistence
- Protected routes
- User state management

### `MyListContext.js`
Handles watchlist operations:
- Add/remove movies
- Local storage synchronization
- List persistence
- Cross-component accessibility

## Troubleshooting
If you encounter issues:

1. Verify your API keys in `.env.local`
2. Ensure you have internet connection
3. Check browser console for errors
4. Confirm Node.js version is v18+
5. Clear browser cache if UI issues persist

Common solutions:
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Deployment
To deploy to Vercel:

1. Create a Vercel account
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Run deployment command:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
```
TMDB_API_KEY=your_tmdb_api_key
OMDB_API_KEY=b1026bdf
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## Acknowledgements
- The Movie Database (TMDB) for their excellent API
- OMDb API for supplemental movie data
- Next.js team for the powerful React framework
- Tailwind CSS for the utility-first CSS framework

---

**Discover your next favorite film with Movie Browser today!** 🎥🍿
