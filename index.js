const express = require('express')
const app = express()
const router = express.Router()
const path = require('path')

//mongoose
const mongoose = require('mongoose')
const url = "mongodb+srv://aboudi:Aboudi123+@cluster0.qoipi.mongodb.net/mlx?retryWrites=true&w=majority"

//cors
const cors = require('cors')

//body parser
const bodyParser = require("body-parser")

app.use(cors())
app.use(express.json({ limit: 1024 * 1024 * 50, extended: true, type: 'application/json' }))
app.use(express.urlencoded({ limit: 1024 * 1024 * 50, extended: true, parameterLimit: 50000, type: 'application/x-www-form-urlencoded' }))
app.use(bodyParser.text({ limit: 1024 * 1024 * 200 }))

if (process.env.NOD_ENV === "production") {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(`${__dirname}/client/build/index.html`)
    })
}

// app.use(express.static('client/build'))
// app.get("*", (req, res) => {
//     res.sendFile(`${__dirname}/client/build/index.html`)
// })

app.get('/' , (req, res) => {
    res.send("Home page")
})

// app.use(express.static(path.join(__dirname, "./client/build")))

// const buildPath = path.normalize(path.join(__dirname, "./client/build"))
// app.use(express.static(buildPath))

// router.get("(/*)?", (req, res) => {
//     res.sendFile(path.join(buildPath , 'index.html'))
// })
// app.use(router)

//get router
const adsRouter = require('./router/ads')
const authRouter = require('./router/auth')

//connect to server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Connect port suuccessfully`)
    mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(res => {
            console.log(`Connect mongoose suuccessfully`)
        }).catch(err => {
            console.log('Connection faild mongoose: ' + err)
        })

})

// app.get('/' , (req ,res) => {
//     res.send("Hello from home page")
// })

//routes
app.use('/api/ads', adsRouter)
app.use('/api/auth', authRouter)

module.exports = app