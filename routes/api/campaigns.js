let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    const date = new Date();
    let db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
    db.all("SELECT c.*, u.firstName, u.lastName FROM campaign c LEFT JOIN user_info u ON c.ownerId = u.userId WHERE endDate > ? and isPending = 0",
        date, function (err, rows) {
            if (err) {
                console.error(err);
            }
            res.json(rows);
        });
});

module.exports = router;