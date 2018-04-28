let express = require('express');
let router = express.Router();
const path = require('path');
const sqlite = require('sqlite3');

router.get('/', function(req, res, next) {
    let db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
    db.all("SELECT * FROM campaign WHERE isPending = 1", function(err, rows) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});

module.exports = router;