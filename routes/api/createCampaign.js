let express = require('express');
let router = express.Router();
let sqlite = require('sqlite3');

router.post('/', function(req, res, next) {
    let newObj = {
        $userId: req.body.userId,
        $title: req.body.title,
        $description: req.body.description,
        $goal: req.body.goal,
        $startDate: Date.parse(req.body.startDate),
        $endDate: Date.parse(req.body.endDate),
        $imageUrl: Date.parse(req.body.image)
    };


    let db = new sqlite.Database('../../database/fundraising.db');
    db.exec("INSERT INTO campaign (owner_id, title, description, goal, total, start_date, end_date, image) " +
        "VALUES ($userId, $title, $description, $goal, $startDate, $endDate, $imageUrl)", newObj);

    res.sendStatus(200);
});


module.exports = router;
