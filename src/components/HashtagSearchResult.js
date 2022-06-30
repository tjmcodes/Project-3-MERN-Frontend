import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import {Link} from "react-router-dom"
function HashtagSearchResult(sethashdata, hashdata) {
 
  const [allMatchingSounds, setallMatchingSounds] = React.useState(undefined)
  const { hashtag } = useParams()
  
  console.log(hashtag)
  
  React.useEffect(() => {
  fetch(`/api/all-soundsbyhashtag?hashtag=${hashtag}`)
      .then(resp => resp.json())
      .then(data => setallMatchingSounds(data))
}, [])
  return (
    allMatchingSounds ?
  <>
  <p>Posts matching #{hashtag}</p>
  <div className="columns is-multiline is-mobile">
        {allMatchingSounds.map((sound, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            <Link to={`/all-sounds/${sound._id}`}>
              <div className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-content">
                      <h4 className="title is-4">
                        <span role="img" aria-label="plate">
                        </span>{" "}
                        Sound File
                        <audio key={sound.url} controls className="media">
                          <source src={sound.url} type="audio/wav"></source>  
                        </audio>
                      </h4>
                      <h5 className="subtitle is-5">Track name: {sound.fileName}</h5>
                      <h5 className="subtitle is-5">Category: {sound.category}</h5>
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
        })}
      </div>
  </> : <></>
  )
}

export default HashtagSearchResult