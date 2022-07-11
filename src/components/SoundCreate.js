import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'
// import hashtagfy from 'hashtagfy2'
import { useNavigate } from "react-router-dom"
// import { Link } from 'react-router-dom'
import SubCategories from '../data/SubCategories.js'
import NavBar from './NavBar.js'
import styles from '../styles/SoundCreate.module.scss'
import { baseUrl } from '../config.js'
import Footer from './Footer.js'



function SoundCreate() {

  const navigate = useNavigate()
  

  const [soundDisplay, updateSoundDisplay] = useState([])
  const [button, updateButton] = useState(false)

  
  
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
        cloudName: 'tjmcodes', 
        uploadPreset: 'user_sound_preset', 
        folder: 'my_found_sounds',
        clientAllowedFormats: ['mp3', 'ogg', 'wav'],
        maxFileSize: 5000000, 
      },

      (err, result) => {
        if (result.event !== 'success') {
          return
        } 
        const waveformPath = result.info.path.replace('.mp4', '.jpg')
        const waveformImage = (`https://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/${waveformPath}`)

        setFormData({
          ...formData,
          url: result.info.url,
          image: waveformImage
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
    


      const hashArray = formData.hashtag
      
      const hashobjects = hashArray.map((tag, index) => ({ hashtag: tag, index: index + 1 }));
      
      const { hashdata }  = await axios.post('/api/hashtags', hashobjects)
      console.log(hashdata)
      

    
    try {
      const { data } = await axios.post(`${baseUrl}/all-sounds`, newFormData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
      updateButton(!button)
      navigate(`/all-sounds/${data._id}`)
      fetchSound()
      
    } catch (err) {
      
    }
  }
  
  

  return <>
    <div className={styles.grid}>
      <NavBar />
      
      <div className={styles.gridContainer}>
        <button className={styles.backButton} onClick={() => updateButton(!button)}>Back</button>
        <button className={styles.uploadButton} onClick={handleUpload}>Click to upload your sound</button>          
          
        <br />
        {/* U P L O A D  S O U N D  F O R M */}  
        <div className="field">
          <label className="label has-text-light"></label>
          <div className="control">
            <input
              className={styles.input}
              placeholder='Name of your sound'
              type="text"
              name='fileName'
              onChange={handleChange}
              value={formData.fileName}
            />
                                
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
              className={styles.input}
              placeholder="enter #hashtags"
              type="text"
              name='hashtag'
              onChange={handleChange}
              value={formData.hashtag}
            />
          </div>
        </div>

        <button type="submit" className={styles.button} onClick={handleSubmit}>Submit</button>
      </div>
    </div>  
    <Footer />
  </>
}


export default SoundCreate