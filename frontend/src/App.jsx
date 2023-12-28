import React, { useState } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import Login from './components/LogIn'
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes'
import WelcomeScreen from './components/WelcomeScreen'
import LandingPage from './components/LandingPage'

function App () {
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  function showError (message = '', timeInterval = 1000) {
    if (message) {
      setError(message)

      setTimeout(() => {
        setError('')
      }, timeInterval)
    } else {
      setError('')
    }
  }

  function showSuccess (message = '', timeInterval = 1000) {
    if (message) {
      setSuccess(message)

      setTimeout(() => {
        setSuccess('')
      }, timeInterval)
    } else {
      setSuccess('')
    }
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/signup'
          element={<SignUp showError={showError} error={error} />}
        />
        <Route
          path='/login'
          element={<Login showError={showError} error={error} />}
        />
        <Route
          path='/welcome'
          element={
            <ProtectedRoutes>
              <WelcomeScreen showSuccess={showSuccess} success={success}/>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </>
  )
}

export default App
