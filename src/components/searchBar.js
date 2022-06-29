import React from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
function SearchBar() {
  const [hashtagdata, setHashtagData] = React.useState(undefined)
  const [hashtag, setHashtag] = React.useState("")
  //const [title, setTitle] = useState('')
  


    async function getHashtag(event) {
      const _tag= event.target.value
      setHashtag(_tag);
      console.log(_tag)
      axios.get(`api/hashtags?hashtag=${_tag}`)
      .then(axiosResp => {
        setHashtagData(axiosResp.data)
    
    // const response = await fetch(`api/hashtags?hashtag=${_tag}`)
    // const data = await response.json()
    // setHashtagData(data.matches)
    // console.log(hashtagdata)

})}

  return <div className="SearchBarcomponant">
  <div >
    <input type="text" className="searchbar" onChange={getHashtag} placeholder="Search by Hashtag"></input>
  </div>  
    <div className="resultsContainer">
      {hashtagdata ? hashtagdata.map((hash, index) => {
        return <div key={index}>
          <Link to={`/hashtagsearchresults/${hash.hashtag}`} state={hashtag.hashtag} style={{ textDecoration: "none" }}>
            <div className="name_container">
              <h3 className="name">{`#${hash.hashtag}`}</h3>
            </div>
          </Link>
        </div>
      }) : null}
      </div>
  </div>
}

export default SearchBar