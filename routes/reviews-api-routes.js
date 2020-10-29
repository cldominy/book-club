const db = require("../models");

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

    app.post("/api/reviews", (req, res) => {
        db.Reviews.create(req.body).then((dbReview) => {
            res.status(201).json(dbReview);
        });
    });
};

