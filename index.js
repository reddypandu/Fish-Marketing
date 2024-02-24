var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb+srv://laddu:laddu630@cluster0.iq5opdo.mongodb.net/");
var db = mongoose.connection;

db.on("error", () => console.log("error in connecting"));
db.once("open", () => console.log("connected to data base"));

app.post("/sign-up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "password": password
    };

    // Corrected usage of insertOne and MongoDB collection
    db.collection("users").insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("record inserted successfully");
    });
    
    return res.redirect("log-in.html")
});


app.post("/log-in", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    // Find user by email and password
    db.collection("users").findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error logging in");
        }
        if (user) {
            // User found, login successful
           
            console.log("Login successful");
            return res.redirect("index.html");
        } else {
            // User not found or incorrect credentials
            console.log("Invalid email or password");
            return res.send("Invalid email or password");
        }
    });
});



const port = 3000;

app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-origin": "*"
    });
    return res.redirect("sign-up.html");
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
