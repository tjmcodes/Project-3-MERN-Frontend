import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import {Link} from "react-router-dom"
import SearchBar from './searchBar'
import styles from '../styles/HashtagSearchResults.module.scss'
import HashtagNavBar from './HashtagNavBar'
import { useState } from "react"
import { baseUrl } from "../config"
import Footer from "./Footer.js"
// import NavBarSoundList from "./NavBarSoundList"



function HashtagSearchResult(sethashdata, hashdata) {
  const [soundData, updateSoundData] = useState([]) // issue with true non boolean 
  const [filterValue, setFilterValue] = useState('')
  const [activeClass, setactiveClass] = useState('')
  const categories = ["nature", "human", "machines", "animals", "materials", "ambience", "electric", "weather"] 
  const { hashtag } = useParams()

  


  
  React.useEffect(() => {
  fetch(`${baseUrl}/all-soundsbyhashtag?hashtag=${hashtag}`)
      .then(resp => resp.json())
      .then(data => updateSoundData(data))
      
}, [hashtag])

function handleClick(event) {
  if (event.target.innerHTML === 'All Sounds') {
    setFilterValue('')
    setactiveClass(event.target.innerHTML)
  } else {
    setFilterValue(event.target.innerHTML)
    setactiveClass(event.target.innerHTML)
}
}
function categoryFilter() {
  return soundData.filter((sound) => {
    return (sound.category === filterValue || filterValue === '')
  })
}



// return <>
//   <HashtagNavBar />
  
//   {/* C A T E G O R I E S  S I D E  M E N U */}
//   <section className={styles.section}>
//     <div className={styles.main}>
//       <div className={styles.sidebar}>
//         <div className={styles.sidebarContent}>
//           <p onClick={handleClick} className={ (activeClass === "All Sounds") ? styles.categoryActive : styles.category}>All Sounds</p>
//           {categories.map((category, index) => {
//           return <p className={(activeClass === category) ? styles.categoryActive : styles.category} key={index} onClick={handleClick} >{category}</p>
//           })}
//         </div>
//       </div>
      
//       <div className={styles.gridContainer}>
//         <SearchBar />
//         <div className={styles.grid}>
//           {soundData === true ? null : categoryFilter().map((sound, index) => {
//           return <div key={index} className={styles.soundPreviewContainer}>  

//             {/* A U D I O  C O N T R O L S  &  W A V  I M A G E */}
//             <Link  to={`/all-sounds/${sound._id}`}>
//               <div className={styles.ClickToShowDetails}>
//                 <h5 className={styles.h5SoundList}>{sound.fileName}</h5>
//                   <div>
//                     <img className={styles.wavimg}src={sound.image} alt="wavfile"></img>    
//                     <video src={sound.url} controls className={styles.audiofile}></video>
//                   </div>
//               </div>
//             </Link>

//               {/* H A S H T A G S */}
//               <div className={styles.catagoryandHashtags}>
//                 <div>
//                   <h5>{sound.category}: {sound.subCategory}</h5>
//                 </div>
//                 <div className={styles.hashtags}>
//                   {sound.hashtag.slice(0, 3).map((tag, index) => {
//                   return <div key={index}><Link to={`/hashtagsearchresults/${tag}`}
//                   ><p className={styles.hashtag} >#{tag}</p>
//                   </Link></div>
//                   })}
//                 </div>
//               </div>
              
//             {/*  U S E R  C A R D  H E A D E R */}
//             <div className={styles.userdate}>
//               <Link to={`/oneUser/${sound.user._id}`} state={sound.user.username}> 
//               <div className={styles.userinfo}key={sound.user.image}>
//                 <img className={styles.userAvatar} src={sound.user.image} alt={sound.user.username}/>
//                 <h5>{sound.user.username}</h5>
//               </div>
//               </Link>
                  
//             {/* D A T E  A N D  T I M E  I N F O */}
//               <div className={styles.date}>
//                 <p>{sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
//               </div>
                    
//             </div>
//           </div>
//         })} 
//         </div>
//       </div>
//     </div>
//   </section>
//   <Footer />
// </>
// }

return <>
<HashtagNavBar />

<section className={styles.section}>
  <div className={styles.main}>

    {/* C A T E G O R I E S  S I D E  M E N U */}
    <div className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        <p onClick={handleClick} className={ (activeClass === "All Sounds") ? styles.categoryActive : styles.category}>All Sounds</p>
        {categories.map((category, index) => {
        return <p className={(activeClass === category) ? styles.categoryActive : styles.category} key={index} onClick={handleClick} >{category}</p>
        })}
      </div>
    </div>
    
    {/* M A I N  */}
    <div className={styles.gridContainer}>
      <SearchBar />
      <div className={styles.grid}>
        {soundData === true ? null : categoryFilter().map((sound, index) => {
        return (
        <div key={index} className={styles.soundPreviewContainer} >
          <div className={styles.wholeCard}>
            <div className={styles.innerCard}>
              
              {/* A U D I O  C O N T R O L S  &  W A V  I M A G E */}
              <Link  to={`/all-sounds/${sound._id}`}>
                <div className={styles.ClickToShowDetails}>
                  <h5 className={styles.h5SoundList}>{sound.fileName}</h5>
                  <div>
                    <img className={styles.wavimg} src={sound.image} alt="wavfile"></img>    
                    <video src={sound.url} controls className={styles.audiofile}></video>
                  </div>
                </div>
              </Link>
              
              {/* H A S H T A G S */}
              <div className={styles.catagoryandHashtags}>
                <div>
                  <h5>{sound.category}: {sound.subCategory}</h5>
                </div>
                <div className={styles.hashtags}>
                  {sound.hashtag.slice(0, 3).map((tag, index) => {
                  return ( 
                    <div key={index}>
                      <Link to={`/hashtagsearchresults/${tag}`}>
                        <p className={styles.hashtag} >#{tag}</p>
                      </Link>
                    </div>
                  )})}
                </div>
              </div>
                  
              {/*  U S E R  C A R D  H E A D E R */}
              <div className={styles.userdate}>
                <Link to={`/oneUser/${sound.user._id}`} state={sound.user.username}> 
                  <div className={styles.userinfo}key={sound.user.image}>
                    <img className={styles.userAvatar} src={sound.user.image} alt={sound.user.username}/>
                    <h5>{sound.user.username}</h5>
                  </div>
                </Link>
                
                {/* D A T E  A N D  T I M E  I N F O */}  
                <div className={styles.date}>
                  <p>{sound.createdAt.split("T")[0].split("-").slice(0).reverse().join(" ")}</p>
                </div>
              </div>
            </div>
              </div>
            </div>
          )})} 
        </div>
      </div>
    </div>
  </section>
<Footer />
</>
}

export default HashtagSearchResult