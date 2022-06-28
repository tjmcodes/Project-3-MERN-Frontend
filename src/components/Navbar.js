import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return <nav className="navbar " role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active ">
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/all-sounds" className="button is-dark">
              <strong>All Sound</strong>
            </Link>
            <Link to="/register" className="button is-light">
              Register
            </Link>
            <Link to="/login" className="button is-light">
              Login
            </Link>
            <Link to='/all-sounds/new-sounds' className="button is-light">
              New Sounds
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default NavBar