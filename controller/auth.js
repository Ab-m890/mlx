const authModule = require('../modules/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm1234567890-=+_{})(*&^%$#@!~`?/>.<,':;|\}[]"

const register = (req, res) => {

    const { password } = req.body.data

    const hashPassword = bcrypt.hashSync(password, 10)

    const reg = new authModule({
        ...req.body.data,
        password: hashPassword
    })

    reg.save()
        .then(user => {

            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email
                },
                JWT_SECRET
            )

            res.json({ status: "ok", token })

        }).catch(err => {

            if (err.code === 11000) {
                res.json({ status: "error", error: "Email already exist" })
            }

            res.json({ status: "error", error: err })

        })

}

const login = (req, res) => {

    const { email, password } = req.body.data

    authModule.findOne({ email: email }, async (error, user) => {
        if (error) {
            res.json({ status: "error", error: "An Error Occured" })
        } else {
            if (user) {

                const comparPassword = await bcrypt.compare(password, user.password)

                if (comparPassword) {
                    const token = jwt.sign(
                        {
                            _id: user._id,
                            email
                        },
                        JWT_SECRET
                    )

                    res.json({ status: "ok", token })

                }else res.json({status: "error" , error: "Incorrect password"})

            } else res.json({ status: "error", error: "Incorrect email" })
        }
    })

}

module.exports = { register, login }