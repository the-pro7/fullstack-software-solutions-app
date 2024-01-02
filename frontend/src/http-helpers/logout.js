async function logoutCurrentUser (user, userToken, navigate) {
  const logoutOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (user && userToken) {
    try {
      let response = await fetch(
        'http://localhost:5001/api/users/logout',
        logoutOptions
      )

      if (response.ok) {
        localStorage.clear()
        navigate('/login')
        console.log('Logged out successfully')
      }
    } catch (error) {
      console.log(error.stack)
    }
  }
}

export default logoutCurrentUser
