const adsModules = require('../models/ads')
const authModules = require('../models/auth')


//node cache
const NodeCache = require('node-cache')
const myCache = new NodeCache({ stdTTL: 60 * 60 })


const createAd = async (req, res) => {

    try {
        const { title, price, currency, category, status, phone, location, description, images } = req.body
        const owner = req.owner

        if (
            !(
                title &&
                price &&
                currency &&
                status &&
                phone &&
                location &&
                category &&
                owner &&
                images.length > 0 &&
                description
            )
        ) res.json({ status: "required", requiredText: "All Rields Required!" })
        else {
            const ads = new adsModules({
                title,
                price,
                currency,
                status,
                phone,
                location,
                category,
                owner,
                images,
                description
            })

            ads.save()
                .then((data) => {
                    res.json({ status: "ok", id: data._id })
                })
                .catch(error => {
                    res.json({ status: "error", error: error.message })
                })
        }
    } catch (error) {
        res.json({ status: "error", error: error.message })
    }

}

const updateAd = async (req, res) => {
    try {
        const { title, price, currency, category, status, phone, location, description, images} = req.body
        const owner = req.owner

        if (
            !(
                title &&
                price &&
                currency &&
                status &&
                phone &&
                location &&
                category &&
                owner &&
                images.length > 0 &&
                description
            )
        ) res.json({ status: "required", requiredText: "All Rields Required!" })
        else {
            const ad = await adsModules.findById(req.params.id)
            if (ad.owner === owner) {
                adsModules.findByIdAndUpdate(req.params.id, {
                    title,
                    price,
                    currency,
                    status,
                    phone,
                    location,
                    category,
                    images,
                    description
                })
                    .then((ad) => {
                        res.json({ status: "ok", id: ad._id })
                    })
                    .catch(error => {
                        res.json({ status: "error", error: error.message })
                    })
            } else res.json({ status: "error", error: "You can edit your ads only !" })
        }
    } catch (error) {
        res.json({ status: "error", error: error.message })
    }
}

const deletAd = async (req, res) => {
    try {
        const owner = req.owner
        const ad = await adsModules.findById(req.params.id)

        if (ad.owner === owner) {

            adsModules.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.json({ status: "ok" })
                })
                .catch(error => {
                    res.json({ status: "error", error: error.message })
                })

        } else res.json({ status: "error", error: "You can delete only your ads !" })
    } catch (error) {
        res.json({ status: "error", error: error.message })
    }

}


const getAd = async (req, res) => {
    try {

        const ad = await adsModules.findById(req.params.id)
        const owner = await authModules.findById(ad.owner)
        res.json({ status: "ok", ad, owner })

    } catch (error) {
        res.json({ status: "error", error: error.message })
    }
}

const getMyAds = async (req, res) => {

    try {
        const owner = req.owner
        const myads = await adsModules.find({ owner })
        res.json({ status: "ok", myads })

    } catch (error) {
        res.json({ status: "error", error: error.message })
    }

}

const getMyAd = async (req, res) => {

    try {

        const { id } = req.params

        const ad = await adsModules.findById(id)
        res.json({ status: "ok", ad })

    } catch (error) {
        res.json({ status: "error", error: error.message })
    }

}

const getAllAds = async (req, res) => {

    try {
        const ads = await adsModules.find({})
        res.json({ status: "ok", ads: ads })
    } catch (error) {
        res.json({ status: "error", error: error.message })
    }
}

const getByCategory = async (req, res) => {
    try {

        const ads = await adsModules.find({ category: req.params.category })
        res.json({ status: "ok", ads })

    } catch (error) {
        res.json({ status: "error", error: error.message })
    }
}

const getUserAds = async (req, res) => {

    try {

        const { id } = req.params

        const user = await authModules.findById(id)
        const ads = await adsModules.find({ owner: id })

        res.json({ status: "ok", ads, user })

    } catch (error) {
        res.json({ status: "error", error: error.message })
    }

}

const searchAds = async (req, res) => {
    try {
        const ads = await adsModules.find({
            $or: [
                {
                    title: { $regex: req.query.q, $options: 'i' }
                },
                {
                    description: { $regex: req.query.q, $options: 'i' }
                },
                {
                    category: { $regex: req.query.q, $options: 'i' }
                }
            ]
        })
        res.json({ status: "ok", ads })
    } catch (error) {
        res.json({ status: "error", error: error.message })
    }
}

module.exports = { createAd, getAd, getMyAds, getMyAd, getAllAds, updateAd, deletAd, getByCategory, getUserAds, searchAds }