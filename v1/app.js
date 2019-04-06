const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    var campgrounds = [
        {name: "Salmon Creek", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg"},
        {name: "Dodge Ridge", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg"},
        {name: "Granite Hill", image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/munmorah-state-conservation-area/background/freemans-campground-background.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    res.send("You hit the post route");
});

app.listen(3000, () => console.log(`Listening on port 3000`));