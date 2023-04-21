const express = require('express');


const router = express.Router();
const passport = require('passport');

const projectController = require('../controllers/project_controller');

router.post('/add',passport.checkAuthentication,projectController.createProject);

router.get('/view/:id',passport.checkAuthentication,projectController.view);

router.get('/delete/:id',passport.checkAuthentication,projectController.delete);





module.exports = router;