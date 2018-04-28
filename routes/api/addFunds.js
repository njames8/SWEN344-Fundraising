let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    const userId = req.query.userId;
    const amount = req.query.amount;
    if (userId && amount) {
        const db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        db.run("UPDATE user_info SET balance = balance + ?1 WHERE userId = ?2", [amount,userId], function(err) {
            if (err){
                console.error(err);
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;