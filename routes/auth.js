const express = require('express')
const authRouter = express.Router()

const { register, login } = require('../controllers/auth')

authRouter.post('/register',register)
authRouter.post('/login',login)

module.exports = authRouter