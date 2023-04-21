const express = require('express');

const router = express.Router();

const passport = require('passport');

const improvementController = require('../controllers/improvement_controller');


// for adding new improvement
router.post('/add/:bug',passport.checkAuthentication,improvementController.add);




module.exports = router;