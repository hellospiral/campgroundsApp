var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
   res.render("landing"); 
});

app.get("/campgrounds", function(req, res) {
    var campgrounds = [
        {name: "Duck Creek", image: "https://pixabay.com/static/uploads/photo/2016/01/26/23/32/camp-1163419_960_720.jpg"},
        {name: "Mountain Face", image: "https://pixabay.com/static/uploads/photo/2015/08/04/11/02/caravans-874549_960_720.jpg"},
        {name: "Bacon Crown", image: "https://pixabay.com/static/uploads/photo/2015/05/23/00/25/utah-780108_960_720.jpg"}
        ];
    
    res.render("campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server running");
});