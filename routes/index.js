const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');
const passport = require('passport');


router.get('/',passport.checkAuthentication,homeController.home);

router.use('/user',require('./user'));
router.use('/project',require('./project'));
router.use('/bug',require('./bug'));






module.exports = router;