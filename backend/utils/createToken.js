const jwt = require('jsonwebtoken')

const createToken = (res, userId) => {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })

  // set JWT as an http only cookie

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 24 * 30 * 60 * 60 * 1000
  })

  return token
}

module.exports = createToken
