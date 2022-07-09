const express = require('express')
const app = express()

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
    app.use(express.static(path.join(__dirname, "/client")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "/client/build", "index.html"))
    })
}

//get router
const adsRouter = require('./router/ads')
const authRouter = require('./router/auth')




//port
const port = process.env.PORT || 8080

//connect to mongo db
app.listen(port, () => {
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

//routes
app.use('/api/ads', adsRouter)
app.use('/api/auth', authRouter)