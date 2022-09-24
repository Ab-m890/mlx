const express = require('express')
const router = express.Router()
const path = require('path')

//controller
const adsController = require('../controller/ads')

//middleware
const check = require('../middleware/check')

//get ad details
router.get('/ad/:id', adsController.getAd)

//get all my ads
router.get('/myads', check , adsController.getMyAds)

//get all my ads
router.get('/myads/:id', check , adsController.getMyAd)

//get all ads
router.get('/all', adsController.getAllAds)

//get ads by category
router.get('/category/:category', adsController.getByCategory)

//get user ads
router.get('/user/:id',adsController.getUserAds)

//search ads
router.get('/search' , adsController.searchAds)

//add an ad
router.post('/ad', check,adsController.createAd)

//update ad
// router.put('/ad/:id',check)
router.put('/ad/:id', check, adsController.updateAd)

//delete
// router.delete('/ad/:id',check)
router.delete('/ad/:id', check, adsController.deletAd)


module.exports = router
