import Link from "next/link";

export default function FeatureGrid() {
  const features = [
    {
      title: "Popular Movies",
      description: "Discover what everyone is watching right now",
      link: "/movies?category=popular",
      color: "bg-blue-500",
    },
    {
      title: "Top Rated",
      description: "Find critically acclaimed masterpieces",
      link: "/movies?category=top_rated",
      color: "bg-red-500",
    },
    {
      title: "Upcoming Releases",
      description: "See what's coming soon to theaters",
      link: "/movies?category=upcoming",
      color: "bg-green-500",
    },
    {
      title: "Now Playing",
      description: "Find movies currently in theaters",
      link: "/movies?category=now_playing",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((feature, index) => (
        <Link key={index} href={feature.link} className="group">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg h-full transform transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
            <div className={`h-2 ${feature.color}`}></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="flex items-center text-blue-400 font-semibold">
                <span>Explore</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
