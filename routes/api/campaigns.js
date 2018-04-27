let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (res.body['currentDate'] !== null) {
        const date = Date.parse(res.body['currentDate']);
        let db = new sqlite.Database("../../database/fundraising.db");
        db.all("SELECT * FROM campaign WHERE end_date > date(?)", date, function (err, rows) {
            if (err) {
                console.error(err);
            }
            res.json(rows);
        });
    }
});

module.exports = router;