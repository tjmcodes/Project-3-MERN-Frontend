import React from 'react'
import { Link } from 'react-router-dom'

const NavBarSoundList = () => {
  return <nav className="navbar " role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active ">
      <div className="navbar-start">
        <div className="navbar-item">
          <div className="buttons">
            <Link to='/all-sounds/new-sounds' className="button is-light">
              Upload Your Sound
            </Link>
            <img src="../assets/myFoundSoundsLogo/logo_myFoundS_darker.png" alt="my found sound logo">
            </img>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default NavBarSoundList