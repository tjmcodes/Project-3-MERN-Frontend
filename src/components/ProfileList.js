import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/ProfileList.module.scss'
import { baseUrl } from '../config'
import NavBarSoundList from './NavBarSoundList.js'

import Footer from './Footer'

const ProfileList = () => {
  const [profileData, updateProfileData] = useState([])

  useEffect(() => {
    axios.get(`${baseUrl}/all-users/profileList`)
 
      .then(axiosResp => {
        updateProfileData(axiosResp.data)
      })
  }, [])

  return <>
    <NavBarSoundList />
  
  <section className={styles.section}>
        <div className={styles.grid}>
        { profileData.map((profile, index) => {
          console.log(profile)
          return <div key={index}>
          <Link to={`/oneUser/${profile._id}`}>
                    <div className={styles.userinfo}key={profile.image}>
                    <img className={styles.userAvatar} src={profile.image} alt={profile.username}/>
                    <h5>{profile.username}</h5>
                  </div>
                </Link></div>
          })} 
        </div>
    </section>
    <Footer />
  </>
}

export default ProfileList