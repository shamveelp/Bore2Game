"use client"

import { useEffect, useState } from "react"

const Navbar = ({ darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "scale-95" : "scale-100"
      }`}
    >
      <div
        className={`px-8 py-4 rounded-3xl backdrop-blur-lg border transition-all duration-500 ${
          darkMode
            ? "bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-purple-500/10"
            : "bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10"
        }`}
      >
        <div className="flex items-center justify-between min-w-[300px]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span
              className={`text-xl font-bold transition-colors duration-500 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Bore2Game
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              darkMode ? "bg-purple-600 focus:ring-offset-gray-900" : "bg-gray-300 focus:ring-offset-white"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${
                darkMode ? "transform translate-x-7 bg-yellow-300" : "transform translate-x-0 bg-white"
              }`}
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
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

const onBack = () => {
  window.history.go(-2); // Go back 2 steps in browser history
};

const LevelSelection = ({ onLevelSelect, darkMode, onBack }) => {
  const levels = [
    {
      name: "Easy",
      description: "Perfect for beginners",
      icon: "🌱",
      color: "from-green-400 to-green-600",
      lives: 5,
      difficulty: "easy",
    },
    {
      name: "Medium",
      description: "A good challenge",
      icon: "🔥",
      color: "from-orange-400 to-orange-600",
      lives: 4,
      difficulty: "medium",
    },
    {
      name: "Hard",
      description: "For experts only",
      icon: "💀",
      color: "from-red-400 to-red-600",
      lives: 3,
      difficulty: "hard",
    },
  ]

  
  

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      }`}
    >
      <div
        className={`text-center mb-12 p-8 rounded-3xl border transition-all duration-500 backdrop-blur-lg ${
          darkMode
            ? "bg-gray-900/50 border-gray-700/50 shadow-2xl shadow-purple-500/10"
            : "bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => window.location.href = "/"}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            ← Back
          </button>
          <h1
            className={`text-4xl md:text-6xl font-bold transition-colors duration-500 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Choose Your Level
          </h1>
          <div className="w-16"></div> {/* Spacer for alignment */}
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {levels.map((level, index) => (
          <div
            key={level.name}
            onClick={() => onLevelSelect(level.difficulty, level.lives)}
            className={`group cursor-pointer p-8 rounded-3xl border transition-all duration-500 backdrop-blur-lg transform hover:scale-105 hover:-translate-y-2 ${
              darkMode
                ? "bg-gray-900/50 border-gray-700/50 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20"
                : "bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10 hover:shadow-gray-500/20"
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">{level.icon}</div>
              <h3
                className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {level.name}
              </h3>
              <p
                className={`text-sm mb-4 transition-colors duration-500 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {level.description}
              </p>
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${level.color} group-hover:shadow-lg transition-all duration-300`}
              >
                {level.lives} Lives
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const NumberSelector = ({ onNumberSelect, onClose, darkMode }) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className={`p-6 rounded-3xl border transition-all duration-500 backdrop-blur-lg ${
          darkMode ? "bg-gray-900/90 border-gray-700/50 shadow-2xl" : "bg-white/90 border-gray-200/50 shadow-2xl"
        }`}
      >
        <h3 className={`text-xl font-bold mb-4 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
          Select a Number
        </h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => onNumberSelect(num)}
              className={`w-12 h-12 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
              } border-2`}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNumberSelect(0)}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              darkMode ? "bg-red-600 text-white hover:bg-red-700" : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Clear
          </button>
          <button
            onClick={onClose}
            className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-300 ${
              darkMode ? "bg-gray-600 text-white hover:bg-gray-700" : "bg-gray-500 text-white hover:bg-gray-600"
            }`}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

const GameOverPopup = ({ onRestart, darkMode }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className={`p-6 rounded-3xl border transition-all duration-500 backdrop-blur-lg ${
          darkMode ? "bg-gray-900/90 border-gray-700/50 shadow-2xl" : "bg-white/90 border-gray-200/50 shadow-2xl"
        }`}
      >
        <h3 className={`text-xl font-bold mb-4 text-center ${darkMode ? "text-white" : "text-gray-900"}`}>
          💀 Game Over! No Lives Left! 💀
        </h3>
        <button
          onClick={onRestart}
          className={`w-full py-2 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            darkMode
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
          }`}
        >
          🔄 Restart
        </button>
      </div>
    </div>
  )
}

const SudokuGame = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark")
  const [gameState, setGameState] = useState("levelSelect") // 'levelSelect', 'playing', 'won', 'lost'
  const [level, setLevel] = useState("")
  const [lives, setLives] = useState(5)
  const [maxLives, setMaxLives] = useState(5)
  const [board, setBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0)),
  )
  const [solution, setSolution] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0)),
  )
  const [initialBoard, setInitialBoard] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0)),
  )
  const [selectedCell, setSelectedCell] = useState(null)
  const [showNumberSelector, setShowNumberSelector] = useState(false)
  const [history, setHistory] = useState([])
  const [errors, setErrors] = useState(new Set())

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

  const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num) return false
    }
    for (let x = 0; x < 9; x++) {
      if (board[x][col] === num) return false
    }
    const startRow = row - (row % 3)
    const startCol = col - (col % 3)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false
      }
    }
    return true
  }

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (solveSudoku(board)) return true
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  const generateSudoku = (difficulty) => {
    const newBoard = Array(9)
      .fill()
      .map(() => Array(9).fill(0))

    for (let box = 0; box < 9; box += 3) {
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5)
      let numIndex = 0
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          newBoard[box + i][box + j] = nums[numIndex++]
        }
      }
    }

    solveSudoku(newBoard)
    const completeSolution = newBoard.map((row) => [...row])

    const cellsToRemove = difficulty === "easy" ? 40 : difficulty === "medium" ? 50 : 60
    const positions = []
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        positions.push([i, j])
      }
    }

    positions.sort(() => Math.random() - 0.5)
    for (let i = 0; i < cellsToRemove; i++) {
      const [row, col] = positions[i]
      newBoard[row][col] = 0
    }

    return { puzzle: newBoard, solution: completeSolution }
  }

  const handleLevelSelect = (selectedLevel, selectedLives) => {
    setLevel(selectedLevel)
    setLives(selectedLives)
    setMaxLives(selectedLives)
    const { puzzle, solution: completeSolution } = generateSudoku(selectedLevel)
    setBoard(puzzle)
    setSolution(completeSolution)
    setInitialBoard(puzzle.map((row) => [...row]))
    setGameState("playing")
    setHistory([])
    setErrors(new Set())
  }

  const handleCellClick = (row, col) => {
    if (gameState === "lost" || gameState === "won") {
      return
    }
    if (initialBoard[row][col] !== 0) return
    setSelectedCell([row, col])
    setShowNumberSelector(true)
  }

  const handleNumberSelect = (num) => {
    if (!selectedCell || gameState === "lost" || gameState === "won") return

    const [row, col] = selectedCell
    const newBoard = board.map((r) => [...r])
    setHistory((prev) => [...prev, { board: board.map((r) => [...r]), errors: new Set(errors) }])
    newBoard[row][col] = num
    setBoard(newBoard)

    if (num !== 0 && num !== solution[row][col]) {
      setLives((prev) => prev - 1)
      setErrors((prev) => new Set([...prev, `${row}-${col}`]))
      if (lives - 1 <= 0) {
        setGameState("lost")
      }
    } else if (num === solution[row][col]) {
      setErrors((prev) => {
        const newErrors = new Set(prev)
        newErrors.delete(`${row}-${col}`)
        return newErrors
      })
    }

    const isSolved = newBoard.every((row, i) => row.every((cell, j) => cell === solution[i][j]))
    if (isSolved) {
      setGameState("won")
      if (typeof window !== "undefined") {
        const colors = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"]
        for (let i = 0; i < 100; i++) {
          setTimeout(() => {
            const confetti = document.createElement("div")
            confetti.style.position = "fixed"
            confetti.style.left = Math.random() * 100 + "vw"
            confetti.style.top = "-10px"
            confetti.style.width = "8px"
            confetti.style.height = "8px"
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
            confetti.style.borderRadius = "50%"
            confetti.style.pointerEvents = "none"
            confetti.style.zIndex = "1000"
            confetti.style.animation = "fall 3s linear forwards"
            document.body.appendChild(confetti)
            setTimeout(() => confetti.remove(), 3000)
          }, i * 30)
        }
      }
    }

    setShowNumberSelector(false)
    setSelectedCell(null)
  }

  const handleUndo = () => {
    if (history.length === 0) return

    const lastState = history[history.length - 1]
    setBoard(lastState.board)
    setErrors(lastState.errors)
    setHistory((prev) => prev.slice(0, -1))
  }

  const handleRestart = () => {
    setBoard(initialBoard.map((row) => [...row]))
    setLives(maxLives)
    setHistory([])
    setErrors(new Set())
    setGameState("playing")
  }

  const handleBack = () => {
    setGameState("levelSelect")
  }

  const handleLevelSelectBack = () => {
    // Reset game state to initial values
    setLevel("")
    setLives(5)
    setMaxLives(5)
    setBoard(
      Array(9)
        .fill()
        .map(() => Array(9).fill(0))
    )
    setSolution(
      Array(9)
        .fill()
        .map(() => Array(9).fill(0))
    )
    setInitialBoard(
      Array(9)
        .fill()
        .map(() => Array(9).fill(0))
    )
    setSelectedCell(null)
    setShowNumberSelector(false)
    setHistory([])
    setErrors(new Set())
  }

  const getCellStyle = (row, col, value) => {
    const isInitial = initialBoard[row][col] !== 0
    const isSelected = selectedCell && selectedCell[0] === row && selectedCell[1] === col
    const isError = errors.has(`${row}-${col}`)
    const isEmpty = value === 0

    let baseStyle = `w-8 h-8 md:w-10 md:h-10 text-sm md:text-base font-bold flex items-center justify-center border transition-all duration-300 ${
      isInitial ? "" : "cursor-pointer"
    } `

    if (row % 3 === 0) baseStyle += "border-t-2 "
    if (col % 3 === 0) baseStyle += "border-l-2 "
    if (row % 3 === 2) baseStyle += "border-b-2 "
    if (col % 3 === 2) baseStyle += "border-r-2 "

    if (isSelected) {
      baseStyle += darkMode
        ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/50 "
        : "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/50 "
    } else if (isError) {
      baseStyle += darkMode
        ? "bg-red-600/50 text-red-200 border-red-400 "
        : "bg-red-500/50 text-red-800 border-red-400 "
    } else if (isInitial) {
      baseStyle += darkMode
        ? "bg-gray-700 text-gray-200 border-gray-600 "
        : "bg-gray-200 text-gray-800 border-gray-400 "
    } else if (isEmpty) {
      baseStyle += darkMode
        ? "bg-gray-800/50 text-gray-400 border-gray-600 hover:bg-gray-700/50 "
        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 "
    } else {
      baseStyle += darkMode ? "bg-gray-800 text-blue-300 border-gray-600 " : "bg-blue-50 text-blue-600 border-gray-300 "
    }

    return baseStyle
  }

  if (gameState === "levelSelect") {
    return (
      <>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <LevelSelection onLevelSelect={handleLevelSelect} darkMode={darkMode} onBack={handleLevelSelectBack} />
      </>
    )
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
          : "bg-gradient-to-br from-gray-100 via-white to-gray-200"
      }`}
    >
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      <div
        className={`mt-24 p-6 rounded-3xl border transition-all duration-500 backdrop-blur-lg max-w-2xl w-full ${
          darkMode
            ? "bg-gray-900/50 border-gray-700/50 shadow-2xl shadow-purple-500/10"
            : "bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            ← Back
          </button>

          <div className="text-center">
            <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Sudoku - {level.charAt(0).toUpperCase() + level.slice(1)}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {Array.from({ length: maxLives }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full ${
                  i < lives ? "bg-gradient-to-r from-red-400 to-red-600" : darkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                {i < lives && <span className="text-white text-xs flex items-center justify-center h-full">❤️</span>}
              </div>
            ))}
          </div>
        </div>

        {gameState === "won" && (
          <div className="text-center mb-6 p-4 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl">
            <h2 className="text-2xl font-bold">🎉 Congratulations! You Won! 🎉</h2>
          </div>
        )}

        {gameState === "lost" && (
          <GameOverPopup onRestart={handleRestart} darkMode={darkMode} />
        )}

        <div className="grid grid-cols-9 gap-0 mb-6 mx-auto w-fit border-4 border-gray-800 rounded-lg overflow-hidden">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={getCellStyle(rowIndex, colIndex, cell)}
              >
                {cell !== 0 ? cell : ""}
              </div>
            )),
          )}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
              history.length === 0
                ? darkMode
                  ? "bg-gray-700 text-gray-500"
                  : "bg-gray-300 text-gray-500"
                : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:from-yellow-600 hover:to-yellow-700 shadow-lg"
            }`}
          >
            ↶ Undo
          </button>

          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🔄 Restart
          </button>
        </div>
      </div>

      {showNumberSelector && (
        <NumberSelector
          onNumberSelect={handleNumberSelect}
          onClose={() => setShowNumberSelector(false)}
          darkMode={darkMode}
        />
      )}

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default SudokuGame