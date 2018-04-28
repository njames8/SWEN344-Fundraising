let express = require('express');
let router = express.Router();
const path = require('path');
const sqlite = require('sqlite3');

router.get('/', function(req, res, next) {
    const campaignId = req.query.campaignId;
    if (campaignId) {
        let db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        db.all("UPDATE campaign SET isPending = 0 WHERE campaignId = $campaignId", campaignId, function (err) {
            if (err) {
                console.error(err);
                res.sendStatus(500);
            }
            res.sendStatus(200);
        });
    } else res.sendStatus(400);
});

module.exports = router;