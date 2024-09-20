const express = require('express')
const {signup, signIn} = require('../controllers/userController')

const router = express.Router();

router.post('/signup',signup)
router.post('/signin',signIn)

module.exports = router