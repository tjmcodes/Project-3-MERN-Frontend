import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import styles from '../styles/SingleUserId.module.scss'
import { baseUrl } from '../config'

const ProfileList = (props) => {
  const [profileData, updateProfileData] = useState([])
  const { singleUserId } = useParams()
  
  const { stateparams } = useLocation()
  console.log(stateparams)

  useEffect(() => {
    axios.get(`${baseUrl}/oneUser/${singleUserId}`)
      .then(axiosResp => {
        updateProfileData(axiosResp.data)
        console.log(profileData)
      })
  }, [singleUserId])

  return profileData ? <section>
    <div className={styles.section}>
      <div className={styles.main}>
<div className={styles.gridContainer}>
  <div className={styles.grid}>
      {profileData.map((sound, index) => {
        return <div key={index} className={styles.soundPreviewContainer}>
          <Link to={`/all-sounds/${sound._id}`}>
            <div>
              <div>
                <div>
                  <div>
                  <h5 className={styles.h5SoundList}>Track name: {sound.fileName}</h5>
                    <div>
                      <img className={styles.wavimg} src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img> 
                        <video src={sound.url} controls className={styles.audiofile}>
                        </video>
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
                </div>
            </Link>
          </div>
          })}
          </div>
          </div>
        </div> 
      </div>
  </section> : <p>Loading</p>
}

export default ProfileList