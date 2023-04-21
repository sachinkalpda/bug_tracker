const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
const passport = require('passport');

// homepage route
router.get('/',passport.checkAuthentication,homeController.home);

// using the other route files
router.use('/user',require('./user'));
router.use('/project',require('./project'));
router.use('/bug',require('./bug'));

router.use('/label',require('./label'));
router.use('/improvement',require('./improvement'));






module.exports = router;