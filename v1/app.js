const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp",  {useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);


app.get("/", (req, res) => {
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB
app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    res.render("show");
});

app.listen(3000, () => console.log(`Listening on port 3000`));