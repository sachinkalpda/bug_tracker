const Improvement = require('../models/improvement');
const Bug = require('../models/Bug');


// to add new improvement to bug
module.exports.add = async function(req,res){
    try {
        let bug = await Bug.findById(req.params.bug);
        if(bug){
            let improvement = await Improvement.create({
                content : req.body.improvement,
                project : bug.project,
                user : req.user._id,
            });
            bug.improvements.push(improvement._id);
            await bug.save();
            req.flash('success','Improvement Added');
            return res.redirect('back');
        }
        req.flash('error','Invalid Bug');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in Improvment',error);
        return
    }
}