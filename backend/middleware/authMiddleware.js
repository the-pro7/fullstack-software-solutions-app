const jwt = require('jsonwebtoken')
const asyncHandler = require('./asyncHandler')
const User = require('../models/userModel')
// const LocalStorage = require("node-localstorage").LocalStorage
// const localStorage = new LocalStorage("./scratch")

const authenticate = asyncHandler(async (req, res, next) => {
  let token

  // Get token from user request
  token = req.cookies.jwt 
  console.log(token, 'is the token')

  if (token) {
    try {
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET)
      console.log(decodedToken, 'is the d token')
      req.user = await User.findById(decodedToken.userId).select('-password')

      if (!req.user) {
        res.status(404)
        throw new Error('Failed to authenticate, user not found')
      }

      next()
    } catch (error) {
      res.status(401)
      throw new Error('Failed to authenticate user, token failed')
    }
  } else {
    res.status(401)
    throw new Error('Failed to authenticate user,  no token found')
  }
})

module.exports = { authenticate }
