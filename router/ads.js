const express = require('express')
const router = express.Router()
const path = require('path')

//multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null,`${file.fieldname}-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

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
router.post('/ad', check , upload.array('images') ,adsController.createAd)

//update ad
// router.put('/ad/:id',check)
router.put('/ad/:id', check, upload.array('images') , adsController.updateAd)

//delete
// router.delete('/ad/:id',check)
router.delete('/ad/:id', check, adsController.deletAd)


module.exports = router