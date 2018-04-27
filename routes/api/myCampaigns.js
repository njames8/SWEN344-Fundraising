let express = require('express');
let router = express.Router();
let sqlite = require('sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
    let userId = req.body.userId;
    if (userId !== null) {
        let db = new sqlite.Database("../../database/fundraising.db");
        db.all("SELECT * FROM campaign WHERE owner_id = $userId", userId, function (err, rows) {
            res.json(rows);
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;