const mongoose = require('mongoose');


const projectSchema = mongoose.Schema({
    title :{
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User',
    },
    bugs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Bug'
        }
    ],
    closed : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Bug'
        }
    ],

},
{
    timestamps : true,
});

const Project = mongoose.model('Project',projectSchema);

module.exports = Project;