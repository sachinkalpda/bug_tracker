const mongoose = require('mongoose');


const improvementSchema = mongoose.Schema({
    content : {
        type : String,
        required : true,
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Project'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    }
},{
    timestamps: true,
});

const Improvement = mongoose.model('Improvement',improvementSchema);


module.exports = Improvement;