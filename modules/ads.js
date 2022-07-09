const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imagesLength = val => {
    return val.length > 0
}

const adsSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 50,
    },
    description: {
        type: String,
        required: true,
        max: 4096,
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
            type: String
        }],
    },
}, {timestamps: true})

module.exports = mongoose.model('Ads', adsSchema)