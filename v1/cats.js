var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useNewUrlParser: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
    name: "George",
    age: 11,
    temperament: "Grouchy"
});

george.save((err, cat) => {
    if(err) {
        console.log("ERROR OCCURRED!");
    } else {
        console.log("Successfully saved a cat:");
        console.log(cat);
    }
});