import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[80vh] flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/movie.jpeg"
        alt="Movie Explorer"
        layout="fill"
        objectFit="cover"
        className="z-0"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-1"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Discover Your Next Favorite Film
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Explore thousands of movies, curated collections, and personalized
          recommendations
        </p>
        <Link
          href="/movies"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          Explore Movies
        </Link>
      </div>
    </div>
  );
}
