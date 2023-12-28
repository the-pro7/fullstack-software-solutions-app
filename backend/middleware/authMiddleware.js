const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/userModel')

const authenicate = asyncHandler(async (req, res, next) => {
  let token

  // Get token from user request
  token = req.cookies.jwt

  if (token) {
    try {
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decodedToken.userId).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('Failed to authenticate user, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Failed to authenticate user, token failed')
  }
})

module.exports = { authenicate }
