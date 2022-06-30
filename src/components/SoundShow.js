import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import {  getLoggedInUserId } from '../lib/auth.js'
import axios from 'axios'
import NavBar from "./NavBar.js"
import styles from "../styles/soundShow.module.scss"

function ShowSound() {
  const [sound, setSound] = React.useState(undefined)
  const [commentContent, setCommentContent] = React.useState('')
  const [toggleDeleteConfirmation, setToggleDeleteConfirmation] = React.useState(false)
  const [deletedMessage, setdeletedMessage] =React.useState(false)
  const { soundId } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = React.useState('')
  React.useEffect(() => {
    const getuser = getLoggedInUserId()
    setUser(getuser)
  }, [])
  
  // console.log(user)
  
  React.useEffect(() => {
    fetch(`/api/all-sounds/${soundId}`)
      .then(resp => resp.json())
      .then(data => setSound(data))
      // console.log(sound)
  }, [soundId])

  async function handleDelete() {
    try {
      await axios.delete(`/api/all-sounds/${soundId}`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, 
      })
      setToggleDeleteConfirmation(!toggleDeleteConfirmation)
      setdeletedMessage(!deletedMessage)

      setTimeout(function() {
        navigate('/all-sounds')
      }, 1500);
      
    } catch (err) {
      console.log(err)
      console.log(sound)
    }
  }

function toggleModal() {
  setToggleDeleteConfirmation(!toggleDeleteConfirmation)
}
  

  async function handleComment() {
    console.log(sound._id)
    try {

      const { data } = await axios.post(
        `/api/all-sounds/${soundId}/comments`, 
        { content: commentContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, 
        }
      )
      setSound(data)
      navigate(`/all-sounds/${data._id}`)
      // navigate(`/all-sounds/${soundId}`)
      console.log(data)
    } catch (err) {
      console.log(err)
      console.log(sound)
    }
  }
  return (
    <div>
      <NavBar />
      <section className="section">
        <div className="container">
          {sound ? (

          //card for showing sound posted:
          
            <div key={sound} className="profile">

                <hr />
                <div key={sound.user.username} className="username">
                <h4 className="title is-4">
                  {/* <span role="img" aria-label="plate">
                  </span>{" "} */}
                  {/* Posted by: */}
                </h4>
                <p>{sound.user.username}</p>
                </div>

                {/* Need to fix cloudinary avatar image call from their API*/}
                <div key={sound.user.image} className="avatar">
                <img src={sound.user.image} alt="avatar"></img>
                
                {console.log(sound.user)}
                </div>
          
              <div key={sound} className="card">
                <hr />

                <div key={sound} className="sound-title">
                <h2 className="title is-2">{sound.fileName}</h2>
                </div>

                <hr />

                <div key={sound.createdAt} className="date-posted">
                <h4 className="title is-4">
                  {/* <span role="img" aria-label="plate">
                  </span>{" "} */}
                  {/* Date posted: */}
                </h4>
                <p>{sound.createdAt}</p>
                </div>

                <hr />

                <div className="hashtags">
                <h4 className="title is-4">
                  <span role="img" aria-label="plate">
                  </span>{" "}
                  Hashtag
                </h4> {sound.hashtag.map((tag, index) => {
                  return <article key={index} className="hashtag">
                    <div className="content">
                        <p className="subtitle">
                          #{tag}
                        </p>
                    </div>  
                  </article>
                })}
                </div>
                <hr /> 

                               
                <div key={sound.category} className="category">
                <h4 className="title is-4">
                  {/* <span role="img" aria-label="plate">
                  </span>{" "} */}
                  Category
                </h4>
                <p>{sound.category}</p>
                </div>
                <hr />

                <div className="sub-category">
                <h4 className="title is-4">
                  {/* <span role="img" aria-label="plate">
                  </span>{" "} */}
                  Sub Category
                </h4>
                <p>{sound.subCategory}</p>
                </div>

                
            <hr />
            <div className="content">
             
                <div key={sound.url} className="audio-container">
                <h4 className="title is-4">
                        {/* <span role="img" aria-label="plate">
                        </span>{" "} */}
                      
                      <img src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img> 
                        {/* <video src={sound.url} controls className="media" type="video">
                        </video> */}
                        <audio controls className="media">
                          <source src={sound.url} type="audio/wav"></source>  
                        </audio>
                        
                      </h4>

                <hr />

                <div className="delete-post">
                {/* // ? Only show the button if the sound was made by the user. */}
                {/* Here we're calling it to check if the sound user ID matches the logged in user ID and if it does you showed the button it doesn't you don't show them.*/}
                {/* You can do that to show whatever features you want to disable for users who are not the logged in user, you can do it like that. */}
                {sound && (user === (sound.user._id)) ? <button className="button is-danger" onClick={toggleModal}>
                    Delete sound
                    </button> : null}
                  { toggleDeleteConfirmation &&  
                  <div className={styles.modal}>
                    <div className={styles.modalcontent}>
                      <h2 className="is-size-2 has-text-centered">Are you sure you want to delete this sound?</h2>
                      <p className="is-size-4 has-text-centered">This action cannot be undone</p>
                    <div className="is-size-2 has-text-centered">
                      <button onClick={handleDelete} className="button is-danger m-4">Delete sound</button>
                      <button onClick={toggleModal} className="button is-primary m-4">Return to Sound</button>
                    </div>
                  </div>
                  </div>}
                  {deletedMessage && 
                  <div className={styles.modal}>
                    <div className={styles.modalcontent}>
                      <h2 className="is-size-2 has-text-centered">Your sound has been deleted</h2>
                      <p className="is-size-4 has-text-centered">redirecting you back to all sounds</p>
                    </div>
                  </div>}
                </div>

                <hr />
              </div>
            </div>
          </div>
         <div className="commentsContainer">
                <h4 className="title is-4">Comments</h4> 
                <div key={sound.comments} className="Comments-content">
                {sound.comments && sound.comments.map(comment => {
                  return <article key={comment.user.username} className="media">
                      <div className="media-content">
                        <div className="content">
                          <p>
                            {comment.createdAt}
                          </p>
                          <p className="subtitle">
                            {comment.user.username}
                            {/* {console.log(comment.user.username)} */}
                          </p>
                          <p>{comment.content}</p>
                        </div>
                      </div>
                    </article>
                  })}
                  </div>
  
                  {
                    //? Little form to POST a comment (again lots of bulma)
                  }
                  {/*We are only going to show article below to post a comment if "getLoggedInUserId" because if they have a logged in user id they're must be logged in */}
                  <div key={sound.user._id} className="content">
                  {getLoggedInUserId() && <article className="media">
                    <div className="media-content">
                      <div className="field">
                        <p className="control">
                          <textarea
                            className="textarea"
                            placeholder="Make a comment.."
                            onChange={(event) => setCommentContent(event.target.value)}
                          >
                          </textarea>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <button
                            className="button is-info"
                            onClick={handleComment}
                          >
                            Submit
                          </button>
                        </p>
                      </div>
                    </div>
                  </article>}
                  </div>
                </div>
              </div>
          ) : (
            <p>...loading</p>
          )}
        </div>
  
      </section>
    </div>
  )
}

export default ShowSound
