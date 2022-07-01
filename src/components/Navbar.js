import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return <nav className="navbar " role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active ">
      <div className="navbar-start">
        <div className="navbar-item">
          <div className="buttons">
            <Link to='/all-sounds' className="button is-light">
              Discover Sounds
            </Link>
            <div className="logo">
              <img src="..src/assets/myFoundSoundsLogo/myfound Sounds.png" alt="my found sound logo"></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default NavBar

