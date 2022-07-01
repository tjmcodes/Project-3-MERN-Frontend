import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './searchBar'
import styles from '../styles/SoundList.module.scss'
import NavBarSoundList from './NavBarSoundList.js'


const SoundList = () => {
  const [soundData, updateSoundData] = useState([])
  const categories = ["nature", "human", "machines", "animals", "materials", "ambience", "electric", "weather"]

  useEffect(() => {
    axios.get('/api/all-sounds')
      .then(axiosResp => {
        updateSoundData(axiosResp.data)
      })
  }, [])

  return <>
    <NavBarSoundList />
  <section className={styles.section}>
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h3>Categories</h3>
          {categories.map((category, index) => {
          return <p key={index}>{category}</p>
          })}
        </div>
      </div>
      
      <div className={styles.gridContainer}>
        <SearchBar />
        <div className={styles.grid}>
        {soundData.map((sound, index) => {
          return <div className={styles.soundPreviewContainer} key={index}>
            <Link to={`/all-sounds/${sound._id}`}>
                <div>
                  <div>
                    <div>
                      <h4>
                          <img src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img>  
                        {/* <video src={sound.url} controls className="media" type="video">
                        </video> */}
                        <audio>
                          <source src={sound.url} type="audio/wav"></source>  
                        </audio>
                      </h4>
                      <h5>Track name: {sound.fileName}</h5>
                      <h5>Category: {sound.category}</h5>
                      <h5>Sub-category: {sound.subCategory}</h5>
                      <h5>Hashtags: </h5> {sound.hashtag.map((tag, index) => {
                        return <p key={index}>#{tag}</p>
                        })}
                    </div>
                  </div>
                </div>
                <div key={sound.user.image}>
                  {/* <figure className="image is-4by3">
                  {/* <img src={sound.user.image} alt={sound.user.username} /> */}
                  {/* </figure> */} 
                    <h5>User Posted: {sound.user.username}</h5>
                  </div>
              </Link>
            </div>
          })}
        </div>
      </div>
      </div>
    </section>
  </>
}

export default SoundList