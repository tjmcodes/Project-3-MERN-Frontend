import React from 'react'
import SoundIndex from './components/SoundIndex.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SoundIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register /> } />
      </Routes>
    </Router>
  )
}

export default App
