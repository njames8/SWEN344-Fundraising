let express = require('express');
let router = express.Router();
const path = require('path');
const sqlite = require('sqlite3');

router.post('/', function(req, res, next) {
    const info = req.body;
    if (info.firstName && info.lastName && info.email) {
        let db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        let stmt = null;
        const params = [info.firstName, info.lastName, info.email];
        if (req.body.isAdmin && (req.body.isAdmin === 'true' || req.body.isAdmin === true)) {
            stmt = db.prepare("INSERT INTO user_info (firstName, lastName, email, isAdmin) VALUES(?1, ?2, ?3, ?4)");
            params.push(1);
        } else {
            stmt = db.prepare("INSERT INTO user_info (firstName, lastName, email) VALUES(?1, ?2, ?3)");
        }
        stmt.get(params, function (err, row) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            db.get("SELECT * FROM user_info WHERE email = ?", [info.email], function(err, row) {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                }
                res.json(row);
            });
        });
    } else res.sendStatus(400);
});

module.exports = router;