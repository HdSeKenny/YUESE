import express from 'express'
import config from '../config/environment'
import User from '../api/user/user.model'

// Passport Configuration
require('./local/passport').setup(User, config)

const router = express.Router()
router.use('/local', require('./local'))

export default router
