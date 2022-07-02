import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'
// import hashtagfy from 'hashtagfy2'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import SubCategories from '../data/SubCategories.js'
import NavBar from './NavBar.js'
import styles from '../styles/SoundCreate.module.scss'
import { baseUrl } from '../config.js'



function SoundCreate() {

  const navigate = useNavigate()
  

  const [soundDisplay, updateSoundDisplay] = useState([])
  const [button, updateButton] = useState(false)

  // const hashtag2 = hashtagfy('', { capitalize: false })
  
  const [formData, setFormData] = useState({
    fileName: '',
    caption: '',
    hashtag: [],
    category: '',
    subCategory: '',
    url: '',
    image: '',
  
  })

  

  /** "selected" here is state variable which will hold the
  * value of currently selected dropdown.
  */
  const [selected, setSelected] = React.useState( 
  { subCategory: '', category: '' } );
  
  // gets all sounds that have been created / posted
  async function fetchSound() {
    try {
      const { data } = await axios.get(`${baseUrl}/all-sounds`)
      // reversing the data so that the newest posts will appear first
      updateSoundDisplay(data.reverse())
    } catch (err) {
      console.log(err)
    }
  }
  

  useEffect(() => {
    fetchSound()
  }, [])

  // Function which updates the formData with the caption the user wants to upload.
  function handleChange(event) {
    setFormData({ 
      ...formData, 
      [event.target.name]: event.target.name === "hashtag" ? event.target.value.replace(" ", "").split(",") : event.target.value
    })
  }

  //any functions that you can get (find option in bucket) --> uploadWidget (check documentation)

  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'tjmcodes', //!this will be your cloud name - this should be in your .env
        uploadPreset: 'user_sound_preset', //!this will be your upload presets - this should be in your .env
        folder: 'my_found_sounds',
        clientAllowedFormats: ['mp3', 'ogg', 'wav'],
        maxFileSize: 1048576, 
      },

      (err, result) => {
        if (result.event !== 'success') {
          return
        } console.log(result)
        setFormData({
          ...formData,
          url: result.info.url,
          
        })
      }
    ).open()
  }

  // Submits our formData to our API and redirects users back to page with newly posted sound.
  async function handleSubmit(event) {
    event.preventDefault()
    const token = localStorage.getItem('token')
    // gets all forms first, and then ...selected will overwrite existing
    const newFormData = {
      ...formData,
      ...selected, 
    }
  
    console.log(formData)
    try {
      const { data } = await axios.post(`${baseUrl}/all-sounds`, newFormData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      console.log(data._id)
      updateButton(!button)
      navigate(`/all-sounds/${data._id}`)
      fetchSound()
      
    } catch (err) {
      console.log(err.response.data)
    }
  }
  
  

  return <>
    <div className={styles.grid}>
      <NavBar />
      
      {button === true ?
        <div className={styles.gridContainer}>
          <button className={styles.backButton} onClick={() => updateButton(!button)}>Back</button>
          <button className={styles.uploadButton} onClick={handleUpload}>Click to upload your sound</button>          
          
          <br />
          
          <div className="field">
            <label className="label has-text-light"></label>
          <div className="control">
            <input
              className="input"
              placeholder='Name of your sound'
              type="text"
              name='fileName'
              onChange={handleChange}
              value={formData.fileName}
            />
          </div>
          </div>

                   
          <textarea
            className="textarea"
            placeholder='Describe your sound here...'
            name="caption" 
            onChange={handleChange}
            value={formData.caption}
            />

          <br />  
          <SubCategories 
            selected = {selected} 
            setSelected = {setSelected}
            onChange={(category) => setFormData({ ...formData, category })}
            value={formData.category}
          />
          <br />
          <input
              className="input"
              placeholder="enter #hashtags"
              type="text"
              name='hashtag'
              onChange={handleChange}
              value={formData.hashtag}
            />
    
          
    <button type="submit" className={styles.button} onClick={handleSubmit}>Submit</button>
        </div>
        :
        <div>
          <article className={styles.article}>
            <button className={styles.uploadButton} onClick={() => updateButton(!button)}>Click here to post your sound</button>
          </article>

          <div className={styles.grid}>

          {soundDisplay.map(sound => {
            return <div key={sound._id} className={styles.gridContainer}>
              <div className={styles.grid}>
                
                  <div className={styles.gridContainer}>
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
                </div>
              </div>


          })}
        </div>
        </div>
      }
    </div>
  </>
}


export default SoundCreate