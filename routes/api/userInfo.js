let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
    const userId = res.body.userId;
    if (userId !== null) {
        const db = new sqlite.Database("../../database/fundraising.db");
        db.get("SELECT * FROM user_info WHERE user_id = $userId", userId, function(err, row) {
            res.json(row);
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;