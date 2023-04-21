const express = require('express');

const router = express.Router();
const passport = require('passport');

const bugController = require('../controllers/bug_controller');

router.get('/add/:id',passport.checkAuthentication,bugController.addBug);

router.post('/create',passport.checkAuthentication,bugController.create);


router.post('/filter',passport.checkAuthentication,bugController.filter);

router.get('/view/:id',passport.checkAuthentication,bugController.view);

router.get('/close/:id',passport.checkAuthentication,bugController.close);

router.post('/search',passport.checkAuthentication,bugController.search);



module.exports = router;