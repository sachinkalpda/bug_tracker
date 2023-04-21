const User = require('../models/user');
const bcrypt = require('bcrypt');
module.exports.register = function(req,res){
    if(req.user){
        return res.redirect('back');
    }
    return res.render('register',{
        title : 'Register | Bug Tracker'
    });
}

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



module.exports.login = function(req,res){
    if(req.user){
        return res.redirect('back');
    }
    return res.render('login',{
        title : "Login | Bug Tracker"
    })
}


module.exports.createSession = function(req,res){
    req.flash('success','Login Successfully');
    return res.redirect('/');
}


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


module.exports.viewAll = async function(req,res){
    try {
        let users = await User.find( { _id : {$nin : req.user._id} });
        console.log(users);
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