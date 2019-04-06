const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

var campgrounds = [
    {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"},
    {name: "Dodge Ridge", image: "https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg"},
    {name: "Granite Hill", image: "https://farm9.staticflickr.com/8167/7121865553_e1c6a31f07.jpg"}
]

app.get("/campgrounds", (req, res) => {

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

app.listen(3000, () => console.log(`Listening on port 3000`));