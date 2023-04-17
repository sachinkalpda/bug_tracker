const Project = require('../models/project');
const Bug = require('../models/Bug');

module.exports.addBug = async function(req,res){
    try {
        let project = await Project.findById(req.params.id);
        if(project){

            return res.render('add_bug',{
                title : 'Add Bug | Homepage',
                project : project,
            });

        }
        req.flash('error','Invalid Project');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in Bug',error);
        return;
    }
    
}

module.exports.create = async function(req,res){
    try {
        let project = await Project.findById(req.body.project);
        if(project){
            let bug = await Bug.create({
                title : req.body.title,
                description : req.body.description,
                user : req.user._id, 
                project : req.body.project, 
            });
            if(bug){
                project.bugs.push(bug._id);
                await project.save();
                req.flash('success','Issue Raised!');
                return res.redirect('back');
            }
            req.flash('error','Something Went Wrong!');
            return res.redirect('back');

        }
        req.flash('error','Invalid Project');
        return res.redirect('back');

        
        
    } catch (error) {
        console.log('Error in Bug',error);
    }
}