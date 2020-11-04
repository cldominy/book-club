// Requiring path to so we can use relative routes to our HTML files
const db = require("../models");
const moment = require("moment");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
    app.get("/", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.render("members");
        }
        res.render("signup");
    });

    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.render("members");
        }
        res.render("login");
    });

    app.get("/signup", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.render("members");
        }
        res.render("signup");
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, (req, res) => {
        res.render("members");
    });

    app.get("/create", isAuthenticated, (req, res) => {
        res.render("create");
    });

 
    app.get("/search", (req, res) => {
        res.render("search", {books: []});
    });

    app.get("/display", (req, res) => {
        db.Reviews.findAll().then( (data) => {
            const viewData = {
                Reviews: data.map((entry) => {
                    const newData = entry.dataValues;
                    const createdTime = moment(newData.createdAt, "YYYY-MM-DD HH:mm:ss").format("MMM Do YYYY");
                    newData.createdAt = createdTime; 
                    return newData;
                })
            };
            res.render("display", viewData);
        });
    });

    app.get("/profile", (req, res) => {
        db.Reviews.findAll(
            {
                where: {
                    UserID: req.user.id
                },
                include: [db.User]
            }
        ).then( (data) => {
            const viewData = {
                Reviews: data.map((entry) => {
                    const newData = entry.dataValues;
                    const createdTime = moment(newData.createdAt, "YYYY-MM-DD HH:mm:ss").format("MMM Do YY");
                    newData.createdAt = createdTime; 
                    return newData;
                })
            };
            res.render("profile", viewData);
        });
    });
};
