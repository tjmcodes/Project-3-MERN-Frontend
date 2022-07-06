import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import styles from '../styles/ProfileList.module.scss'
import { baseUrl } from '../config'

const ProfileList = () => {
  const [profileData, updateProfileData] = useState([])
  const { userId } = useParams()

  useEffect(() => {
    axios.get(`${baseUrl}/oneUser/${userId}`)
      .then(axiosResp => {
        updateProfileData(axiosResp.data)
      })
  }, [])

  return <section className={styles.section}>
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {profileData.map((profile, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
          <Link to={{
            pathname: `/oneUser/${profile._id}`,  
            state: { name: profile.username }
            }}> 
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <h4 className="title is-4">
                        <span role="img" aria-label="plate">
                        </span>{" "}
                      
                  
                      </h4>
          
                      <h5 className="subtitle is-5">
                  <span role="img" aria-label="plate">
                  </span>{" "}
                
                </h5> 
                    </div>
                  </div>
                </div>
                <div key={profile.image} className="card-image">
                  <figure className="image is-4by3">
                    <img src={profile.image} alt={profile.username} />
                  </figure>
                  <h5 className="subtitle is-5">{profile.username}</h5>
                </div>
              </div>
          </Link>
          </div>
        })}
      </div>
    </div>
  </section>
}

export default ProfileList