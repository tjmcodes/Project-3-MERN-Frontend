import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/NavBarSoundList.module.scss'

const NavBarSoundList = () => {
  return <nav className={styles.Navbar} role="navigation" aria-label="main navigation">
    <div className={styles.NavbarMain}>
      <div className={styles.firstElement}>
        <Link to='/all-sounds' className={styles.buttonblue}>
              Back to all sounds 
        </Link>

        <Link to='/all-sounds/new-sounds' className={styles.button}>
              Upload Your Sound
        </Link>
      </div>
      <div className={styles.Secondelement}>
        <div className={styles.imageContainer}>
          <img className={styles.logo} src={require ("../assets/myFoundSoundsLogo/logo_myFoundS_darker.png")} alt="my found sound logo"></img>
        </div>
      </div>
    </div>
  </nav>
}

export default NavBarSoundList