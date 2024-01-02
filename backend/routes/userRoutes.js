const express = require('express')
const {
  createUser,
  loginUser,
  logOutCurrentUser,
  getCurrentUser,
  deleteCurrentUser,
  updateCurrentUser,
  uploadUserProfileImage
} = require('../controllers/userController')
const { authenticate } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router
  .route('/:id')
  .get(authenticate, getCurrentUser)
  .delete(authenticate, deleteCurrentUser)
  .put(authenticate, updateCurrentUser)

router.route('/logout').post(logOutCurrentUser)
router.route("/upload").post(authenticate, uploadUserProfileImage)

module.exports = router
