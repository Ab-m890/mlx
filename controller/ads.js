const adsModules = require('../modules/ads')
const authModules = require('../modules/auth')
const jwt = require("jsonwebtoken")
const JWT_SECRET = "qwertyuiopasdfghjklzxcvbnm1234567890-=+_{})(*&^%$#@!~`?/>.<,':;|\}[]"

const createAd = (req, res) => {

    const ads = new adsModules(req.body.formData)

                    ads.save()
                        .then((data) => {
                            res.json({ status: "ok", data })
                        })
                        .catch(error => {
                            res.json({ status: "error", error })
                        })

}

const updateAd = (req, res) => {
    adsModules.findById(req.params.id)
        .then(ad => {
            if (ad.owner == req.body.owner) {
                adsModules.findByIdAndUpdate(req.params.id, {
                    ...req.body.data
                })
                    .then(() => {
                        res.json("update success")
                    })
                    .catch(err => {
                        res.status(401).json(err)
                    })
            }
        })
        .catch(err => res.status(303).json("No data found " + err))
}

const deletAd = (req, res) => {
    adsModules.findById(req.params.id)
        .then(ad => {

            if (ad.owner == req.body.owner) {

                adsModules.findByIdAndDelete(req.params.id)
                    .then(() => {
                        res.json({ status: "ok" })
                    })
                    .catch(err => {
                        res.json({ status: "error", error: err })
                    })

            } else res.json({ status: "error", error: req.body.owner })
        })
}


const getAd = (req, res) => {

    adsModules.findById(req.params.id)
        .then((ad) => {
            res.json(ad)
        })
        .catch(err => {
            res.status(401).json(err)
        })
}

const getMyAds = (req, res) => {

    const token = req.query.token

    //check and valide token
    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) res.json({ status: "error", error: "You are not login!" })


        //check when token exist if exist the child _id
        if (user._id) {
            //check if exist user have this _id
            authModules.findById(user._id)
                .then(e => {

                    //if not exist return error
                    if (!e) {

                        res.json({ status: "error", error: "You are not login!" })

                    }

                    //if user exist
                    adsModules.find({ owner: user._id })
                        .then((myads) => {
                            res.json({status: "ok" ,myads})
                        })
                        .catch(error => {
                            res.json({status: "error" , error: "error"})
                        })



                }).catch(() => res.json({ status: "error", error: "An Error Occured" }))

        } else res.json({ status: "error", error: "You are not login!" })

    })
}

const getAllAds = (req, res) => {

    adsModules.find()
        .then((ad) => {
            res.json(ad)
        })
        .catch(err => {
            res.status(401).json(err)
        })
}

const getByCategory = (req , res) => {

}

module.exports = { createAd, getAd, getMyAds, getAllAds, updateAd, deletAd , getByCategory}