import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => (
  <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link className="navbar-item"to="/">Home</Link>
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div className="navbar-menu">
      <div className="navbar-end">
        {/* <Link className="navbar-item" to=""></Link> */}
      </div>
    </div>
  </nav>
)

export default NavBar
