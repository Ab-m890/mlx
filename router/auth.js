const express = require('express')
const router = express.Router()
const check = require('../middleware/check')

const authController = require('../controller/auth')

router.post('/register' , authController.register)

router.post('/login' , authController.login)

router.post('/check',check,(req, res) => {
    res.json({status: "ok"})
})

module.exports = router