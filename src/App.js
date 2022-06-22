import React from 'react'
import PokemonIndex from './components/PokemonIndex'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonIndex />} />
      </Routes>
    </Router>
  )
}

export default App
