const mongoose =  require("mongoose");
const Campground =  require("./models/campground");

function seedDB() {
    Campground.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("remove campgrounds!");
    });
}

module.exports = seedDB;
