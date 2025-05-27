"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import GameCard from "./components/GameCard"
import "./App.css"

const games = [
  {
    id: 1,
    name: "Tic Tac Toe",
    image: "https://res.cloudinary.com/drmroxs00/image/upload/v1748341601/tictactoe_h4a9zc.jpg",
    rating: 4.8,
    description: "A classic 3x3 grid game!",
    link: "/tic-tac-toe",
  },
  {
    id: 2,
    name: "Sudoku Pro",
    image: "https://res.cloudinary.com/drmroxs00/image/upload/v1748349393/apps_akgbns.webp",
    rating: 4.7,
    description: "Show your number skills!",
    link: "/sudoku-pro",
  },
  {
    id: 3,
    name: "Snake",
    image: "https://res.cloudinary.com/drmroxs00/image/upload/v1748347981/snake-8_dlqy85.png",
    rating: 4.9,
    description: "Eat & Grow!",
    link: "/snake",
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDarkMode(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light")
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      }`}
    >
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1
              className={`text-6xl md:text-8xl font-bold mb-6 transition-colors duration-500 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Welcome to
            </h1>
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Bore2Game
              </h2>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur opacity-20 animate-pulse"></div>
            </div>
          </div>

          <p
            className={`text-xl md:text-2xl mt-8 mb-12 max-w-3xl mx-auto transition-colors duration-500 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover amazing games and turn your boredom into excitement
          </p>

          {/* Floating Elements */}
          <div className="relative">
            <div className="absolute top-0 left-1/4 w-20 h-20 bg-purple-500 rounded-full opacity-20 animate-float"></div>
            <div className="absolute top-20 right-1/4 w-16 h-16 bg-pink-500 rounded-full opacity-20 animate-float-delayed"></div>
            <div className="absolute -top-10 left-1/2 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-float-slow"></div>
          </div>
        </div>
      </section>

      {/* Top Games Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3
              className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Top Games
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <GameCard key={game.id} game={game} darkMode={darkMode} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-6 border-t transition-colors duration-500 ${
          darkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-white/50"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className={`transition-colors duration-500 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
           <a 
              href="https://www.linkedin.com/in/shamveel-p/" 
              target="_blank"
              className="relative group text-blue-600 hover:underline mr-2"
            >
              Shamveel P
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-300 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                LinkedIn
              </span>
            </a>

  | Coding Aashan © 2025 Bore2Game. Made with ❤️ for gamers
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
