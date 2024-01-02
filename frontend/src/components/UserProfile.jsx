import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faPen,
  faArrowRightFromBracket,
  faTrash,
  faFloppyDisk,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import logoutCurrentUser from '../http-helpers/logout'

export default function UserProfile () {
  const [user, setUser] = useState({})
  const { id } = useParams()
  const token = localStorage.getItem('token')

  const navigate = useNavigate()

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include'
    }

    async function fetchUser () {
      try {
        let response = await fetch(
          `http://localhost:5001/api/users/${id}`,
          requestOptions
        )
        let data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Fetch error:', error.message)
      }
    }

    fetchUser()
  }, [id])

  const date = new Date(user.createdAt)
  const formattedDate = `${
    date.getMonth() + 1
  }/0${date.getDay()}/${date.getFullYear()}`

  // Delete user
  async function handleDelete (id) {
    if (!id) return

    let deleteOptions = {
      method: "DELETE"
    }

    try {
      let response = await fetch(`http://localhost:5001/api/users/${id}`, deleteOptions)

      if (!response.ok) {
        console.log("Failed request")
      }

      console.log("User deleted successfully")
      navigate("/signup")
    } catch (error) {
      console.log("Failed to delete user", error)
    }
  }

  return (
    <div className='user-profile-card'>
      <div className='user-profile-current'>
        <Link to='/' className='back'>
          <FontAwesomeIcon icon={faAngleLeft} />
          Back
        </Link>
        <div className='user-profile-image'>
          <img src={user.profileImage} alt='User profile image' />
          <div className='edit-button'>
            <label htmlFor='file'>
              <FontAwesomeIcon icon={faPen} title='Change profile image' />
            </label>
            <input
              type='file'
              name='file'
              id='file'
              accept='image/png, image/jpeg'
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div className='user-profile-content'>
          <h1>{user.name ? user.name : 'Anonymous'}</h1>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>Member since: {formattedDate}</p>
          <button
            className='logout'
            onClick={() => logoutCurrentUser(user, token, navigate)}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Me Out
          </button>
        </div>
      </div>
      <div className='user-profile-update'>
        <form>
          <h2>Update Profile Details</h2>
          <h4>User details</h4>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              value={user.name}
              id='name'
              autoComplete='true'
              onChange={e => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              value={user.email}
              id='email'
              autoComplete='true'
              onChange={e => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='sub-type'>Subscription type</label>
            <select name='sub-type' id='sub-type'>
              <option value='personal'>Personal</option>
              <option value='team'>Team</option>
              <option value='enterprise'>Enterprise</option>
            </select>
          </div>
          <Link to={`/change-password/${user._id}`}>Change my password</Link>
          <button>
            <FontAwesomeIcon icon={faFloppyDisk} />
            Save
          </button>
        </form>
        <div className='account-options'>
          <h2>Danger zone</h2>
          <div className='delete-account'>
            <p>Delete my account</p>
            <button onClick={() => handleDelete(id)}>
              <FontAwesomeIcon icon={faTrash} className='icon' /> Delete account
            </button>
          </div>
          <div className='warning'>
            <h3>
              {' '}
              <FontAwesomeIcon icon={faTriangleExclamation} /> Caution:
            </h3>
            <p>
              <b>Deleting an account</b> cannot be undone, please be sure that
              you really want to delete your account, since everything saved
              with your account will be lost, including membership etc.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
