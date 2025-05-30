import { useState, useEffect } from 'react'

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
            <div className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center cursor-pointer ${
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

export default Navbar
