const authModule = require('../models/auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm1234567890-=+_{})(*&^%$#@!~`?/>.<,':;|\}[]"

const register = (req, res) => {

    try {
        const { name, email, password, phone, location } = req.body.data

        if (
            !(
                name &&
                email &&
                password &&
                phone &&
                location
            )
        ) {

            return res.json({ status: "required", requiredText: "All Fields Required" })

        } else if (password.length < 8) {

            return res.json({ status: "error", error: "Password is short" })

        } else {

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
                    return res.cookie("token", token, {
                        httpOnly: true,
                    }).json({ status: "ok" })

                }).catch(err => {

                    if (err.code === 11000) {
                        res.json({ status: "error", error: "Email already exist" })
                    }else res.json({ status: "error", error: err.message })

                })
        }
    }catch(error) {
        res.json({status: "error" , error: error.message})
    }

}

const login = (req, res) => {

    try {
        const { email, password } = req.body.data

        if (
            !(
                email &&
                password
            )
        ) {
            return res.json({ status: "required", requiredText: "All Fields Required" })
        } else {

            authModule.findOne({ email: email }, async (error, user) => {
                if (error) {
                    return res.json({ status: "error", error })
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

                            return res.cookie('token', token, {
                                httpOnly: true,
                            }).json({ status: "ok" })

                        } else return res.json({ status: "error", error: "Incorrect password" })

                    } else return res.json({ status: "error", error: "Incorrect email" })
                }
            })
        }

    } catch (error) {
        res.json({ status: "error", error: error.message })
    }
}

const getAccount = async (req , res) => {
    try{
        const owner = req.owner
        const account = await authModule.findById(owner)
        res.json({status: "ok" , account})
    }catch(error) {
        res.json({status: "error" , error: error.message})
    }
}

const EditAccount = async (req , res) => {
    try{
        const owner = req.owner
        authModule.findByIdAndUpdate(owner , req.body.data)
        .then(() => {
            res.json({status: "ok"})
        })
        .catch(error => {
            res.json({status: "error" , error: error.message})
        })
    }catch(error) {
        res.json({status: "error" , error: error.message})
    }
}

const logout = (req , res) => {
    try{
        res.clearCookie('token').json({status: "ok"})
    }catch(error) {
        res.json({status: "error" , error: error.message})
    }
}

module.exports = { register, login , getAccount , EditAccount , logout}