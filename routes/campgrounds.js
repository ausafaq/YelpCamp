const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE - add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user.id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            // redirect back to campgrounds
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// NEW - show form to create new campground
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE CAMPGROUND ROUTE

// middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;