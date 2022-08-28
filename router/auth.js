const express = require('express')
const router = express.Router()
const check = require('../middleware/check')

const authController = require('../controller/auth')

router.post('/register' , authController.register)

router.post('/login' , authController.login)

router.get('/check',check,(req, res) => {
    return res.json({status: "ok"})
})

router.get('/account',check, authController.getAccount)

router.put('/account',check, authController.EditAccount)

router.post('/logout',authController.logout)

module.exports = router