import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/ProfileList.module.scss'
import { baseUrl } from '../config'
import NavBarProfileList from './NavBarProfileList.js'

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
    <NavBarProfileList />
  
  <section className={styles.section}>
        <div className={styles.grid}>
          
        { profileData.sort((a, b) => {
          return a.username.localeCompare(b.username)
        }) 
          .map((profile, index) => {
          return <div key={index}>
          <Link to={`/oneUser/${profile._id}`} state={profile.username}> 
            <div className={styles.userinfo}key={profile.image}>
              <img className={styles.userAvatar} src={profile.image} alt={profile.username}/>
              <h5 className={styles.h5style}>{profile.username}</h5>
            </div>
          </Link></div>
          })} 
        </div>
    </section>
  <Footer />
  </>
}

export default ProfileList