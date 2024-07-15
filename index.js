const express = require('express')
const app = express()
const path = require('path')

//dot env
require('dotenv').config()

//mongoose
const mongoose = require('mongoose')
const mongooseUrl = "mongodb+srv://aboudi:Aboudi123+@cluster0.qoipi.mongodb.net/mlx?retryWrites=true&w=majority"
//cors
const cors = require('cors')

//body parser
const bodyParser = require("body-parser")

// cookie parser
const cookieParser = require('cookie-parser')

//middlware
app.use(cors())
app.use(bodyParser.json({extended: true , limit: 1024*1024*100}))
app.use(bodyParser.text({limit: 1024*1024*100}))
app.use(bodyParser.urlencoded({ extended: true  , limit: 1024*1024*100}))
app.use(cookieParser())


//get router
const adsRouter = require('./router/ads')
const authRouter = require('./router/auth')

//routes
app.use('/api/ads', adsRouter)
app.use('/api/auth', authRouter)


// client routes
app.use(express.static(path.join(__dirname, "client/build")))

const buildPath = path.normalize(path.join(__dirname, "client/build"))

app.use(express.static(buildPath))

app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
})

//connect to server
app.listen(process.env.PORT || 8081, () => {
    console.log(`Connect port suuccessfully`)
})

mongoose.connect(mongooseUrl)
    .then(res => {
        console.log(`Connect mongoose suuccessfully`)
    }).catch(err => {
        console.log('Connection faild mongoose: ' + err)
    })
