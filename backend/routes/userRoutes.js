const express = require('express')
const { createUser, loginUser, logOutCurrentUser } = require('../controllers/userController')
const { authenicate } = require('../middleware/authMiddleware')
const router = express.Router()

router.route('/register').post(createUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logOutCurrentUser)

module.exports = router
