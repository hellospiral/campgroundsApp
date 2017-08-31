var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var middlewareObj = {};


middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                //does user own campground?
                if (foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    res.redirect("back");
                }  
            }
        });    
    } else {
        req.flash("error", "You don't have permission to do that.");
        res.redirect("back");
    }    
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                //does user own the comment?
                if (foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");
                }  
            }
        });    
    } else {
        req.flash("error", "You need to be loged in to do that.");
        res.redirect("back");
    }    
}

middlewareObj.checkUserOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        User.findById(req.params.id, function(err, foundUser) {
            if(err) {
                console.log(err);
                req.flash('error', "User not found");
                res.redirect("back");
            } else {
                console.log(foundUser);
                // is this the current user?
                if (foundUser.id == req.user._id || req.user.isAdmin) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("back");                    
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login"); 
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
}


module.exports = middlewareObj;