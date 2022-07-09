const jwt = require('jsonwebtoken')
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm1234567890-=+_{})(*&^%$#@!~`?/>.<,':;|\}[]"
const authModule = require('../modules/auth')

const check = (req, res, next) => {

    const token = req.body.token
    
    try{
        
        jwt.verify(token, JWT_SECRET, (err, user) => {

            if (err) next(res.json({ status: "error", error: "You are not login!"}))
    
            if(user._id) {
                
                authModule.findById(user._id)
                .then(e => {
    
                    if (!e) {
    
                        next(res.json({ status: "error", error: "You are not login!"}))
    
                    }
    
                    if(req.method === "POST" && req.body.formData)  req.body.formData.owner = user._id

                    else if(req.method === "POST")  res.json({status: "ok", data: {phone: e.phone , location: e.location}})
                    
                    else if(req.method === "DELETE")  req.body.owner = user._id
                    
                    next()

    
                }).catch((err) => next(res.json({ status: "error", error: "An Error Occured : " + err })))
    
            }else next(res.json({ status: "error", error: "You are not login!" }))
    
        })
    }catch(err) {
        next(res.json({status: "error" , error: err}))
    }
}

module.exports = check