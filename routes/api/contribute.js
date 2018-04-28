let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (req.query.userId && req.query.campaignId && req.query.amount !== null && parseFloat(req.query.amount) > 0) {
        const params = {
            $userId: req.query.userId,
            $campaignId: req.query.campaignId,
            $amount: parseFloat(req.query.amount)
        };
        let db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        db.run(
            "INSERT INTO campaign_contributor (userId, campaignId, contribution) VALUES ($userId, $campaignId, $amount); ",
            params,
            function (err) {
                if (err) {
                    console.error(err);
                }
            });
        db.run("UPDATE campaign SET total = total + ?1 WHERE campaignId = ?2", [params.$amount, params.$campaignId], function (err, row) {
            if (err) {
                console.error(err);
            }
        });

        db.run("UPDATE user_info SET balance = balance - ?1 WHERE userId = ?2", [params.$amount, params.$userId], function (err, row) {
            if (err) {
                console.error(err);
            }
        });

        res.sendStatus(200);
    } else res.sendStatus(400);
});

module.exports = router;