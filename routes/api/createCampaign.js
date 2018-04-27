let express = require('express');
let router = express.Router();
let sqlite = require('sqlite3');

router.post('/', function(req, res, next) {
    let newObj = {};
    Object.assign(newObj, req.body);
    newObj['startDate'] = Date.parse(req.startDate);
    newObj['endDate'] = Date.parse(req.endDate);

    let db = new sqlite.Database('../../database/fundraising.db');
    db.exec("INSERT INTO campaign (owner_id, title, description, goal, total, start_date, end_date, image) " +
        "VALUES ($userId, $title, $description, $goal, $total, $startDate, $endDate, $imageUrl)", newObj);

    res.sendStatus(200);
});


module.exports = router;
