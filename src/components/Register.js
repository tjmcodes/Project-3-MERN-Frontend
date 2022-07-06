import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/myFoundSoundsLogo/logo_myFoundS_darker.png'
import shareVideo from '../assets/share.mp4'
import styles from '../styles/Register.module.scss'
import { baseUrl } from '../config'


function Register() {
  // Using react router to navigate
  const navigate = useNavigate()
  const [button, updateButton] = useState(false)
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    image: "https://res.cloudinary.com/tjmcodes/image/upload/v1656844656/my_found_sounds_pics/r673ncsqnjycl9pztuze.jpg",
    // url: 'https://i.imgur.com/xnUtYOd.jpg'
  })
  //  Errors in state
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    image: "",
  })
  function handleChange(event) {
    // name = field you've typed in, e.g. the email input
    // value = the text that's in that field
    const { name, value } = event.target
    setFormData({
      ...formData, //  This is whatever the form data was before, all it's fields.
      [name]: value, 
    })
    setErrors({
      ...errors,
      [name]: '',
    })
  }
  // Cloudinary upload! This is will also update the formData with the url string for the sound to be uploaded
  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'tjmcodes', 
        uploadPreset: 'user_profile_pics', 
        folder: 'my_found_sounds_pics',
        cropping: true,
        placeholderImage: true,
        clientAllowedFormats: ['JPG', 'PNG', 'GIF', 'BMP', 'TIFF', 'ICO', 'PDF', 'EPS', 'PSD', 'SVG', 'WebP', 'JXR', 'WDP'],
        maxFileSize: 1048576, 
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        setFormData({
          ...formData,
          image: result.info.url,
        })
        console.log(result.info.url)
        console.log(result.info)
      }
      ).open()
    }
    console.log(setFormData.url)
    
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      await axios.post(`${baseUrl}/register`, formData)
      updateButton(!button)
      navigate('/')
    } catch (err) {
      console.log(err.response.data)
      console.log(formData.username)
      setErrors(err.response.data.errors)
    }
  }
  console.log(formData)
  
  return <div className="register-page">
    <div className="column is-centered">
      <video
        src={shareVideo}
        type="video/mp4"
        controls={false}
        muted
        // autoPlay
        className={styles.registerBackground}
        />
    </div>
    
    <div className="column is-half is-offset-one-quarter" id="register">
      <form onSubmit={handleSubmit} className={styles.hero}>
      <div className=" logo mb-5" >
        <img src={logo} alt="logo" width="230px"  />
      </div>
     
      <div className="field">
        <label className="label has-text-light">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'username'} 
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <small className="errors">{errors.username}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label has-text-light">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'email'}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="errors">{errors.email}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label has-text-light">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name={'password'}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="errors">{errors.password}</small>}
        </div>
      </div>

      <div className="field">
        <label className="label has-text-light">Confirm password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name={'passwordConfirmation'}
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          {errors.passwordConfirmation && <small className="errors">{errors.passwordConfirmation}</small>}
        </div>
      </div>

      <div>
        <button type="submit" className="button is-danger has-text-weight-bold mt-1 " onClick={handleSubmit}>Submit</button>
      </div>
      
      </form>

      <div>
        <button className={"button is-info has-text-weight-bold mt-3"} onClick={handleUpload}>Click to upload profile picture</button>          
      </div>
      
    </div>
  </div>
}
export default Register