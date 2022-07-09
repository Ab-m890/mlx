const express = require('express')
const cors = require('cors')
const router = express.Router()

//controller
const adsController = require('../controller/ads')

//middleware
const check = require('../middleware/check')

//get ad details
router.get('/ad/:id', adsController.getAd)

//get my ads
router.get('/myads', adsController.getMyAds)

//get all ads
router.get('/', adsController.getAllAds)

//get ads by category
router.get('/category/:category', adsController.getByCategory)

//add an ad
router.post('/ad', check, adsController.createAd)

//update ad
// router.put('/ad/:id',check)
router.put('/ad/:id', check, adsController.updateAd)

//delete
// router.delete('/ad/:id',check)
router.delete('/ad/:id', check, adsController.deletAd)


module.exports = router