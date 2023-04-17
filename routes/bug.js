const express = require('express');

const router = express.Router();
const passport = require('passport');

const bugController = require('../controllers/bug_controller');

router.get('/add/:id',passport.checkAuthentication,bugController.addBug);

router.post('/create',passport.checkAuthentication,bugController.create);





module.exports = router;