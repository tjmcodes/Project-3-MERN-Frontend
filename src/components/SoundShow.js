import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { isCreator, getLoggedInUserId } from '../lib/auth.js'
import axios from 'axios'


function ShowSound() {
  const [showSound, setShowSound] = React.useState(undefined)

  const [commentContent, setCommentContent] = React.useState('')
  const soundState = useParams()
  console.log(soundState)
  const soundId = soundState.sound
  console.log(soundId)
  const navigate = useNavigate()
  console.log(getLoggedInUserId())
  
  React.useEffect(() => {
    async function getdata(){
      const resp = await axios.get(`/api/all-sounds/${soundId}`)
      setShowSound(resp.data)
    }
    getdata()
    // fetch(`api/all-sounds/${sound}`)
    //   .then(resp => resp.json())
    //   .then(data => setShowSound(data))
  }, [soundId])

  async function handleDelete() {
    try {
      await axios.delete(`/api/all-sounds/${soundId}`, { // First argument is the URL
        // With Delete and Get you can't post information, so there are only two arguments
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, 
      })
      navigate('/api/all-sounds')
    } catch (e) {
      console.log(e)
    }
  }

  // console.log(sound)

  async function handleComment() {
    try {
      const { data } = await axios.post(
        `/api/all-sounds/${soundId}/comments`, // First argument is the URL
        // Below we are going to take the text inside of the comentContent and stick it in the content.
        { content: commentContent }, // IMPORTANT: When posting in axios the second argument is an object the thing you are posting. 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Third argument is any headers or options.
        }
      )
      setShowSound(data)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <section className="section">
      <div className="container">
        {showSound ? (
          <div>
            <h2 className="title has-text-centered">{showSound.fileName}</h2>
            <hr />
            <div className="columns">
              <div className="column is-half">
                <figure className="image">
                  {/* audio src needs to be the URL from cloudinary*/}
                  <audio src={showSound.audioFile}></audio> 
                </figure>
                {/* // ? Only show the button if the sound was made by the user. */}
                {/* Here we're calling it to check if the pokemon user ID matches the logged in user ID and if it does you showed the button it doesn't you don't show them.*/}
                {/* You can do that to show whatever features you want to disable for users who are not the logged in user, you can do it like that. */}
                {isCreator(showSound.user._id) && <button 
                  className="button is-danger"
                  onClick={handleDelete}
                >
                  ☠️ Delete Sound
                </button>}
              </div>
              <div className="column is-half">
                <h4 className="title is-4">
                  <span role="img" aria-label="plate">
                  </span>{" "}
                  category
                </h4>
                <p>{showSound.category}</p>
                <hr />

                <hr />
                <h4 className="title is-4">
                  <span role="img" aria-label="globe">
                  </span>{" "}
                  sizeInBytes
                </h4>
                {/* <hr /> */}
                <p>{showSound.sizeInBytes}</p>
                <hr />

                <p>{showSound.user.username}</p>
                {
                  // Show our comments (lots of bulma)
                }
                <br />
                {showSound.comments && showSound.comments.map(comment => {
                  return <article key={comment._id} className="media">
                    <div className="media-content">
                      <div className="content">
                        <p className="subtitle">
                          {comment.createdAt}
                        </p>
                        <p className="subtitle">
                          {comment.user.username}
                        </p>
                        <p>{comment.content}</p>
                      </div>
                    </div>
                  </article>
                })}

                {
                  //? Little form to POST a comment (again lots of bulma)
                }
                {/*We are only going to show article below to post a comment if "getLoggedInUserId" because if they have a logged in user id they're must be logged in */}
                {getLoggedInUserId() && <article className="media"> 
                  <div className="media-content">
                    <div className="field">
                      <p className="control">
                        <textarea
                          className="textarea"
                          placeholder="Make a comment.."
                          // ! Set the comment's content to be what's in the input textarea.
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
  )
}

export default ShowSound

