import React, { useState, useEffect, Profiler } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styles from '../styles/SingleUserId.module.scss'
import { baseUrl } from '../config'
import SearchBar from './searchBar.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'

const SingleUserId = (props) => {
  const [singleProfileData, updateSingleProfileData] = useState([])
  const { singleUserId } = useParams()
  const [filterValue, setFilterValue] = useState('')
  const [activeClass, setactiveClass] = useState('')
  const categories = ["nature", "human", "machines", "animals", "materials", "ambience", "electric", "weather"]
  const location = useLocation();
  const state = location.state;
  const by = 'by'.toLowerCase()
  
  // const { stateparams } = useLocation()

  useEffect(() => {
    axios.get(`${baseUrl}/oneUser/${singleUserId}`)
      .then(axiosResp => {
        updateSingleProfileData(axiosResp.data)
      })
  }, [singleUserId])


  function handleClick(event) {
    if ((event.target.innerHTML).includes('All')) {
      setFilterValue('')
      setactiveClass(event.target.innerHTML)
    } else {
      setFilterValue(event.target.innerHTML)
      setactiveClass(event.target.innerHTML)
  }
}


  function categoryFilter() {
    return singleProfileData.filter((sound) => {
      return (sound.category === filterValue || filterValue === '')
    })
  }


  return <>
  
    <NavBar />

  {/* C A T E G O R I E S  S I D E  M E N U */}
  <section className={styles.section}>
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <p onClick={handleClick} className={ (activeClass === "All Sounds") ? styles.categoryActive : styles.category}>All Sounds ({state})</p>
          {categories.map((category, index) => {
          return <p className={(activeClass === category) ? styles.categoryActive : styles.category} key={index} onClick={handleClick} >{category}</p>
          })}
        </div>
      </div>
      
      <div className={styles.gridContainer}>
        <SearchBar />
        <div className={styles.grid}>
          {singleProfileData === true ? null : categoryFilter().map((profile, index) => {
          return <div key={index} className={styles.soundPreviewContainer}>               
            {/* A U D I O  C O N T R O L S  &  W A V  I M A G E */}
            <Link  to={`/all-sounds/${profile._id}`}>
              <div className={styles.ClickToShowDetails}>
                <h5 className={styles.h5SoundList}>{profile.fileName}</h5>
                  <div>
                    <img className={styles.wavimg}src={profile.image} alt="wavfile"></img>    
                    <video src={profile.url} controls className={styles.audiofile}></video>
                  </div>
              </div>
            </Link>
              {/* H A S H T A G S */}
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
            {/*  U S E R  C A R D  H E A D E R */}
            <div className={styles.userdate}>
              <Link to={`/oneUser/${profile.user._id}`} state={profile.user.username}> 
              <div className={styles.userinfo}key={profile.user.image}>
                <img className={styles.userAvatar} src={profile.user.image} alt={profile.user.username}/>
                <h5>{profile.user.username}</h5>
              </div>
              </Link>
                  
            {/* D A T E  A N D  T I M E  I N F O */}
              <div className={styles.date}>
                <p>{profile.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
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

export default SingleUserId