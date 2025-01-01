const express = require('express')
const AuthController = require('../controller/AuthController')
const { Auth } = require('../middleware/auth')
const router = express.Router()

router.post('/register', AuthController.register) // Register
router.post('/login', AuthController.login) // Login
router.get('/dashboard', Auth, AuthController.dashboard) // Dashboard Data

module.exports = router