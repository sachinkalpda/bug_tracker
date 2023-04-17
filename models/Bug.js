const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User',
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Project'
    },
    status : {
        type : String,
        required : true,
        enum : ['open','closed'],
        default : 'open'
    },
    labels : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Label'
        }
    ]
},{
    timestamps : true,
});

const  Bug = mongoose.model('Bug',bugSchema);

module.exports  = Bug;