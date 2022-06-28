import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import shareVideo from '../assets/share.mp4'
import GoogleLogin from 'react-google-login'
import { FcGoogle } from 'react-icons/fc'
import logo from '../assets/OneWeb_Logo.png'

export default function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/login', formData)
      localStorage.setItem('token', data.token)
      console.log(data.token)
      navigate('/all-sounds')
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return <div className="section is-large">
    <div className="container is-flex is-flex-direction-column align-items-center">
      <div className="column is-centered">
        <video
          src={shareVideo}
          type="video/mp4"
          controls={false}
          loop
          muted
          autoPlay
          className="my-video"
        />
      </div>
    
    {/*             the logo i created            */}
      <div className=" logo" >
        <img src={logo} alt="logo" width="130px"  />
      </div>

      <div>
        <form onSubmit={handleSubmit} className="form">
          <div className="field">
            {/* <label className="label has-text-light">Email</label> */}
            <div className="control">
              <input
                className="column is-5"
                type="text"
                name={'email'}
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        
          <div className="field ">
            {/* <label className="label has-text-light">Password</label> */}
            <div className="control">
              <input
                className="column is-5"
                type="password"
                name={'password'}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>  
          </div>
          <button className="button is-small is-danger has-text-weight-bold ">Login</button>
        </form>
      </div>

      {/*                    google code so far                */}
      <div className="my-google mt-2">
        <GoogleLogin 
          clientId = {`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
          render = {(renderProps) => (
            <button
              type = "button"
              className="p-2 has-text-weight-bold "
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <FcGoogle className="google-button mr-2 "/> Sign in with Google
            </button>
            )}
            // onSuccess={responseGoogle}
            // onFailure={responseGoogle}
            // cookiePolicy="single_host_origin"
          />
      </div>


      {/*             register here area            */}
      <div className="register mt-2">
        <h3 className=" has-text-light has-text-weight-bold">New user? <a href="register" className="has-text-weight-bold has-text-success">register here</a></h3>
      </div>
    </div>
    
</div>
}



