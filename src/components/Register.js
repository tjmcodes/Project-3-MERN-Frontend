import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  // ! Using react router to navigate
  const navigate = useNavigate()
  const [button, updateButton] = useState(false)

  // ! Put our form fields in state.
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    image: "",
    url: 'https://i.imgur.com/xnUtYOd.jpg'
  })
  // ! Errors in state
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    image: "",
  })

  function handleChange(event) {
    // ! name: field you've typed in, e.g. the email input
    // ! value: the text that's in that field
    const { name, value } = event.target
    setFormData({
      ...formData, // ! This is whatever the form data was before, all it's fields.
      [name]: value, 
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  // ! Cloudinary upload! This is will also update the formData with the url string for the sound
  // ! to be uploaded
  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'tjmcodes', //!this will be your cloud name - this should be in your .env
        uploadPreset: 'user_profile_pics', //!this will be your upload presets - this should be in your .env
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
          url: result.info.secure_url,
        })
      }
      ).open()
    }
    console.log(setFormData.url)

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await axios.post('/api/register', formData)
      // ! Navigate to the /login page. 
      updateButton(!button)
      navigate('/login')

    } catch (err) {
      // ! Print out the response from the backend if there's an error
      console.log(err.response.data)
      console.log(formData.username)
      setErrors(err.response.data.errors)
    }
  }

  console.log(formData)
  return <div className="section">
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'username'} 
            // ! Adding these 2 fields means your component is 'controlled'. This is good practice!
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <small className="has-text-danger">{errors.username}</small>}
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'email'}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="has-text-danger">{errors.email}</small>}
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name={'password'}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="has-text-danger">{errors.password}</small>}
        </div>
      </div>
      <div className="field">
        <label className="label">Confirm password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            name={'passwordConfirmation'}
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
          {errors.passwordConfirmation && <small className="has-text-danger">{errors.passwordConfirmation}</small>}
        </div>
      </div>
      <div className="field">
        <button className="button" onClick={handleUpload}>Click to upload profile picture </button>          
      </div>
      <button className="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  </div>
}

export default Register
