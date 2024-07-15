const jwt = require('jsonwebtoken')
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm1234567890-=+_{})(*&^%$#@!~`?/>.<,':;|\}[]"
const authModule = require('../models/auth')

const check = (req, res, next) => {

    const access_token = req.cookies.token 
    
    if(access_token != null) {
        try{
        
            jwt.verify(access_token, JWT_SECRET, (err, user) => {
    
                if (err) return next(res.json({ status: "auth"}))
        
                if(user._id) {
                    
                    authModule.findById(user._id)
                    .then(e => {
        
                        if (!e) {
        
                            return next(res.json({ status: "auth" }))
        
                        }

                        req.owner = user._id
                        
                        return next()
        
                    }).catch((error) => next(res.json({ status: "error", error: error.message})))
        
                }else return next(res.json({ status: "auth" }))
        
            })
        }catch(err) {
            next(res.json({status: "error" , error: err.message}))
        }
    }else next(res.json({status: "auth"}))
}

module.exports = check