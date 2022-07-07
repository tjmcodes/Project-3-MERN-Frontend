import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SearchBar from './searchBar'
import styles from '../styles/SoundList.module.scss'
import NavBarSoundList from './NavBarSoundList.js'
import { baseUrl } from '../config'
import Footer from './Footer.js'


const SoundList = () => {
  const [soundData, updateSoundData] = useState([]) // issue with true non boolean 
  const [filterValue, setFilterValue] = useState('')
  const [activeClass, setactiveClass] = useState('')
  const categories = ["nature", "human", "machines", "animals", "materials", "ambience", "electric", "weather"]

  useEffect(() => {
    axios.get(`${baseUrl}/all-sounds`)
      .then(axiosResp => {
        updateSoundData(axiosResp.data)
        // console.log(soundData)
      })
  }, [])

  function handleClick(event) {
    if (event.target.innerHTML === 'All Sounds') {
      setFilterValue('')
      setactiveClass(event.target.innerHTML)
    } else {
      setFilterValue(event.target.innerHTML)
      setactiveClass(event.target.innerHTML)
  }
}
  function categoryFilter() {
    return soundData.filter((sound) => {
      return (sound.category === filterValue || filterValue === '')
    })
  }

  return <>
    <NavBarSoundList />
  
  <section className={styles.section}>
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <p onClick={handleClick} className={ (activeClass === "All Sounds") ? styles.categoryActive : styles.category}>All Sounds</p>
          {categories.map((category, index) => {
          return <p className={(activeClass === category) ? styles.categoryActive : styles.category} key={index} onClick={handleClick} >{category}</p>
          })}
        </div>
      </div>
      
      <div className={styles.gridContainer}>
        <SearchBar />
        <div className={styles.grid}>
        { soundData === true ? null : categoryFilter().map((sound, index) => {
          return < div key={index}><div className={styles.soundPreviewContainer} >
            <div>
                <div>
                  <Link  to={`/all-sounds/${sound._id}`}>
                    <div className={styles.ClickToShowDetails}>
                      <h5 className={styles.h5SoundList}>{sound.fileName}</h5>
                        <div>
                          <img className={styles.wavimg}src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                          </img>  
                          <video src={sound.url} controls className={styles.audiofile}>
                          </video>
                        </div>
                      </div>
                    </Link>
                      <div className={styles.catagoryandHashtags}>
                        <div>
                          <h5>{sound.category}: {sound.subCategory}</h5>
                        </div>
                        <div className={styles.hashtags}>
                          {sound.hashtag.slice(0, 3).map((tag, index) => {
                          return <div key={index}><Link to={`/hashtagsearchresults/${tag}`}
                                  ><p className={styles.hashtag} >#{tag}</p>
                                </Link></div>
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                <div className={styles.userdate}>
                <Link to={`/oneUser/${sound.user._id}`} state={sound.user.username}> 
                    <div className={styles.userinfo}key={sound.user.image}>
                    <img className={styles.userAvatar} src={sound.user.image} alt={sound.user.username}/>
                    <h5>{sound.user.username}</h5>
                  </div>
                </Link>
                  <div className={styles.date}>
                    <p>{sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
                  </div>
                  </div>
          </div>
          </div>
          })} 
        </div>
      </div>
      </div>
    </section>
    <Footer />
  </>
}

export default SoundList









