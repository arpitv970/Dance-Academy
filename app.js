const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

const port = process.env.PORT || 80;

// Defining Mongoose Schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set("view engine", "pug"); // Set the template engine as pug
app.set("views", path.join(__dirname, "views")); // Set the view directory

// ENDPOINTS
app.get("/", (req, res) => {
    const ourMission = fs.readFileSync('mission.txt', 'utf-8')
    const params = {"mission": ourMission};
    res.status(200).render("home.pug", params);
  });

app.get("/contact", (req, res) => {
    res.status(200).render("contact.pug");
  });

  // if you want to do save it through express: npm install body-parser
app.post("/contact", (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
      res.send("This item has been sent to Data Base")
    }).catch(()=>{
      res.status(400).send("Item was not saved to the Data Base")
    })
    // res.status(200).render("contact.pug");
  });

// START THE SERVER
app.listen(port, () => {
    console.log(`This app started successfully on the port: ${port}`);
  });