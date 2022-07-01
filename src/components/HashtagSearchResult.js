import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import {Link} from "react-router-dom"
import styles from '../styles/HashtagSearchResults.module.scss'

function HashtagSearchResult(sethashdata, hashdata) {
 
  const [allMatchingSounds, setallMatchingSounds] = React.useState(undefined)
  const { hashtag } = useParams()
  
  console.log(hashtag)
  
  React.useEffect(() => {
  fetch(`/api/all-soundsbyhashtag?hashtag=${hashtag}`)
      .then(resp => resp.json())
      .then(data => setallMatchingSounds(data))
}, [])
  return (
    allMatchingSounds ?
  <>
  <p>Posts matching #{hashtag}</p>
  <div className="columns is-multiline is-mobile">
        {allMatchingSounds.map((sound, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/all-sounds/${sound._id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                  <h5 className={styles.h5SoundList}>{sound.fileName}</h5>
                      <div>
                          <img className={styles.wavimg}src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img>  
                        <video src={sound.url} controls className={styles.audiofile}>
                        </video>
                        {/* <audio controls className="media">
                          <source src={sound.url} type="audio"></source>  
                        </audio> */}
                      </div>
                      <div className={styles.CatagoryandHashtags}>
                        <div>
                          <h5>{sound.category}/{sound.subCategory}</h5>
                        </div>
                        <div className={styles.hashtags}>
                          {sound.hashtag.slice(0, 3).map((tag, index) => {
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
            </Link>
          </div>
        })}
      </div>
  </> : <></>
  )
}

export default HashtagSearchResult