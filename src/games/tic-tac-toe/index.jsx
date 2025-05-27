"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Square = ({ value, onClick, isWinningSquare, darkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl font-bold flex items-center justify-center rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
        isWinningSquare
          ? "bg-gradient-to-br from-yellow-300 to-yellow-400 border-yellow-500 text-gray-900 animate-pulse shadow-lg shadow-yellow-500/50"
          : value === "X"
            ? darkMode
              ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30"
              : "bg-gradient-to-br from-blue-400 to-blue-500 border-blue-300 text-white shadow-lg shadow-blue-500/30"
            : value === "O"
              ? darkMode
                ? "bg-gradient-to-br from-pink-500 to-pink-600 border-pink-400 text-white shadow-lg shadow-pink-500/30"
                : "bg-gradient-to-br from-pink-400 to-pink-500 border-pink-300 text-white shadow-lg shadow-pink-500/30"
              : darkMode
                ? "bg-gray-800/50 border-gray-600 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm"
                : "bg-white/80 border-gray-300 text-gray-700 hover:bg-gray-50 backdrop-blur-sm"
      }`}
    >
      {value}
    </button>
  )
}

const Navbar = ({ darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      scrolled ? 'scale-95' : 'scale-100'
    }`}>
      <div className={`px-8 py-4 rounded-3xl backdrop-blur-lg border transition-all duration-500 ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-purple-500/10' 
          : 'bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10'
      }`}>
        <div className="flex items-center justify-between min-w-[300px]">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">B2G</span>
            </div>
            <span className={`text-xl font-bold transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Bore2Game
            </span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              darkMode 
                ? 'bg-purple-600 focus:ring-offset-gray-900' 
                : 'bg-gray-300 focus:ring-offset-white'
            }`}
          >
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
              darkMode 
                ? 'transform translate-x-7 bg-yellow-300' 
                : 'transform translate-x-0 bg-white'
            }`}>
              {darkMode ? (
                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(""))
  const [isXTurn, setIsXTurn] = useState(true)
  const [status, setStatus] = useState("Next player: X")
  const [winningLine, setWinningLine] = useState(null)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark")
  const navigate = useNavigate()

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
    setDarkMode((prev) => !prev)
  }

  const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  const getWinner = (squares) => {
    for (const [x, y, z] of winningPatterns) {
      if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
        return { winner: squares[x], line: [x, y, z] }
      }
    }
    return null
  }

  const handleClick = (index) => {
    if (squares[index] || getWinner(squares)) return
    const newSquares = [...squares]
    newSquares[index] = isXTurn ? "X" : "O"
    setSquares(newSquares)
    setIsXTurn(!isXTurn)
  }

  const handleRestart = () => {
    setSquares(Array(9).fill(""))
    setIsXTurn(true)
    setWinningLine(null)
    setStatus("Next player: X")
  }

  const handleBack = () => {
    navigate("/")
  }

  useEffect(() => {
    const result = getWinner(squares)
    if (result) {
      setWinningLine(result.line)
      setStatus(`🎉 Winner: ${result.winner}! 🎉`)
      // Confetti effect
      if (typeof window !== "undefined") {
        const colors = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"]
        for (let i = 0; i < 50; i++) {
          setTimeout(() => {
            const confetti = document.createElement("div")
            confetti.style.position = "fixed"
            confetti.style.left = Math.random() * 100 + "vw"
            confetti.style.top = "-10px"
            confetti.style.width = "10px"
            confetti.style.height = "10px"
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
            confetti.style.borderRadius = "50%"
            confetti.style.pointerEvents = "none"
            confetti.style.zIndex = "1000"
            confetti.style.animation = "fall 3s linear forwards"
            document.body.appendChild(confetti)
            setTimeout(() => confetti.remove(), 3000)
          }, i * 50)
        }
      }
    } else if (squares.every((item) => item)) {
      setStatus("🤝 It's a Draw! 🤝")
    } else {
      setStatus(`Next player: ${isXTurn ? "X" : "O"}`)
    }
  }, [squares, isXTurn])

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      }`}
    >
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <div
        className={`flex flex-col items-center mt-24 p-8 rounded-3xl border transition-all duration-500 backdrop-blur-lg max-w-md w-full ${
          darkMode
            ? "bg-gray-900/50 border-gray-700/50 shadow-2xl shadow-purple-500/10"
            : "bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10"
        }`}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="self-start mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          ← Back to Home
        </button>

        {/* Game Title */}
        <div className="text-center mb-8">
          <h1
            className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-500 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Tic Tac Toe
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 relative mb-8">
          {squares.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleClick(index)}
              isWinningSquare={winningLine?.includes(index)}
              darkMode={darkMode}
            />
          ))}

          {/* Winning Line Animation */}
          {winningLine && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full relative">
                <div
                  className={`absolute bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full animate-draw-line ${
                    // Row lines
                    winningLine.join("-") === "0-1-2"
                      ? "top-2 md:top-3 left-0 w-full h-1"
                      : winningLine.join("-") === "3-4-5"
                        ? "top-1/2 left-0 w-full h-1 -translate-y-1/2"
                        : winningLine.join("-") === "6-7-8"
                          ? "bottom-2 md:bottom-3 left-0 w-full h-1"
                          : // Column lines
                            winningLine.join("-") === "0-3-6"
                            ? "left-2 md:left-3 top-0 h-full w-1"
                            : winningLine.join("-") === "1-4-7"
                              ? "left-1/2 top-0 h-full w-1 -translate-x-1/2"
                              : winningLine.join("-") === "2-5-8"
                                ? "right-2 md:right-3 top-0 h-full w-1"
                                : // Diagonal lines
                                  winningLine.join("-") === "0-4-8"
                                  ? "top-1/2 left-1/2 w-full h-1 -translate-x-1/2 -translate-y-1/2 rotate-45 origin-center"
                                  : winningLine.join("-") === "2-4-6"
                                    ? "top-1/2 left-1/2 w-full h-1 -translate-x-1/2 -translate-y-1/2 -rotate-45 origin-center"
                                    : ""
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Game Status */}
        <h2
          className={`text-xl md:text-2xl font-semibold mb-6 text-center transition-colors duration-500 ${
            darkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {status}
        </h2>

        {/* Restart Button */}
        <button
          onClick={handleRestart}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          🔄 New Game
        </button>

        {/* Game Stats */}
        <div className="mt-6 flex space-x-6">
          <div className="text-center">
            <div
              className={`text-sm font-medium transition-colors duration-500 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Player X
            </div>
            <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg mx-auto mt-1"></div>
          </div>
          <div className="text-center">
            <div
              className={`text-sm font-medium transition-colors duration-500 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Player O
            </div>
            <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg mx-auto mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicTacToe