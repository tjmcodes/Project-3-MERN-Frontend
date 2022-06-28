import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [button, updateButton] = useState(false)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    image: "",
  })
  
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
    image: "",
  })

  function handleChange(event) {
        const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value, 
    })

    setErrors({
      ...errors,
      [name]: '',
    })
  }

  //  Cloudinary upload! This will also update the formData with the url string for the sound to be uploaded 
  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'tjmcodes', // your Cloudinary name in .env file
        uploadPreset: 'ejbxzzti', // Upload preset code from Cloudinary - this goes in your .env
        cropping: true,
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

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      await axios.post('/api/register', formData)
      updateButton(!button)
      navigate('/login')

    } catch (err) {
      // Console log responses from the backend to check for errors.
      console.log(err.response.data)
      console.log(formData.username)
      setErrors(err.response.data.errors)
    }
  }

  console.log(formData)
  return <div className="section">
    <div className="container">
      {/* <form onSubmit={handleSubmit}> */}
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name={'username'} 
            //  Adding these 2 fields below means your component is 'controlled'. This means they don't get out of sync with React.
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
      {/* </form> */}
    </div>
  </div>
}

export default Register
