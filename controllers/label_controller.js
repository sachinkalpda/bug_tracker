const Label = require('../models/label');

// for add a new label

module.exports.add = async function(req,res){
    console.log(req.body);
    try {
        let label = await Label.create({
            title : req.body.label,
            user : req.user._id
        });
        if(label){
            return res.json(200,{
                message : 'Label Created!',
                label : label
            });
        }
        return res.json(200,{
            message : 'Something Went Wrong',
            label : []
        });
    } catch (error) {
        console.log('Error in Label',error);
        return;
        
    }
    
}

// ajax request to fetch lables

module.exports.getLabel = async function(req,res){
    try {

        let labels = await Label.find({title: new RegExp(req.body.title, 'i')});
        if(labels){
            return res.json(200,{
                message : 'success',
                labels : labels,
            })

        }
        return res.json(200,{
            message : 'Something Went Wrong',
            labels : [],
        })
        
    } catch (error) {
        console.log('Error in Label',error);

        
    }
}