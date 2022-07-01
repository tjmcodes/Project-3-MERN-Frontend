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
        console.log(soundData)
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
                    <h5 className={styles.h5SoundList}>{sound.fileName}</h5>
                      <div>
                          <img className={styles.wavimg}src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img>  
                        <video src={sound.url} controls className={styles.audiofile}>
                        </video>
                        {/* <audio controls className="media">
                          <source src={sound.url} type="audio"></source>  
                        </audio> */}
                      </div>
                      <div className={styles.CatagoryandHashtags}>
                        <div>
                          <h5>{sound.category}/{sound.subCategory}</h5>
                        </div>
                        <div className={styles.hashtags}>
                          {sound.hashtag.map((tag, index) => {
                          return <p className={styles.hashtag} key={index}>#{tag}</p>
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.userdate}>
                  <div className={styles.userinfo}key={sound.user.image}>
                    <img className={styles.userAvatar} src={sound.user.image} alt={sound.user.username}/>
                    <h5 use>{sound.user.username}</h5>
                  </div>
                  <div className={styles.date}>
                    <p>{sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
                  </div>
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