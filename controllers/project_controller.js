const Project = require('../models/project');

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


module.exports.view = async function(req,res){
    try {
        let project = await Project.findById(req.params.id);
        if(project){
            return res.render('project',{
                title : `${project.title} | Bug Tracker`,
                project : project,
            });
        }
        req.flash('error','Invalid Project');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error on Project',error);
        return;
        
    }
}