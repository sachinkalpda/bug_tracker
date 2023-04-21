const Project = require('../models/project');

// function for homepage
module.exports.home = async function(req,res){
    try {
        let projects = await Project.find({}).populate('user');
        if(projects){
            return res.render('home',{
                title : 'Hompage | Bug Tracker',
                projects : projects
            });
            
        }
        req.flash('error','Something Went Wrong');
        return res.render('home',{
            title : 'Hompage | Bug Tracker'
        });
        
    } catch (error){
        console.log('Error in Homepage',error);
        return;
    }
    
}