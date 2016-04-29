var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDb      = require("./seeds")
    
seedDb();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



app.get("/", function(req, res) {
   res.render("landing"); 
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res) {
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err, allCampgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

//CREATE - add new capground to database
app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampGround = {name: name, image: image, description: desc};
    // CREATE A NEW CAMPGROUND AND SAVE TO DB
    Campground.create(newCampGround, function(err, newlyCreated) {
        if(err){
            console.log(err);
        }
        else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});


//SHOW - shows more info about one particular campground
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id, function(err, foundCampground) {
       if (err) {
           console.log(err)
       } 
       else {
           //render show template with that campground
           res.render("show", {campground: foundCampground});
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server running");
});