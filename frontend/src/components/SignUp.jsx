import React, { useRef, useState } from 'react'
import SignUpImage from '../assets/signup.png'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = ({ showError, error, setLoading, loading }) => {
  const formRef = useRef()
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const navigate = useNavigate()

  function validatePasswordLength (password = '') {
    if (password.length < 8) {
      showError('Password must be at leat 8 characters long.', 2500)
      return false
    }
    return true
  }

  async function handleSignUp (e) {
    e.preventDefault()
    showError('')
    setLoading(false)
    let name = nameRef.current.value
    let email = emailRef.current.value
    let password = passwordRef.current.value
    let passwordConfirm = passwordConfirmRef.current.value

    if (!name || !email || !password || !passwordConfirm) {
      showError('Every field is required.', 2500)
      return
    }

    if (password !== passwordConfirm) {
      showError('Passwords do not match, try again', 2500)
      return
    }

    console.log(name, email, password)
    const registerOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    }

    if (validatePasswordLength(password)) {
      console.log('Password length okay')
      try {
        setLoading(true)
        let response = await fetch(
          'http://localhost:5001/api/users/register',
          registerOptions
        )

        if (response.ok) {
          console.log('Server accepted request')
          console.log(loading)
          setLoading(false)
          navigate('/login')
        } else {
          showError('Something went wrong, try again', 2500)
        }

        showError('')
      } catch (error) {
        showError(`Something went wrong ${error.message}`, 2500)
      } finally {
        setLoading(false)
        showError('')
      }
    }
  }

  return (
    <form className='signup-form' onSubmit={handleSignUp}>
      <div className='signup-form__content'>
        {error && <p className='error'>{error}</p>}

        <h2>Join the Salvatore Brothers</h2>
        <div className='form-group'>
          <label htmlFor='name'>Provide your name</label>
          <input type='text' name='name' id='name' ref={nameRef} />
        </div>
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
        <div className='form-group'>
          <label htmlFor='passwordConfirm'>Confirm your password</label>
          <input
            type='password'
            name='passwordConfirm'
            id='passwordConfirm'
            ref={passwordConfirmRef}
          />
        </div>
        <button type='submit' disabled={loading}>
          {loading ? 'Creating account' : 'Register Now'}
        </button>
        <div className='account-exists'>
          <p>
            already have an account?{' '}
            <Link to='/login' className='link'>
              Login then
            </Link>
          </p>
        </div>
      </div>
      <img src={SignUpImage} alt='' className='signup-form__image' />
    </form>
  )
}

export default SignUp
