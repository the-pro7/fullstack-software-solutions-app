const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: [true, 'Email already taken, provide another email']
    },

    password: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true,
      unique: true
    },
    profileImage: {
      type: String,
      required: false,
      default:
        'https://surgassociates.com/wp-content/uploads/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg'
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
