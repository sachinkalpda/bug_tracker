const express = require('express');


const router = express.Router();
const passport = require('passport')

const labelController = require('../controllers/label_controller');
// for addding a new label
router.post('/add',passport.checkAuthentication,labelController.add);

// ajax route for get labels
router.post('/get',passport.checkAuthentication,labelController.getLabel);



module.exports = router;