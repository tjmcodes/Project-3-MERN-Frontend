import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styles from '../styles/ProfileList.module.scss'
import { baseUrl } from '../config'
import NavBarSoundList from './NavBarSoundList.js'
import SearchBar from './searchBar.js'

const ProfileList = () => {
  const [profileData, updateProfileData] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [activeClass, setactiveClass] = useState('')
  const categories = ["nature", "human", "machines", "animals", "materials", "ambience", "electric", "weather"]

  useEffect(() => {
    axios.get(`${baseUrl}/all-sounds`)
      .then(axiosResp => {
        updateProfileData(axiosResp.data)
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
    return profileData.filter((sound) => {
      return (sound.category === filterValue || filterValue === '')
    })
  }

  return <>
    <NavBarSoundList />
  
  <section className={styles.section}>
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <h3>Categories</h3>
          <p onClick={handleClick} className={ (activeClass === "All Sounds") ? styles.categoryActive : styles.category}>All Sounds</p>
          {categories.map((category, index) => {
          return <p className={(activeClass === category) ? styles.categoryActive : styles.category} key={index} onClick={handleClick} >{category}</p>
          })}
        </div>
      </div>
      
      <div className={styles.gridContainer}>
        <SearchBar />
        <div className={styles.grid}>
        { profileData && categoryFilter().map((profile, index) => {
          return <div className={styles.soundPreviewContainer} key={index}>
            <Link to={`/all-sounds/${profile._id}`}>
                <div>
                  <div>
                    <div>
                    <h5 className={styles.h5SoundList}>{profile.fileName}</h5>
                      <div>
                          <img className={styles.wavimg}src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img>  
                        <video src={profile.url} controls className={styles.audiofile}>
                        </video>
                        {/* <audio controls className="media">
                          <source src={sound.url} type="audio"></source>  
                        </audio> */}
                      </div>
                      <div className={styles.catagoryandHashtags}>
                        <div>
                          <h5>{profile.category}: {profile.subCategory}</h5>
                        </div>
                        <div className={styles.hashtags}>
                          {profile.hashtag.slice(0, 3).map((tag, index) => {
                          return <div key={index}><Link to={`/hashtagsearchresults/${tag}`}
                                  ><p className={styles.hashtag} >#{tag}</p>
                                </Link></div>
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.userdate}>
                <Link to={`/oneUser/${profile.user._id}`}>
                    <div className={styles.userinfo}key={profile.user.image}>
                    <img className={styles.userAvatar} src={profile.user.image} alt={profile.user.username}/>
                    <h5 use>{profile.user.username}</h5>
                  </div>
                </Link>
                  <div className={styles.date}>
                    <p>{profile.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
                  </div>
                </div>
              </Link>
              {/* <Footer /> */}
            </div> 
          })} 
        </div>
      </div>
      </div>
    </section>
    
  </>
}

export default ProfileList