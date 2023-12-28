import React, { useRef, useState } from 'react'
import LoginImage from '../assets/login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = ({ showError, error }) => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  async function handleLogin (e) {
    e.preventDefault()
    showError('')
    const email = emailRef.current.value
    const password = passwordRef.current.value

    if (!email || !password) {
      showError('All fields are required.', 2500)
      return
    }

    const loginOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({ email, password })
    }

    try {
      let response = await fetch(
        'http://localhost:5001/api/users/login',
        loginOptions
      )

      let data = await response.json()

      if (response.ok) {
        console.log('Signed in successfully')
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify(data))

        navigate("/welcome")
      } else {
        console.log(response.message)
      }
    } catch (error) {
      showError(error.message, 2500)
      console.log(error.message)
    } finally {
      showError('')
      console.log('What is done is done!!!')
    }
  }

  return (
    <form className='signup-form' onSubmit={handleLogin}>
      <div className='signup-form__content'>
        {error && <p className='error'>{error}</p>}
        <h2>Join the Salvatore Brothers</h2>
        <div className='form-group'>
          <label htmlFor='email'>Provide an email address</label>
          <input type='email' name='email' id='email' ref={emailRef} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Provide a password</label>
          <input
            type='password'
            name='password'
            id='password'
            ref={passwordRef}
          />
        </div>
        <button type='submit'>Login Now</button>
        <div className='account-exists'>
          <p>
            Need an account?{' '}
            <Link to='/signup' className='link'>
              Signup then
            </Link>
          </p>
        </div>
      </div>
      <img src={LoginImage} alt='' className='signup-form__image' />
    </form>
  )
}

// Prop data type validation
Login.propTypes = {
  showError: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
}

export default Login
