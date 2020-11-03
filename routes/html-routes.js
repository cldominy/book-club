// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
const moment = require("moment");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
    app.get("/", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/signup.html"));
    });

    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/members.html"));
    });

    app.get("/create", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/create.html"));
    });

 
    app.get("/search", (req, res) => {
        res.render("search", {books: []});
    });

    app.get("/display", (req, res) => {
        db.Reviews.findAll().then( (data) => {
            const viewData = {
                Reviews: data.map((entry) => {
                    const newData = entry.dataValues;
                    const createdTime = moment(newData.createdAt, "YYYY-MM-DD HH:mm:ss").format("MMM Do YY");
                    newData.createdAt = createdTime; 
                    return newData;
                })
            };
            console.log(viewData);
            res.render("display", viewData);
        });
    });
};
