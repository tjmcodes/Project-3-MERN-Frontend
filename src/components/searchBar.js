import React from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import styles from '../styles/searchBar.module.scss'
import { baseUrl } from "../config"
function SearchBar() {
  const [hashtagdata, setHashtagData] = React.useState(undefined)
  const [hashtag, setHashtag] = React.useState("")
  //const [title, setTitle] = useState('')
  


    async function getHashtag(event) {
      const _tag= event.target.value
      setHashtag(_tag);
      axios.get(`${baseUrl}/hashtags?hashtag=${_tag}`)
      .then(axiosResp => {
        setHashtagData(axiosResp.data)


})}

  return <div className={styles.SearchBarcomponant}>
  <div >
    <input type="text" className={styles.searchbar} onChange={getHashtag} placeholder="Search by Hashtag"></input>
  </div>  
    <div className={styles.resultsContainer}>
      {hashtagdata ? hashtagdata.map((hash, index) => {
        return <div key={index}>
          <Link to={`/hashtagsearchresults/${hash.hashtag}`} state={hashtag.hashtag} style={{ textDecoration: "none" }}>
            <div className={styles.name_container}>
              <h3 className={styles.name}>{`#${hash.hashtag}`}</h3>
            </div>
          </Link>
        </div>
      }) : null}
      </div>
  </div>
}

export default SearchBar