import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bulma'
// import hashtagfy from 'hashtagfy2'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import SubCategories from '../data/SubCategories.js'
import NavBar from './NavBar.js'



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
  
  // const [selectedUrls, setSelectedUrls] = React.useState( 
  // { url: '', image: '' } );

  // gets all sounds that have been created / posted
  async function fetchSound() {
    try {
      const { data } = await axios.get('/api/all-sounds')
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
      [event.target.name]: event.target.value,
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
          url: result.info.secure_url,
          // image: result.info.thumbnail_url,
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
      // ...selectedUrls
    }
    // }
    // const hashArray = formData.hashtag
      // const hashobjects = hashArray.map((str, index) => ({ hashtag: hashtag str, id: index + 1 }));
      // const { hashdata } = await axios.post('/api/hashtags', hashobjects)
      // console.log(hashdata)
    console.log(formData)
    try {
      const { data } = await axios.post('/api/all-sounds', newFormData, {
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
    <div>
      <NavBar />
      <h1 className="title">CloudGram</h1>
      {button === true ?
        <div className="container">
          <button className="button" onClick={() => updateButton(!button)}>Back</button>
          <button className="button" onClick={handleUpload}>Click to upload your sound</button>
          
          <div className="field">
          <label className="label">Name of the track</label>
          <div className="control">
            <input
              className="input"
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
            
          <SubCategories 
            selected = {selected} 
            setSelected = {setSelected}
            onChange={(subCategory) => setFormData({ ...formData, subCategory })}
            value={formData.subCategory}
          />
            
          <input
            className="input"
            type="text"
            name="hashtag"
            placeholder='hashtag'
            onChange={handleChange}
            value={formData.hashtag}
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
                  <Link to={`/all-sounds/${sound._id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                    <h4 className="title is-4">
                        <span role="img" aria-label="plate">
                        </span>{" "}
                      
                        {/* <img source src={sound.image.toString()} alt="wavfile">
                        </img>  */}
                        {/* <video src={sound.url} controls className="media" type="video">
                        </video> */}
                        <audio controls className="media">
                          <source src={sound.url} type="audio/wav"></source>  
                        </audio>
                          {console.log(sound.url)}
                          {console.log(sound.image)}

                      </h4>
                        
                      <h5 className="subtitle is-5">Track name: {sound.fileName}</h5>
                      <h5 className="subtitle is-5">Category: {sound.category}</h5>
                      <h5 className="subtitle is-5">Sub-category: {sound.subCategory}</h5>
                      <h5 className="subtitle is-5">
                  <span role="img" aria-label="plate">
                  </span>{" "}
                  Hashtags: {/* can we do a similar thing here with the show delete button if OP is true? We base this on if hashtags are present?  */}
                </h5> {sound.hashtag.map((tag, index) => {
                  return <article key={index} className="hashtag">
                    <div className="content">
                        <p className="subtitle">
                          #{tag}
                        </p>
                    </div>  
                  </article>
              })}
                    </div>
                  </div>
                </div>
                <div key={sound.user.image} className="card-image">
                  <figure className="image is-4by3">
                    <img src={sound.user.image} alt={sound.user.username} />
                  </figure>
                  <h5 className="subtitle is-5">User Posted: {sound.user.username}</h5>
                </div>
              </div>
            </Link>
                  </div>
                </div>
              </div>


          })}
        </div>
      }
    </div>
  </>
}


export default SoundCreate