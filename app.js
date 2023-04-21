const express = require('express');
const port = 8000;
 
const app = express();
app.locals.moment = require('moment');

const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');



// authentication library
const passport = require('passport');
const LocalStrategy = require('./config/passport_local_strategy');

// for mongostore
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(expressLayout);
app.use(express.static('./assets'));

// for session 

const session = require('express-session');



// for flash messages
const flash = require('connect-flash');
const flashMiddleware = require('./config/flash_middleware');


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// set view engine
app.set('view engine','ejs');
app.set('views','./views');


// use session
app.use(session({
    name : 'bug tracker',
    secret: 'bug tracker',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        // secure: true ,
        maxAge : (1000*60*100)
    },
    store : MongoStore.create({
        mongoUrl : db._connectionString,
        autoRemove : 'disabled',
    },function(err){
        console.log(err);
    })
}));


// passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// for flash messages
app.use(flash());
app.use(flashMiddleware.setFlash);

app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error is starting Server",err);
        return;
    }
    console.log('Server is Running on port : ', port);
});