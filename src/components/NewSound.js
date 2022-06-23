// this code is from Nick's code: image-upload-example

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'

const App = () => {
  const [imageDisplay, updateImageDisplay] = useState([])
  const [button, updateButton] = useState(false)
  const [inputValue, updateInputValue] = useState('')
  const [formData, updateFormData] = useState({
    caption: '',
    url: 'https://i.imgur.com/xnUtYOd.jpg'
  })

  // ! Function to fetch all images in our API
  async function fetchImages() {
    try {
      const { data } = await axios.get('/api/imageUpload')
      // ! reversing the data so that the newest images will appear first
      updateImageDisplay(data.reverse())
    } catch (err) {
      console.log(err)
    }
  }
  // fetchImages()

  useEffect(() => {
    fetchImages()
  }, [])

  // ! Function which updates the formData with the caption the user wants to upload.
  function handleChange(e) {
    updateInputValue(e.target.value)
    updateFormData({
      ...formData,
      caption: e.target.value
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
      const { data } = await axios.post('/api/imageUpload', formData)
      console.log(data)
      updateButton(!button)
      fetchImages()
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
          <button className="button" onClick={handleUpload}>Click to upload an image</button>
          <textarea
            className="textarea is-primary"
            placeholder='Your caption'
            onChange={handleChange}
            value={inputValue} />
          <button className="button" onClick={handleSubmit}>Submit and return</button>
        </div>
        :
        <div>
          <button className="button" onClick={() => updateButton(!button)}>Click here to post a image</button>
          {imageDisplay.map(image => {
            return <div key={image._id} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <div className="card">
                <div className="card-content">
                  <div className="card-image">
                    <figure className="image is-4by3">
                      <img src={image.url} />
                    </figure>
                  </div>
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4">
                        {image.caption}
                      </p>
                    </div>
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