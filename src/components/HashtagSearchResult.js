import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import {Link} from "react-router-dom"
import styles from '../styles/HashtagSearchResults.module.scss'
import HashtagNavBar from './HashtagNavBar'
import { useState } from "react"
import { baseUrl } from "../config"
import Footer from "./Footer.js"



function HashtagSearchResult(sethashdata, hashdata) {
  const [soundData, updateSoundData] = useState([]) // issue with true non boolean 
  const [filterValue, setFilterValue] = useState('')
  const [activeClass, setactiveClass] = useState('')
  const categories = ["nature", "human", "machines", "animals", "materials", "ambience", "electric", "weather"] 
  // const [allMatchingSounds, setallMatchingSounds] = React.useState(undefined)
  const { hashtag } = useParams()

  
  console.log(hashtag)


  
  React.useEffect(() => {
  fetch(`${baseUrl}/all-soundsbyhashtag?hashtag=${hashtag}`)
      .then(resp => resp.json())
      .then(data => updateSoundData(data))
      
}, [hashtag])

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
  return soundData.filter((sound) => {
    return (sound.category === filterValue || filterValue === '')
  })
}



return <>
    <HashtagNavBar />
    {/* <button className={styles.button} onClick={updateButton(!button)}>Back</button> */}

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
        {/* <SearchBar /> */}
        <div className={styles.grid}>
        { soundData && categoryFilter().map((sound, index) => {
          return <div className={styles.soundPreviewContainer} key={index}>
          <Link to={`/all-sounds/${sound._id}`}>
              <div>
                <div>
                  <div>
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
              </div>
              <div className={styles.userdate}>
              <Link to={`/all-users/profileList${sound.user._id}`}>
                  <div className={styles.userinfo}key={sound.user.image}>
                  <img className={styles.userAvatar} src={sound.user.image} alt={sound.user.username}/>
                  <h5 use>{sound.user.username}</h5>
                </div>
              </Link>
                <div className={styles.date}>
                  <p>{sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
                </div>
              </div>
            </Link>
            <Footer />
          </div> 
          })} 
        </div>
      </div>
      </div>
    </section>
  </>


  
}

export default HashtagSearchResult