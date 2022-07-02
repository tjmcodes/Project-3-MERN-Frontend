import React from 'react'
import Login from './components/Login.js'
import Register from './components/Register.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SoundList from './components/SoundList.js'
import SoundShow from './components/SoundShow.js'
import SoundCreate from './components/SoundCreate.js'
import HashtagSearchResult from './components/HashtagSearchResult.js'
import ProfileList from './components/ProfileList.js'
import SingleUserId from './components/SingleUserId.js'




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register /> } />
        <Route path="/all-users/profileList" element={<ProfileList/> } />
        <Route path="/oneUser/:singleUserId" element={<SingleUserId/> } />
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
