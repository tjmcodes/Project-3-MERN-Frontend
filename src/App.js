import React from 'react'
import SoundIndex from './components/SoundIndex.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SoundList from './components/SoundList.js'
import NavBar from './components/NavBar.js'
import SoundShow from './components/SoundShow.js'



function App() {
  return (
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element={<SoundIndex />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        {/*<Route path="/all-sounds" element={<AllSounds /> } />*/}
        <Route path="/sounds/all-sounds" element={<SoundList /> } />
        <Route path="/sounds/sound" element={<SoundShow /> } />
      </Routes>
    </Router>
  )
}

export default App
