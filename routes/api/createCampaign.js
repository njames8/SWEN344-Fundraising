let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

router.post('/', function(req, res, next) {
    let newObj = {
        $userId: req.body.userId,
        $title: req.body.title,
        $description: req.body.description,
        $goal: req.body.goal,
        $startDate: new Date(req.body.startDate),
        $endDate: new Date(req.body.endDate),
        $imageUrl: req.body.image
    };

    let db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
    db.run("INSERT INTO campaign (ownerId, title, description, goal, startDate, endDate, image) " +
        "VALUES ($userId, $title, $description, $goal, $startDate, $endDate, $imageUrl)", newObj, function(err) {
        if (err) {
            console.error(err);
        }
        db.close();
    });

    res.sendStatus(200);
});


module.exports = router;
