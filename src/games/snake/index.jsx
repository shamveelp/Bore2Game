"use client"

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ darkMode, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? 'scale-95' : 'scale-100'}`}>
      <div className={`px-8 py-4 rounded-3xl backdrop-blur-lg border transition-all duration-500 ${darkMode ? 'bg-gray-900/80 border-gray-700/50 shadow-2xl shadow-purple-500/10' : 'bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10'}`}>
        <div className="flex items-center justify-between min-w-[300px]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">B2G</span>
            </div>
            <span className={`text-xl font-bold transition-colors duration-500 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Bore2Game
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${darkMode ? 'bg-purple-600 focus:ring-offset-gray-900' : 'bg-gray-300 focus:ring-offset-white'}`}
          >
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center ${darkMode ? 'transform translate-x-7 bg-yellow-300' : 'transform translate-x-0 bg-white'}`}>
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
  );
};

const Snake = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [speed, setSpeed] = useState(150);
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const navigate = useNavigate();

  const calculateCanvasSize = () => {
    const maxWidth = window.innerWidth * 0.9; // 90% of viewport width
    const maxHeight = window.innerHeight * 0.7; // 70% of viewport height to leave space for controls
    const size = Math.min(maxWidth, maxHeight, 400); // Cap at 400px
    return Math.floor(size / 20) * 20; // Ensure divisibility by grid size
  };

  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());
  const GRID_SIZE = 20;
  const CELL_SIZE = canvasSize / GRID_SIZE;

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(calculateCanvasSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const handleKeyDown = (e) => {
        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'DOWN') setDirection('UP');
            break;
          case 'ArrowDown':
            if (direction !== 'UP') setDirection('DOWN');
            break;
          case 'ArrowLeft':
            if (direction !== 'RIGHT') setDirection('LEFT');
            break;
          case 'ArrowRight':
            if (direction !== 'LEFT') setDirection('RIGHT');
            break;
          default:
            break;
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [gameStarted, gameOver, direction]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(updateGame, speed);
      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameStarted, gameOver, snake, food, direction, speed]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      drawGame(ctx);
    }
  }, [snake, food, gameOver, gameStarted, canvasSize]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setSpeed(150);
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  };

  const updateGame = () => {
    if (gameOver || !gameStarted) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }

    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      clearInterval(gameLoopRef.current);
      return;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(prev => prev + 10);
      setFood(generateFood());
      if (score > 0 && score % 50 === 0) {
        setSpeed(prev => Math.max(prev - 10, 50));
      }
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const drawGame = (ctx) => {
    if (!ctx) return;

    ctx.fillStyle = darkMode ? '#1f2937' : '#f3f4f6';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    ctx.strokeStyle = darkMode ? '#374151' : '#e5e7eb';
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, canvasSize);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(canvasSize, i * CELL_SIZE);
      ctx.stroke();
    }

    snake.forEach((segment, index) => {
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE, 
        segment.y * CELL_SIZE, 
        (segment.x + 1) * CELL_SIZE, 
        (segment.y + 1) * CELL_SIZE
      );
      
      if (index === 0) {
        gradient.addColorStop(0, '#ec4899');
        gradient.addColorStop(1, '#8b5cf6');
      } else {
        gradient.addColorStop(0, '#8b5cf6');
        gradient.addColorStop(1, '#6366f1');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(
        segment.x * CELL_SIZE, 
        segment.y * CELL_SIZE, 
        CELL_SIZE, 
        CELL_SIZE
      );

      ctx.shadowColor = '#8b5cf6';
      ctx.shadowBlur = 10;
      ctx.fillRect(
        segment.x * CELL_SIZE, 
        segment.y * CELL_SIZE, 
        CELL_SIZE, 
        CELL_SIZE
      );
      ctx.shadowBlur = 0;
    });

    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.shadowBlur = 0;
  };

  const handleSwipe = (direction) => {
    if (gameStarted && !gameOver) {
      switch (direction) {
        case 'UP':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'DOWN':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'LEFT':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'RIGHT':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        default:
          break;
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all duration-500 ${darkMode ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white" : "bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900"}`}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <div className={`flex flex-col items-center p-6 rounded-3xl border transition-all duration-500 backdrop-blur-lg max-w-lg w-full ${darkMode ? "bg-gray-900/50 border-gray-700/50 shadow-2xl shadow-purple-500/10" : "bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10"}`}>
        <button
          onClick={handleBack}
          className="self-start mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          ← Back to Home
        </button>
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
            Snake Game
          </h1>
          <p className={`text-lg transition-colors duration-500 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Control the snake and eat the food to grow
          </p>
        </div>
        <div className={`mb-4 text-lg font-bold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Score: {score}
        </div>
        <div className={`border-4 rounded-lg ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
          <canvas 
            ref={canvasRef} 
            width={canvasSize} 
            height={canvasSize}
            className="rounded-lg w-full"
          />
        </div>
        {!gameStarted && (
          <div className="mt-6 text-center">
            <button 
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Start Game
            </button>
          </div>
        )}
        {gameOver && (
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold mb-4 text-red-500">Game Over!</div>
            <div className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Your score: {score}
            </div>
            <button 
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              Play Again
            </button>
          </div>
        )}
        {gameStarted && !gameOver && (
          <div className="mt-6 grid grid-cols-3 gap-2 max-w-xs w-full">
            <div className="col-start-2">
              <button 
                onClick={() => handleSwipe('UP')}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg text-lg`}
              >
                ↑
              </button>
            </div>
            <div className="col-start-1 row-start-2">
              <button 
                onClick={() => handleSwipe('LEFT')}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg text-lg`}
              >
                ←
              </button>
            </div>
            <div className="col-start-3 row-start-2">
              <button 
                onClick={() => handleSwipe('RIGHT')}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg text-lg`}
              >
                →
              </button>
            </div>
            <div className="col-start-2 row-start-3">
              <button 
                onClick={() => handleSwipe('DOWN')}
                className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg text-lg`}
              >
                ↓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Snake;