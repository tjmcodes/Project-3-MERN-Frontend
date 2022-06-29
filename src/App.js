import React from 'react'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SoundList from './components/SoundList.js'
import NavBar from './components/NavBar.js'
import SoundShow from './components/SoundShow.js'
import Home from './components/Home.js'
import SoundCreate from './components/SoundCreate.js'
import HashtagSearchResult from './components/HashtagSearchResult.js'



function App() {
  return (
    <Router>
    <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        {/*<Route path="/all-sounds" element={<AllSounds /> } />*/}
        <Route path="/all-sounds" element={<SoundList /> } />
        <Route path="/all-sounds/:soundId" element={<SoundShow /> } />
        <Route path="/all-sounds/new-sounds" element={<SoundCreate /> } />
        <Route path="/hashtagsearchresults/:hashtag" element={<HashtagSearchResult /> } />
      </Routes>
    </Router>
  )
}

export default App
