const mongoose = require('mongoose')
const Schema = mongoose.Schema


const authSchema = new Schema({
    name: {
        required:true,
        type:String,
    },
    email: {
        required:true,
        unique: true,
        type:String,
    },
    password: {
        required:true,
        type:String,
    },
    phone: {
        required:true,
        type:Number,
    },
    location: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Auth' , authSchema)