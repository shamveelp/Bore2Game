import { useState, useEffect, useRef, useCallback } from 'react';
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

const FlappyBird = () => {
  // Game configuration constants - easily configurable
  const GRAVITY = 0.5;
  const JUMP_STRENGTH = -10;
  const PIPE_WIDTH = 40;
  const PIPE_GAP = 200;
  const PIPE_SPEED = 1.7;
  const BIRD_SIZE = 40;
  
  // Responsive game dimensions
  const calculateGameSize = () => {
    const maxWidth = Math.min(window.innerWidth * 0.95, 800);
    const maxHeight = Math.min(window.innerHeight * 0.7, 600);
    return { width: maxWidth, height: maxHeight };
  };

  const [gameSize, setGameSize] = useState(calculateGameSize());
  const GAME_WIDTH = gameSize.width;
  const GAME_HEIGHT = gameSize.height;

  // Theme state
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  
  // Game states
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'gameOver'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('flappyHighScore');
    return saved ? parseInt(saved) : 0;
  });
  const [bird, setBird] = useState({ x: GAME_WIDTH * 0.2, y: GAME_HEIGHT / 2, velocity: 0, rotation: 0 });
  const [pipes, setPipes] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refs
  const gameLoopRef = useRef();
  const gameAreaRef = useRef();
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!document.fullscreenElement) {
        const newSize = calculateGameSize();
        setGameSize(newSize);
        setBird(prev => ({ 
          ...prev, 
          x: newSize.width * 0.2, 
          y: newSize.height / 2 
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme management
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
    setDarkMode(prev => !prev);
  };

  // Save high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('flappyHighScore', score.toString());
    }
  }, [score, highScore]);

  // Fullscreen handling
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      gameAreaRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
        // Adjust game size to fullscreen
        setGameSize({
          width: window.screen.width,
          height: window.screen.height
        });
        setBird(prev => ({
          ...prev,
          x: window.screen.width * 0.2,
          y: window.screen.height / 2
        }));
      }).catch(err => {
        console.error('Fullscreen request failed:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        const newSize = calculateGameSize();
        setGameSize(newSize);
        setBird(prev => ({
          ...prev,
          x: newSize.width * 0.2,
          y: newSize.height / 2
        }));
      }).catch(err => {
        console.error('Exit fullscreen failed:', err);
      });
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
        const newSize = calculateGameSize();
        setGameSize(newSize);
        setBird(prev => ({
          ...prev,
          x: newSize.width * 0.2,
          y: newSize.height / 2
        }));
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard controls for fullscreen
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'KeyF') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleFullscreen]);

  // Generate pipe
  const generatePipe = useCallback(() => {
    const minGapStart = 100;
    const maxGapStart = GAME_HEIGHT - PIPE_GAP - 100;
    const gapStart = Math.random() * (maxGapStart - minGapStart) + minGapStart;
    
    return {
      id: Date.now() + Math.random(),
      x: GAME_WIDTH,
      topHeight: gapStart,
      bottomY: gapStart + PIPE_GAP,
      bottomHeight: GAME_HEIGHT - (gapStart + PIPE_GAP),
      scored: false
    };
  }, [GAME_WIDTH, GAME_HEIGHT]);

  // Initialize pipes
  const initializePipes = useCallback(() => {
    const initialPipes = [];
    for (let i = 0; i < 3; i++) {
      const pipe = generatePipe();
      pipe.x = GAME_WIDTH + i * 300;
      initialPipes.push(pipe);
    }
    return initialPipes;
  }, [generatePipe, GAME_WIDTH]);

  // Collision detection
  const checkCollision = useCallback((birdPos, currentPipes) => {
    // Ground and ceiling collision
    if (birdPos.y <= 0 || birdPos.y >= GAME_HEIGHT - BIRD_SIZE) {
      return true;
    }

    // Pipe collision
    for (const pipe of currentPipes) {
      const birdLeft = birdPos.x;
      const birdRight = birdPos.x + BIRD_SIZE;
      const birdTop = birdPos.y;
      const birdBottom = birdPos.y + BIRD_SIZE;

      const pipeLeft = pipe.x;
      const pipeRight = pipe.x + PIPE_WIDTH;

      // Check if bird is horizontally within pipe bounds
      if (birdRight > pipeLeft && birdLeft < pipeRight) {
        // Check collision with top pipe or bottom pipe
        if (birdTop < pipe.topHeight || birdBottom > pipe.bottomY) {
          return true;
        }
      }
    }

    return false;
  }, [GAME_HEIGHT, BIRD_SIZE, PIPE_WIDTH]);

  // Game loop
  const gameLoop = useCallback(() => {
    setBird(prevBird => {
      const newVelocity = prevBird.velocity + GRAVITY;
      const newY = prevBird.y + newVelocity;
      const newRotation = Math.max(-30, Math.min(30, newVelocity * 3));
      
      const newBird = {
        ...prevBird,
        velocity: newVelocity,
        y: newY,
        rotation: newRotation
      };

      setPipes(prevPipes => {
        let newPipes = prevPipes.map(pipe => ({
          ...pipe,
          x: pipe.x - PIPE_SPEED
        }));

        // Remove off-screen pipes and add new ones
        newPipes = newPipes.filter(pipe => pipe.x > -PIPE_WIDTH);
        
        // Add new pipes if needed
        while (newPipes.length < 3) {
          const lastPipe = newPipes[newPipes.length - 1];
          const newPipe = generatePipe();
          newPipe.x = lastPipe ? lastPipe.x + 300 : GAME_WIDTH;
          newPipes.push(newPipe);
        }

        // Check for scoring
        newPipes.forEach(pipe => {
          if (!pipe.scored && pipe.x + PIPE_WIDTH < newBird.x) {
            pipe.scored = true;
            setScore(prevScore => prevScore + 1);
          }
        });

        // Check collision
        if (checkCollision(newBird, newPipes)) {
          setGameState('gameOver');
          clearInterval(gameLoopRef.current);
        }

        return newPipes;
      });

      return newBird;
    });
  }, [GRAVITY, PIPE_SPEED, PIPE_WIDTH, GAME_WIDTH, generatePipe, checkCollision]);

  // Game loop effect
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(gameLoop, 16); // ~60 FPS
      return () => clearInterval(gameLoopRef.current);
    }
  }, [gameState, gameLoop]);

  // Jump function
  const jump = useCallback(() => {
    if (gameState === 'playing') {
      setBird(prev => ({
        ...prev,
        velocity: JUMP_STRENGTH
      }));
    } else if (gameState === 'menu') {
      startGame();
    } else if (gameState === 'gameOver') {
      restartGame();
    }
  }, [gameState, JUMP_STRENGTH]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  // Touch/Click controls
  const handleInteraction = (e) => {
    e.preventDefault();
    jump();
  };

  // Game functions
  const startGame = () => {
    setBird({ 
      x: GAME_WIDTH * 0.2, 
      y: GAME_HEIGHT / 2, 
      velocity: 0, 
      rotation: 0 
    });
    setPipes(initializePipes());
    setScore(0);
    setGameState('playing');
  };

  const restartGame = () => {
    startGame();
  };

  const goToMenu = () => {
    setGameState('menu');
    setBird({ 
      x: GAME_WIDTH * 0.2, 
      y: GAME_HEIGHT / 2, 
      velocity: 0, 
      rotation: 0 
    });
    setPipes([]);
    setScore(0);
  };

  const handleBack = () => {
    navigate("/");
  };

  const themeClasses = darkMode 
    ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white' 
    : 'bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900';

  return (
    <div className={`min-h-screen transition-all duration-500 ${themeClasses}`}>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <div className="flex justify-center items-center min-h-screen pt-20 p-4">
        <div className={`flex flex-col items-center p-6 rounded-3xl border transition-all duration-500 backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50 shadow-2xl shadow-purple-500/10' : 'bg-white/80 border-gray-200/50 shadow-2xl shadow-gray-500/10'}`}>
          
          <div className="flex justify-between w-full mb-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              ← Back to Home
            </button>
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 hidden md:block"
            >
              {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>

          <div className="text-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Flappy Bird
            </h1>
            <p className={`text-lg transition-colors duration-500 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Tap to fly, avoid the pipes!
            </p>
          </div>

          {/* Game Area */}
          <div
            ref={gameAreaRef}
            className="relative border-4 border-yellow-500 rounded-lg overflow-hidden cursor-pointer select-none"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            onClick={handleInteraction}
            onTouchStart={handleInteraction}
          >
            {/* Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://res.cloudinary.com/drmroxs00/image/upload/v1748630592/background-day_hu4cn7.png')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'repeat-x'
              }}
            />

            {/* Score Display */}
            {gameState === 'playing' && (
              <>
                <div className="absolute top-4 left-4 text-2xl md:text-3xl font-bold text-white drop-shadow-lg bg-black bg-opacity-30 px-3 py-1 rounded-lg">
                  High: {highScore}
                </div>
                <div className="absolute top-4 right-4 text-3xl md:text-4xl font-bold text-white drop-shadow-lg bg-black bg-opacity-30 px-3 py-1 rounded-lg">
                  {score}
                </div>
              </>
            )}

            {/* Bird */}
            <div
              className="absolute transition-transform duration-75"
              style={{
                left: bird.x,
                top: bird.y,
                width: BIRD_SIZE,
                height: BIRD_SIZE,
                transform: `rotate(${bird.rotation}deg)`,
                backgroundImage: `url('https://res.cloudinary.com/drmroxs00/image/upload/v1748630583/yellowbird-upflap_yywaxd.png')`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
              }}
            />

            {/* Pipes */}
            {pipes.map((pipe) => (
              <div key={pipe.id}>
                {/* Top pipe */}
                <div
                  className="absolute"
                  style={{
                    left: pipe.x,
                    top: 0,
                    width: PIPE_WIDTH,
                    height: pipe.topHeight,
                    backgroundImage: `url('https://res.cloudinary.com/drmroxs00/image/upload/v1748630588/pipe-green_idamnb.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    transform: 'rotate(180deg)',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                  }}
                />
                {/* Bottom pipe */}
                <div
                  className="absolute"
                  style={{
                    left: pipe.x,
                    top: pipe.bottomY,
                    width: PIPE_WIDTH,
                    height: pipe.bottomHeight,
                    backgroundImage: `url('https://res.cloudinary.com/drmroxs00/image/upload/v1748630588/pipe-green_idamnb.png')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                  }}
                />
              </div>
            ))}

            {/* Start Menu */}
            {gameState === 'menu' && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 md:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">🐦 Flappy Bird</h2>
                  <div className="mb-6 text-gray-600">
                    <p className="text-lg mb-2">High Score: <span className="font-bold text-yellow-600">{highScore}</span></p>
                    <div className="text-sm space-y-1">
                      <p>• Tap, click, or press SPACE/↑ to jump</p>
                      <p>• Avoid the pipes</p>
                      <p>• Get the highest score!</p>
                      <p className="md:block hidden">• Press F for fullscreen (Esc to exit)</p>
                    </div>
                  </div>
                  <button
                    onClick={startGame}
                    className="bg-purple-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Start Game
                  </button>
                </div>
              </div>
            )}

            {/* Game Over Popup */}
            {gameState === 'gameOver' && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div className="bg-white rounded-xl p-6 md:p-8 text-center shadow-2xl max-w-sm mx-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-4">Game Over!</h2>
                  <div className="mb-6 text-gray-700">
                    <p className="text-xl mb-2">Score: <span className="font-bold text-blue-600">{score}</span></p>
                    <p className="text-lg">High Score: <span className="font-bold text-yellow-600">{highScore}</span></p>
                    {score === highScore && score > 0 && (
                      <p className="text-green-600 font-bold mt-2">🎉 New High Score!</p>
                    )}
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={restartGame}
                      className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={goToMenu}
                      className="w-full bg-gray-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all duration-300 transform hover:scale-105"
                    >
                      Main Menu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center">
            <p className={`text-sm opacity-75 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {gameState === 'playing' 
                ? 'Tap, click, or press SPACE/↑ to jump!' 
                : 'Tap anywhere to start playing!'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;