const express = require('express')
const validateToken = require('../middleware/validateHandler')

const router = express.Router()
const {registeredUser, loginUser, currentUser} = require('../controllers/userController')

router.post('/register', registeredUser)

router.post('/login', loginUser)

router.get('/current', validateToken, currentUser)

module.exports = router