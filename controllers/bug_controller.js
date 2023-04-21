const Project = require('../models/project');
const Bug = require('../models/Bug');
const Label = require('../models/label');

module.exports.addBug = async function(req,res){
    try {
        let project = await Project.findById(req.params.id).populate('user');
        let labels = await Label.find({});
        if(project){

            return res.render('add_bug',{
                title : 'Add Bug | Homepage',
                project : project,
                labels : labels
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
        if(req.body.label == ''){
            req.flash('error','Please Select a label');
            return res.redirect('back');
        }
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


                let labels = JSON.parse(req.body.label);
                for(let label of labels){
                    let labelExist = await Label.findById(label);
                    if(labelExist){
                        bug.labels.push(label);
                        await bug.save();
                    }
                    continue;
                }

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



module.exports.filter = async function(req,res){
    try {
        let bugs = await Bug.find({
            project : req.body.project,
            labels : { $in : req.body.labels}
        }).populate('user');
        if(req.xhr){
            return res.json(200,{
                message : 'Success',
                bugs : bugs
            });
        }
        return;
        
    } catch (error) {
        console.log("Error in Bug",error);
        return;
    }
}

module.exports.search = async function(req,res){
    try {
        let bugs = await Bug.find({
            project : req.body.project,
            title : new RegExp(req.body.query, 'i')
        }).populate('user');
        console.log(bugs);
        if(req.xhr){
            return res.json(200,{
                message : 'Success',
                bugs : bugs
            });
        }
        return;
        
    } catch (error) {
        console.log('Error in Bug',error);
        return;
    }
}

module.exports.view = async function(req,res){
    try {
        let bug = await Bug.findById(req.params.id).populate('labels').populate('user')
        .populate({
            path :'project',
            populate : {
                path : 'user'
            }
        })
        .populate({
            path: 'improvements',
            populate : {
                path: 'user'
            }
        });
        if(bug){
            return res.render('bug',{
                title : `${bug.title} | Bug Tracker`,
                bug : bug,
            });
        }
        req.flash('error','Invalid Bug !');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in Bug',error);
        return;
    }
}


module.exports.close = async function(req,res){
    try {
        let bug = await Bug.findById(req.params.id).populate('project');
        if(bug.user == req.user.id || bug.project.user == req.user.id){
            bug.status = 'closed';
            await bug.save();
            let project =  await Project.findById(bug.project);
            project.closed.push(bug._id);
            project.bugs.pull(bug._id);
            await project.save();
            req.flash('success','Bug Closed');
            return res.redirect('back');
        }
        req.flash('error',"You'r not Authorize to complete this action");
        return res.redirect('back');
    } catch (error) {
        console.log('Error in Bug',error);
        return;
    }
}