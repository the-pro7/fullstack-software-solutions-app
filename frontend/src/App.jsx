import React, { useState, lazy } from 'react'
import './App.css'
import SignUp from './components/SignUp'
import { Route, Routes } from 'react-router-dom'
import Login from './components/LogIn'
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes'
import WelcomeScreen from './components/WelcomeScreen'
import LandingPage from './components/LandingPage'
import UserProfile from './components/UserProfile'
const NotFound = lazy(() => import('./components/NotFound'))

function App () {
  const [loading, setLoading] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')



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
          element={
            <SignUp
              showError={showError}
              error={error}
              setLoading={setLoading}
              loading={loading}
            />
          }
        />
        <Route
          path='/login'
          element={<Login showError={showError} error={error} />}
        />
        <Route
          path='/welcome'
          element={
            <ProtectedRoutes>
              <WelcomeScreen showSuccess={showSuccess} success={success} />
            </ProtectedRoutes>
          }
        />

        {/* Route to user profile */}
        <Route
          path={`/user-profile/:id`}
          element={
            <ProtectedRoutes>
              <UserProfile />
            </ProtectedRoutes>
          }
        />

        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
