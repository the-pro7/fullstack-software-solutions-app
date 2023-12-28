const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')

const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(401)
    throw new Error('Incomplete credentials')
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    res.status(400)
    throw new Error('Sorry that email has already been taken')
  }

  let salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = await new User({ name, email, password: hashedPassword })

  console.log(newUser)

  try {
    await newUser.save()
    createToken(res, newUser._id)

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    })
  } catch (error) {
    res.status(401)
    throw new Error('Unable to create your account')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body

  // Get user with email provided
  const userRegistered = await User.findOne({ email })

  if (userRegistered) {
    let passwordIsValid = await bcrypt.compare(
      password,
      userRegistered.password
    )

    if (passwordIsValid) {
      try {
        const token = createToken(res, userRegistered._id)

        res.status(201).json({
          _id: userRegistered._id,
          name: userRegistered.name,
          email: userRegistered.email,
          token
        })

        console.log(userRegistered)
      } catch (error) {
        res.status(401).json({ message: 'Cannot find a user with that email or password.' })
      }
    }
  }
})

const logOutCurrentUser = asyncHandler(async (req, res) => {
  // Set the value of the jwt cookie of the current user to null or to an empty string
  res.cookie('jwt', '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: new Date(0)
  })

  res
    .status(200)
    .json({ success: true, message: 'User logged out successfully!' })
})
module.exports = { createUser, loginUser, logOutCurrentUser }
