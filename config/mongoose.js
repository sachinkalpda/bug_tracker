const { error } = require('console');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bug_tracker_development');


const db = mongoose.connection;



db.on('error',console.error.bind(console,'Error in Connecting Database'));


db.once('open',function(){
    console.log('Connected To Database');
});

module.exports = db;
