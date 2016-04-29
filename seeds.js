var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Highlands Mountain Valley",
            image: "https://pixabay.com/static/uploads/photo/2015/09/02/13/14/highlands-918954_960_720.jpg",
            description: "Epic, beautiful spot!"
        },
        {
            name: "Desolation Mountain",
            image: "https://pixabay.com/static/uploads/photo/2015/11/07/11/39/camping-1031360_960_720.jpg",
            description: "Nothing much here except this rad view!"
        },
        {
            name: "Mars",
            image: "https://pixabay.com/static/uploads/photo/2014/10/27/01/12/camping-504661_960_720.jpg",
            description: "Amazing rocky desert wonderland!"
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