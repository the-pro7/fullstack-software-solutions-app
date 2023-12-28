import React from 'react'
import MainLogo from '../assets/logo.png'
import { Link } from 'react-router-dom'

export default function Navbar () {
  return (
    <nav className='primary-nav'>
      <div className='logo'>
        <Link to='/'>
          <img src={MainLogo} alt='Site Logo' />
        </Link>
      </div>
      <ul className='primary-nav__links'>
        <li className='link margin-left-auto'>
          <Link to={''}>Home</Link>
        </li>
        <li className='link'>
          <Link to={''}>Services</Link>
        </li>
        <li className='link'>
          <Link to={''}>About Us</Link>
        </li>
        <li className='link'>
          <Link to={''}>Contact</Link>
        </li>
        <li className='link'>
          <Link to={''}>Pricing</Link>
        </li>
        <li className='link margin-left-auto signup-cta'>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  )
}
