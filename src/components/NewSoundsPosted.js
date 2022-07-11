import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'
// import hashtagfy from 'hashtagfy2'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
// import SubCategories from '../data/SubCategories.js'
import NavBar from './NavBar.js'
import styles from '../styles/NewSoundsPosted.module.scss'
import { baseUrl } from '../config.js'
import Footer from './Footer.js'



function SoundCreate() {

  const navigate = useNavigate()
  

  const [soundDisplay, updateSoundDisplay] = useState([])
  const [button, updateButton] = useState(false)
  
  async function fetchSound() {
    try {
      const { data } = await axios.get(`${baseUrl}/all-sounds`)
      // reversing the data so that the newest posts will appear first
      updateSoundDisplay(data.reverse())
    } catch (err) {
    }
  }
  

  useEffect(() => {
    fetchSound()
  }, [])

  
  
  

  return <>
    <div className={styles.grid}>
      <NavBar />
      <div>
        <article className={styles.article}>
          <button className={styles.uploadButton} onClick={() => navigate("/all-sounds/new-sounds/upload")}>Click here to post your sound</button>
        </article>
        <div className={styles.grid}>
          {soundDisplay.map(sound => {
            return (
              <div key={sound._id} className={styles.gridContainershow}>
                <div>
                  <div>
                    {/* A U D I O  C O N T R O L S  &  W A V  I M A G E */}
                    <Link to={`/all-sounds/${sound._id}`}>
                      <div className={styles.ClickToShowDetails}>
                        <h5 className={styles.h5SoundList}>{sound.fileName}</h5>
                        <div>
                          <img className={styles.wavimg}src={sound.image} alt="wavfile"></img>    
                          <video src={sound.url} controls className={styles.audiofile}></video>
                        </div>
                      </div>
                    </Link>
                    {/* C A T E G O R I E S  S I D E  M E N U */}
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
                      
                {/*  U S E R  C A R D  H E A D E R */}
                <div className={styles.userdate}>
                  <Link to={`/oneUser/${sound.user._id}`} state={sound.user.username}> 
                    <div className={styles.userinfo}key={sound.user.image}>
                      <img className={styles.userAvatar} src={sound.user.image} alt={sound.user.username}/>
                      <h5>{sound.user.username}</h5>
                    </div>
                  </Link>
                  {/* D A T E  A N D  T I M E  I N F O */}
                  <div className={styles.date}>
                    <p>{sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
                  </div>   
                </div>
                
              </div>
            )})}
          </div>
      </div>
    </div>
    <Footer />
  </>
}


export default SoundCreate