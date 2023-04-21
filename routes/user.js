const express = require('express');

const router = express.Router();

const passport = require('passport');
const userController = require('../controllers/user_controller');


// route for getting login page
router.get('/login',userController.login);

// route for getting register page
router.get('/register',userController.register);

// route for register a new user
router.post('/register/new',userController.addUser);

// route for creating session
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/user/login'}
),userController.createSession);


// router for logout the user
router.get('/logout',passport.checkAuthentication,userController.logout);


// route for view information of other users
router.get('/all',passport.checkAuthentication,userController.viewAll);


module.exports = router;