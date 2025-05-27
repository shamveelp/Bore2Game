import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import TicTacToe from './games/tic-tac-toe/index.jsx'
import SudokuPro from './games/sudoku-pro/index.jsx'
import Snake from './games/snake/index.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/sudoku-pro" element={<SudokuPro />} />
      <Route path="/snake" element={<Snake />} />
      {/* Add more routes as needed */}
    </Routes>
    {/* <App /> */}
  </HashRouter>
  </StrictMode>,
)
