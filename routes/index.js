const express = require('express')
const router = express.Router()
const discogsController = require('../controllers/discogsController')

router.get('/', discogsController.home)
router.get('/search', discogsController.search)
router.get('/details/release/:id', discogsController.getReleaseDetails)
router.get('/details/master/:id', discogsController.getMasterDetails)
router.get('/details/artist/:id', discogsController.getArtistDetails)

module.exports = router