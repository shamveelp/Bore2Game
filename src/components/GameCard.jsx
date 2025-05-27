import { useState } from 'react'
import { Link } from 'react-router-dom'

const GameCard = ({ game, darkMode, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className={`group cursor-pointer transition-all duration-500 animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
        <Link to={game.link}>
        
        <div className={`relative overflow-hidden rounded-3xl transition-all duration-500 transform group-hover:scale-105 group-hover:-translate-y-2 ${
        darkMode 
          ? 'bg-gray-800/50 border border-gray-700/50 shadow-2xl shadow-purple-500/10' 
          : 'bg-white/80 border border-gray-200/50 shadow-2xl shadow-gray-500/10'
      }`}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Game Image */}
        <div className="relative overflow-hidden rounded-t-3xl">
          <img 
            src={game.image} 
            alt={game.name}
            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-white text-sm font-medium">{game.rating}</span>
          </div>
        </div>

        {/* Game Info */}
        <div className="p-6">
          <h4 className={`text-xl font-bold mb-2 transition-colors duration-500 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {game.name}
          </h4>
          
          <div className="flex items-center justify-between">
            <span className={`text-sm transition-colors duration-500 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {game.description}
            </span>
            
            <button  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isHovered
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white transform scale-105'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              Play Now
            </button>
          </div>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur"></div>
      </div>
        </Link>
      
    </div>
  )
}

export default GameCard
