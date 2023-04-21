const express = require('express');


const router = express.Router();
const passport = require('passport');

const projectController = require('../controllers/project_controller');


// adding a new project
router.post('/add',passport.checkAuthentication,projectController.createProject);

// route for view information of project
router.get('/view/:id',passport.checkAuthentication,projectController.view);

// route for deleting a project
router.get('/delete/:id',passport.checkAuthentication,projectController.delete);





module.exports = router;