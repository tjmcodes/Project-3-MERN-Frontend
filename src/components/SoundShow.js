import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {  getLoggedInUserId } from '../lib/auth.js'
import axios from 'axios'
import NavBar from './NavBar.js'
import styles from '../styles/soundShow.module.scss'


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

  React.useEffect(() => {
    fetch(`/api/all-sounds/${soundId}`)
      .then(resp => resp.json())
      .then(data => setSound(data))
      console.log(sound)
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
      console.log(sound)
      // navigate(`/all-sounds/${data._id}`)
      window.location.reload()
      console.log(data)
    } catch (err) {
      console.log(err)
      console.log(sound)
    }

    
  }
  return (
    <div>
      <NavBar />
      <section className={styles.section}>
        <div className="container">
          {sound ? (

          // U S E R  C A R D  H E A D E R  F O R  P O S T E D  S O U N D S        
            <main key={sound} className={styles.main}>

              <div className={styles.profile}>
                <div className="avatar-header">

                <div key={sound.user.username} className={styles.profile.username}>
                <h4 className="title is-4"> </h4>
          
                  <div key={sound.user.image} className={styles.avatar}>
                    <img className={styles.profile.img} src={sound.user.image} alt="avatar"></img>
                    <p className={styles.profile.p}>{sound.user.username}</p>
                  
                  {/* {console.log(sound.user)} */}
                  </div>
                  </div>
                </div>
                
                 {/* H A S H T A G S */}
                <div className={styles.hashtags}>
                <h4 className="title is-4">
                </h4> {sound.hashtag.slice(0, 3).map((tag, index) => {
                  return <article key={index} className={styles.hashtag}>
                    <div className="content">
                        <p className={styles.hashtag}>
                          #{tag}
                        </p>
                    </div>  
                  </article>
                })}
                </div>
              </div>

    
            
            {/* D A T E  A N D  T I M E  I N F O*/}
            <div className={styles.banner}>                 
              <div className={styles.categories}>                

                <div key={sound} className="sound-title">
                  <h2 className={styles.tracktitle}>{sound.fileName}</h2>
                    <div key={sound.createdAt} className="date-posted">
                    <br />  
                      <span className={styles.span}>
                        {sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}      
                      </span>
                    </div>
                </div>
                  
                    <div key={sound.category} className="category">
                      <p>
                        Category: {sound.category}
                      </p>
                    </div>

                    <div className="sub-category">
                      <p>
                        Sub category: {sound.subCategory}
                      </p>
                    </div>

                </div>
              </div>

              <div className="content">
             
             {/* A U D I O  C O N T R O L S  &  W A V  I M A G E */}
                <div key={sound.url} className={styles.audiocontainer}>
                <h2 className="title is-4">
                    
                      <img className={styles.audioMedia} src="http://res.cloudinary.com/tjmcodes/video/upload/h_200,w_500,fl_waveform/v1656611932/my_found_sounds/ivtjkcpiijzrqy8upvke.png" alt="wavfile">
                        </img> 
                       
                        <audio controls className={styles.media}>
                          <source src={sound.url} type="audio/wav"></source>  
                        </audio>
                        
                      </h2>
                      

 
                {/* D E L E T E  P O S T  B Y  O R I G I N A L  U S E R  */}
                <div className={styles.deletepost}>
                {/* // ? Only show the button if the sound was made by the user. */}
                {/* Here we're calling it to check if the sound user ID matches the logged in user ID and if it does you showed the button it doesn't you don't show them.*/}
                {/* We have included the or operator to check sound user once a comment has been posted due to the structure of object that is returned */}
                {sound && (user === (sound.user) || (sound.user._id)) ? <button className={styles.buttondelete} onClick={toggleModal}>
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
              </div>
            </div>
          
          {/* C O M M E N T S  */}
         <div className={styles.commentsContainer}>
                <h4 className={styles.h4}>Post your comments</h4> 
                <div key={sound.comments} className={styles.commentsContent}>
                {sound.comments && sound.comments.map((comment, index) => {
                  return <article key={index} className=".commentDiv">
                      <div className={styles.commentMedia}>
                      <p className={styles.commentavatar}>
                            {comment.user.username}
                            
                            <img className={styles.imgavatar} src={comment.user.image} alt='avatar'></img>
                            
                          </p>
                        <div className={styles.commentbox}>

                          <div className={styles.usertext.p}>
                          <p>{comment.content}</p>
                          
                          <br />  
                          <span className={styles.spanText}>
                          {sound.createdAt.split("T")[1].split(":").slice(0, -1).join(":")}
                          <br />
                          {sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}
                          </span>
                          </div>
                          
                        </div>
                      </div>
                    </article>
                  })}
                  </div> 

                  {/*  // P O S T I N G  A  C O M M E N T // }
                  {/*We are only going to show article below to post a comment if "getLoggedInUserId" because if they have a logged in user id they're must be logged in */}
                  <div key={sound.user._id} className={styles.lastcommentbox}>
                  {getLoggedInUserId() && <article className="media">
                    <div className={styles.mediaContentCommentbox}>
                      <div className="field">
                          <textarea 
                            maxLength={280}
                            className={styles.commentTextarea}
                            placeholder="Make a comment.."
                            onChange={(event) => setCommentContent(event.target.value)}
                          >
                          </textarea>
                      </div>
                      <div className="field">
                        <div className="control">
                          <button
                            className={styles.buttonSubmitComment}
                            onClick={handleComment}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>}
                  </div>
                </div>
              </main>
          ) : (
            <p>...loading</p>
          )}
        </div>
  
      </section>
    </div>
  )
}

export default ShowSound
