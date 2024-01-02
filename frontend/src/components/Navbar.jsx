import React, { useEffect, useState } from 'react'
import MainLogo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAddressCard,
  faArrowRightFromBracket,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import logoutCurrentUser from '../http-helpers/logout'

export default function Navbar () {
  const [showButton, setShowButton] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (user && token) {
      setShowButton(false)
    } else {
      setShowButton(true)
    }
  }, [token, user])

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
        <li className='link margin-left-auto signup-cta user-avatar'>
          {showButton ? (
            <Link to='/signup'>Signup</Link>
          ) : (
            <div className='user-avatar__options'>
              <img
                src={user.profileImage}
                alt='User profile image'
                onClick={() => setShowProfileMenu(prev => !prev)}
              />
              {showProfileMenu && (
                <div className='user-profile-dropdown'>
                  <p>
                    <FontAwesomeIcon icon={faUser} /> {user.name}
                  </p>
                  <Link to={`/user-profile/${user._id}`}>
                    <FontAwesomeIcon icon={faAddressCard} /> Profile
                  </Link>
                  <button
                    onClick={() => logoutCurrentUser(user, token, navigate)}
                  >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  )
}
