import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const SoundList = () => {
  const [soundData, updateSoundData] = useState([])

  useEffect(() => {
    axios.get('/api/all-sounds')
      .then(axiosResp => {
        updateSoundData(axiosResp.data)
      })
  }, [])

  return <section className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {soundData.map((sound, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/all-sounds/${sound._id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">{sound.fileName}</p>
                      <p className="subtitle is-6">{'User Posted: ' + sound.user.username}</p>
                      <p className="subtitle is-6">{'Category: ' + sound.category}</p>
                      <p className="subtitle is-6">{'Hashtags: ' + sound.hashtag}</p>
                    </div>
                  </div>
                </div>
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img src={sound.user.image} alt={sound.user.username} />
                  </figure>
                </div>
              </div>
            </Link>
          </div>
        })}
      </div>
    </div>
  </section>
}

export default SoundList