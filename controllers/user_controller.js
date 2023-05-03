const User = require('../models/user');
const bcrypt = require('bcrypt');

// to render the register page
module.exports.register = function(req,res){
    if(req.user){
        return res.redirect('back');
    }
    return res.render('register',{
        title : 'Register | Bug Tracker'
    });
}

// for register a new user to system

module.exports.addUser = async function(req,res){

    try {
        if(req.body.password == req.body.confirm_password){
            const user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : bcrypt.hashSync(req.body.password, 10)
            });
            if(user){
                req.flash('success','User Registered Successfully. Please Login to continue');
                return res.redirect('/user/login');
            }
            req.flash('error','Something Went Wrong!');
            return res.redirect('back');
        }else{
            req.flash('error',"Password Doesn't Match");
        }
    } catch (error) {
        console.log('Error in User',error);
    }
}

// to render the login page

module.exports.login = function(req,res){
    if(req.user){
        return res.redirect('back');
    }
    return res.render('login',{
        title : "Login | Bug Tracker"
    })
}


// redirecting to home page authenticated user

module.exports.createSession = function(req,res){
    req.flash('success','Login Successfully');
    return res.redirect('/');
}


// for logout the user

module.exports.logout = function(req,res){
    req.logout(function (err) {
        if (err) {
            console.log('Error', err);
            return;
        }
        req.flash('success', 'Logout Successfully');
        return res.redirect('/user/login');
    });
}

// for view the all users information

module.exports.viewAll = async function(req,res){
    try {
        let users = await User.find( { _id : {$nin : req.user._id} });
        if(users){
            return res.render('users',{
                title : 'All Users | Homepage',
                users :  users
            });
        }
        req.flash('error','Something Went Wrong!');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in User',error);
        return;
    }
}