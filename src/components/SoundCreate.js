
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'
import Select from 'react-select'
import categoryType from '../data/categoryType.js'
import hashtagfy from 'hashtagfy2'


const App = () => {
  const [soundDisplay, updateSoundDisplay] = useState([])
  const [button, updateButton] = useState(false)
  const [inputValue, updateInputValue] = useState('')

  const hashtag2 = hashtagfy('', { capitalize: false })
  
  const [formData, updateFormData] = useState({
    caption: '',
    url: 'https://i.imgur.com/xnUtYOd.jpg',
    categoryType: '',
    hashtag: hashtag2

  })

  // ! Function to fetch all images in our API
  async function fetchSound() {
    try {
      const { data } = await axios.get('/api/all-sounds')
      // ! reversing the data so that the newest images will appear first
      updateSoundDisplay(data.reverse())
    } catch (err) {
      console.log(err)
    }
  }
  // fetchImages()

  useEffect(() => {
    fetchSound()
  }, [])

  // ! Function which updates the formData with the caption the user wants to upload.
  function handleChange(event) {
    updateInputValue(event.target.value)
    updateFormData({
      ...formData,
      caption: event.target.value
    })
  }

  // ! Cloudinary image upload! This is will also update the formData with the url string for the photo
  // ! to be uploaded
  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'tjmcodes', //!this will be your cloud name - this should be in your .env
        uploadPreset: 'ejbxzzti', //!this will be your upload presets - this should be in your .env
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        updateFormData({
          ...formData,
          url: result.info.secure_url
        })
      }
    ).open()
  }

  // ! Function that submits our formData to our API.
  // ! Will call the fetchImage function & take user back to images
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      const { data } = await axios.post('/api/all-sounds', formData)
      console.log(data)
      updateButton(!button)
      fetchSound()
    } catch (err) {
      console.log(err)
    }
  }

  // ! using a tenary statement to either display the images or image upload  
  return <>
    <div>
      <h1 className="title">CloudGram</h1>
      {button === true ?
        <div className="container">
          <button className="button" onClick={() => updateButton(!button)}>Back</button>
          <button className="button" onClick={handleUpload}>Click to upload your sound</button>
          <textarea
            className="textarea"
            placeholder='Your caption'
            onChange={handleChange}
            value={inputValue} />
            
          <div className="media"> 
            
            <Select
              defaultValue={[]}
              name="colors"
              options={categoryType}
              placeholder='Select category'
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(categoryType) => updateSoundDisplay({ ...formData, categoryType })}
              value={formData.categoryType}
            />
            
          </div>
          <input
                className="input"
                type="text"
                value={formData.hashtag}
                onChange={handleChange}
                name={hashtag2}
              />

          <button className="button" onClick={handleSubmit}>Submit and return</button>
        </div>
        :
        <div>
          <button className="button" onClick={() => updateButton(!button)}>Click here to post your sound</button>
          {soundDisplay.map(sound => {
            return <div key={sound._id} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <div className="card">
                
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">
                        {sound.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


          })}
        </div>
      }
    </div>
  </>
}


export default App