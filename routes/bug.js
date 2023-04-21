const express = require('express');

const router = express.Router();
const passport = require('passport');

const bugController = require('../controllers/bug_controller');


// getting add bug page
router.get('/add/:id',passport.checkAuthentication,bugController.addBug);

// adding new bug
router.post('/create',passport.checkAuthentication,bugController.create);

// ajax request to filter the bugs
router.post('/filter',passport.checkAuthentication,bugController.filter);


// view the bug infomation
router.get('/view/:id',passport.checkAuthentication,bugController.view);

// for closing the bug
router.get('/close/:id',passport.checkAuthentication,bugController.close);


// ajax request to search the bugs
router.post('/search',passport.checkAuthentication,bugController.search);



module.exports = router;