const mongoose = require('mongoose');

const labelSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    }
},{
    timestamps : true,
})

const Label = mongoose.model('Label',labelSchema);

module.exports = Label;