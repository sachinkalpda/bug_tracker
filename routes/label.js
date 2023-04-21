const express = require('express');


const router = express.Router();
const passport = require('passport')

const labelController = require('../controllers/label_controller');

router.post('/add',passport.checkAuthentication,labelController.add);
router.post('/get',passport.checkAuthentication,labelController.getLabel);



module.exports = router;