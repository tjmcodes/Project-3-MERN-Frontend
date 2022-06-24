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
                      <h4 className="title is-4">
                        <span role="img" aria-label="plate">
                        </span>{" "}
                        Sound File
                        <audio key={sound.audioFile} controls className="media">
                          <source src={sound.audioFile} type="audio/wav"></source>  
                        </audio>
                      </h4>
                      <h5 className="subtitle is-5">Track name: {sound.fileName}</h5>
                      <h5 className="subtitle is-5">Category: {sound.category}</h5>
                      <h5 className="subtitle is-5">
                  <span role="img" aria-label="plate">
                  </span>{" "}
                  Hashtags: {/* can we do a similar thing here with the show delete button if OP is true? We base this on if hashtags are present?  */}
                </h5> {sound.hashtag.map((tag, index) => {
                  return <article key={index} className="hashtag">
                    <div className="content">
                        <p className="subtitle">
                          #{tag}
                        </p>
                    </div>  
                  </article>
              })}
                    </div>
                  </div>
                </div>
                <div key={sound.user.image} className="card-image">
                  <figure className="image is-4by3">
                    <img src={sound.user.image} alt={sound.user.username} />
                  </figure>
                  <h5 className="subtitle is-5">User Posted: {sound.user.username}</h5>
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