var express = require('express');
var router = express.Router();
//const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');
const ctrlOther = require('../controllers/others'); 

//router.get('/', ctrlMain.index);
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
    .route('/location/:locationid/review/new')
    .get(ctrlLocations.addReview)
    .post(ctrlLocations.doAddReview);
router.get('/about', ctrlOther.about);

module.exports = router;
