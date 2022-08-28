const mongoose = require('mongoose')
const Schema = mongoose.Schema

const adsSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 50,
        min: 1,
    },
    description: {
        type: String,
        required: true,
        max: 4096,
        min: 1
    },
    price: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    images: {
        type: [{
            type: String,
            required: true,
        }],
    },
}, {timestamps: true})

adsSchema.index({title: "text" , description: "text"})

module.exports = mongoose.model('Ads', adsSchema)