let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    const email = req.query.email;
    if (email) {
        const db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        db.get("SELECT * FROM user_info WHERE email = $email", email, function(err, row) {
            res.json(row);
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;