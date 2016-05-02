var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Highlands Mountain Valley",
            image: "https://pixabay.com/static/uploads/photo/2015/09/02/13/14/highlands-918954_960_720.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Desolation Mountain",
            image: "https://pixabay.com/static/uploads/photo/2015/11/07/11/39/camping-1031360_960_720.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Mars",
            image: "https://pixabay.com/static/uploads/photo/2014/10/27/01/12/camping-504661_960_720.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]

function seedDb() {
    // Remove all campgrounds
    Campground.remove(function(err) {
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } 
                else{
                    console.log("added a campround!");
                    // add a few comments
                    Comment.create(
                        {
                            text: "I had a really weird time here actually",
                            author: "Bucky"
                        }, 
                        function(err, comment) {
                            if(err){
                                console.log(err);
                            } 
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment!");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDb;