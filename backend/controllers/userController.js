const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const createToken = require('../utils/createToken')
const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./scratch')

// Create a new user
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

  
  try {
    let salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await new User({ name, email, password: hashedPassword, token })
    let token = createToken(res, newUser._id)
  
    console.log(newUser)
    // Save new user
    await newUser.save()

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: newUser.token
    })
  } catch (error) {
    res.status(401).json({ message: 'Unable to create your account' })
  }
})

// Login a user
const loginUser = asyncHandler(async (req, res) => {
  try {
    let { email, password } = req.body

    // Get user with email provided
    const userRegistered = await User.findOne({ email })

    if (userRegistered) {
      let passwordIsValid = await bcrypt.compare(
        password,
        userRegistered.password
      )

      // Check password validity
      if (passwordIsValid) {
        res.status(201).json({
          _id: userRegistered._id,
          name: userRegistered.name,
          email: userRegistered.email,
          profileImage: userRegistered?.profileImage,
          token: userRegistered.token
        })
      } else {
        res.status(401).json({ message: 'Invalid email or password' })
      }
    } else {
      res.status(404).json({ message: 'User not found, try again.' })
      process.exit(1)
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Destroy current user
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

// Get current user based on their ID

const getCurrentUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const userExists = await User.findById(id)

    if (userExists) {
      let token = createToken(res, userExists._id)
      // Send user
      res.status(200).json({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        profileImage: userExists?.profileImage,
        createdAt: userExists?.createdAt,
        token
      })
    } else {
      res.status(404).json({ message: 'User does not exist!' })
    }
  } catch (error) {
    console.log(error.stack)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Update current  user
const updateCurrentUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      user.password = hashedPassword
    }

    await user.save()

    res.status(201).json({ message: 'user updated successfully' })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

// Delete current user

const deleteCurrentUser = asyncHandler(async (req, res) => {
  const { id } = req.params

  const user = await User.findById(id)

  if (user) {
    try {
      await User.deleteOne({ _id: user._id })
      res.status(200).json({ message: 'User successfully deleted' })
      console.log(user)
    } catch (error) {
      res.status(500).json({ message: error })
    }
  } else {
    res.status(404).send('User not found')
  }
})

// COnst
const uploadUserProfileImage = asyncHandler(async (req, res) => {
  const { profileImage } = req.body
})

module.exports = {
  createUser,
  loginUser,
  getCurrentUser,
  logOutCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  uploadUserProfileImage
}
