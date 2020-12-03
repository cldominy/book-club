const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
    app.get("/api/reviews", (req, res) => {
        const query = {};
        if (req.query.user_id) {
            query.UserID = req.query.user_id;
        }
        db.Reviews.findAll({
            where: query,
            include: [db.User]
        }).then((dbReview) => {
            res.json(dbReview);
        });
    });

    app.get("/api/reviews/latest", (req, res) => {
        const query = {};
        if (req.query.user_id) {
            query.UserID = req.query.user_id;
        }
        db.Reviews.findAll({
            limit: 4,
            where: query,
            include: [db.User],
            order: [["createdAt", "DESC"]]
        }).then((dbReview) => {
            res.json(dbReview);
        });
    });

    app.post("/api/reviews", isAuthenticated, (req, res) => {
        const userID = req.user.id;
        const userName = req.user.username;
        const data = req.body;
        data.UserId = userID;
        data.name = userName;
        console.log(data);
        db.Reviews.create(data).then((dbReview) => {
            res.status(201).json(dbReview);
        });
    });
};

