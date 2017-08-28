var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var geocoder = require('geocoder');

var data = [
        {
            name: "Highlands Mountain Valley",
            image: "https://source.unsplash.com/gvkdncTaZu8",
            location: "Bend, OR",
            description: "Beautiful isolated space. Very quiet. No facilities.",
            price: "12.00"
        },
        {
            name: "Forest Peak",
            image: "https://source.unsplash.com/WWb4gn130JI",
            location: "Washougal, WA", 
            description: "Tranquil location near the Washougal river. Beautiful trees. Can get overcrowded in summer.",
            price: "9.00"
        },
        {
            name: "Shoreline Park",
            image: "https://source.unsplash.com/dSloTNyqwPY",
            location: "Lofoten, Norway",
            description: "Absolutely one of the most beautiful experiences. If you're anywhere in the vicinity you really must go. There's no place like this in the world.",
            price: "13.50"
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
            geocoder.geocode(seed.location, function(err, data) {
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                var location = data.results[0].formatted_address;
                var newCampground = {name: seed.name, image: seed.image, description: seed.description, location: location, lat: lat, lng: lng, price: seed.price};
                Campground.create(newCampground, function(err, campground){
                    if(err){
                        console.log(err);
                    } 
                    else{
                        console.log("added a campround!");
                    }
                });
            });
        });
    });
}

module.exports = seedDb;