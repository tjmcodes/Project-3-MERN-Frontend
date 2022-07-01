import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../styles/NavBarSoundList.module.scss'

const NavBar = () => {
  return <nav className={styles.Navbar} role="navigation" aria-label="main navigation">
    <div className={styles.NavbarMain}>
      <div className={styles.firstElement}>
        <Link to='/all-sounds' className={styles.button}>
              Discover Sounds
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


export default NavBar

