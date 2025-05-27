import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const games = [
    {
      title: 'Tic-Tac-Toe',
      description: 'A classic 3x3 grid game. Outsmart your opponent to win!',
      link: '/games/tic-tac-toe',
      image: 'https://res.cloudinary.com/drmroxs00/image/upload/v1748337664/tic-tac-toe_neon.jpg',
    },
    {
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards.',
      link: '/games/memory-match',
      image: 'https://res.cloudinary.com/drmroxs00/image/upload/v1748337664/memory-match_neon.jpg',
    },
    {
      title: 'Snake',
      description: 'Guide the snake to eat food and grow longer!',
      link: '/games/snake',
      image: 'https://res.cloudinary.com/drmroxs00/image/upload/v1748337664/snake_neon.jpg',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black dark:bg-gray-900 text-white transition-colors duration-500 relative overflow-hidden z-0">
      {/* Background Cyberpunk Cityscape */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-70"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/drmroxs00/image/upload/v1748337664/cyberpunk_city.jpg')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/50 dark:from-gray-900/80 dark:to-gray-900/50"></div>

      {/* Navbar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg shadow-neon-cyan py-4 px-8 flex justify-between items-center w-11/12 max-w-5xl rounded-3xl transition-all duration-300">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/drmroxs00/image/upload/v1748337664/image_m6pgje.jpg"
            alt="Bore2Game Logo"
            className="h-10 w-auto"
          />
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 1a7 7 0 016.97 6.254 5.5 5.5 0 11-6.97-6.97A7 7 0 0110 3z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 z-10">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-glitch">
          <h1 className="text-6xl font-extrabold tracking-tight text-cyan-400 dark:text-cyan-300 drop-shadow-neon mb-6">
            Bore2Game
          </h1>
          <p className="text-xl text-pink-400 dark:text-pink-300 max-w-2xl mx-auto">
            Dive into a neon-lit world of thrilling games. Beat boredom in style!
          </p>
          <a
            href="#games"
            className="mt-8 inline-block px-10 py-4 bg-cyan-500 text-black dark:bg-cyan-400 dark:text-gray-900 rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-colors duration-300 shadow-neon-cyan"
          >
            Start Playing
          </a>
        </section>

        {/* Game Cards */}
        <section id="games" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <Link
              key={index}
              to={game.link}
              className="group block bg-gray-900/80 dark:bg-gray-800/80 rounded-xl p-6 hover:shadow-neon-pink transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={game.image}
                alt={`${game.title} preview`}
                className="w-full h-40 object-cover rounded-lg mb-4 border-2 border-cyan-500 dark:border-cyan-400"
              />
              <h3 className="text-2xl font-semibold text-cyan-400 dark:text-cyan-300">{game.title}</h3>
              <p className="mt-2 text-gray-300 dark:text-gray-400">{game.description}</p>
              <span className="mt-4 inline-block text-pink-500 dark:text-pink-400 font-medium group-hover:underline">
                Play Now →
              </span>
            </Link>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-black/90 dark:bg-gray-800/90 py-8 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <img
            src="https://res.cloudinary.com/drmroxs00/image/upload/v1748337664/image_m6pgje.jpg"
            alt="Bore2Game Logo"
            className="h-12 w-auto mb-4"
          />
          <p className="text-sm text-gray-400 dark:text-gray-300 text-center">
            © {new Date().getFullYear()} Bore2Game. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6">
            <a href="#" className="text-pink-500 dark:text-pink-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-pink-500 dark:text-pink-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-pink-500 dark:text-pink-400 hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;