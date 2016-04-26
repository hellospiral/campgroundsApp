var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var campgrounds = [
    {name: "Duck Creek", image: "https://pixabay.com/static/uploads/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"},
    {name: "Mountain Face", image: "https://pixabay.com/static/uploads/photo/2015/08/04/11/02/caravans-874549_960_720.jpg"},
    {name: "Bacon Crown", image: "https://pixabay.com/static/uploads/photo/2015/05/23/00/25/utah-780108_960_720.jpg"}
];

app.get("/", function(req, res) {
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res) {
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampGround = {name: name, image: image};
    campgrounds.push(newCampGround);
 
   //redirect back go campgrounds page
   res.redirect("/campgrounds");
   
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server running");
});