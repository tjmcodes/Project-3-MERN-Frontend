// this code is from Nick's code: image-upload-example

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'
import Select from 'react-select'
import categoryType from '../data/categoryType.js'
import hashtagfy from 'hashtagfy2'
import { useNavigate } from "react-router-dom"



const App = () => {


  const navigate = useNavigate()

  const [soundDisplay, updateSoundDisplay] = useState([])
  const [button, updateButton] = useState(false)
  const [inputValue, updateInputValue] = useState('')

  const hashtag2 = hashtagfy('', { capitalize: false })
  
  const [formData, setFormData] = useState({
    caption: '',
    url: 'https://i.imgur.com/xnUtYOd.jpg',
    categoryType: [],
    hashtag: [],

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
    setFormData({
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
        setFormData({
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
    const token = localStorage.getItem('token')

    // const newFormData = {
    //   ...formData,
    //   types: formData.types.map(type => type.value),
    // }


    try {
      const { data } = await axios.post('/api/all-sounds/new-sounds', formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      
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
            placeholder='Describe your sound here...'
            onChange={handleChange}
            value={inputValue} />
            
          <div className="media"> 
            
            <Select
              defaultValue={[]}
              name="colors"
              placeholder='Select category'
              options={categoryType}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(categoryType) => setFormData({ ...formData, categoryType })}
              value={formData.categoryType}
            />

              <input
                className="input"
                type="text"
                value={inputValue}
                onChange={handleChange}
                name={formData.hashtag}
              />

            
          </div>
          
          
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