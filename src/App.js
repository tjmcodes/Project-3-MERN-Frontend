import React from 'react'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SoundList from './components/SoundList.js'
import Navbar from './components/Navbar'
import SoundShow from './components/SoundShow.js'
import Home from './components/Home.js'



function App() {
  return (
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        {/*<Route path="/all-sounds" element={<AllSounds /> } />*/}
        <Route path="/all-sounds" element={<SoundList /> } />
        <Route path="/all-sounds/:soundId" element={<SoundShow /> } />
      </Routes>
    </Router>
  )
}

export default App
