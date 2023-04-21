const Project = require('../models/project');
const Label = require('../models/label');
const Bug = require('../models/Bug');
const Improvement = require('../models/improvement');


// for create a new project
module.exports.createProject = async function(req,res){
    try {
        let project = await Project.create({
            title : req.body.title,
            description: req.body.description,
            user: req.user._id,
        });

        if(project){
            req.flash('success','Project Added Succesfully');
            return res.redirect('back');
        }
        req.flash('error','Something Went Wrong');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in Project',error);
    }
}   


// for showing details of project

module.exports.view = async function(req,res){
    try {
        let project = await Project.findById(req.params.id)
        .populate({
            path : 'bugs',
            populate : {
                path : 'user'
            }
        })
        .populate({
            path : 'closed',
            populate : {
                path : 'user'
            }
        }).populate('user');
        let labels = await Label.find();
        if(project){
            return res.render('project',{
                title : `${project.title} | Bug Tracker`,
                project : project,
                labels : labels
            });
        }
        req.flash('error','Invalid Project');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error on Project',error);
        return;
        
    }
}


// for delete the project

module.exports.delete = async function(req,res){
    try {
        let project = await Project.findById(req.params.id);
        if(project){
            await Bug.deleteMany({project :  project._id});
            await Improvement.deleteMany({project :  project._id});
            await project.deleteOne();
            req.flash('success','Project And Associated data Deleted!');
            return res.redirect('back');
        }
        req.flash('error','Invalid Project !');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in project',error);
        
    }
}