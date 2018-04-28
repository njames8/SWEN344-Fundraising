let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

router.get('/', function(req, res, next) {
    const campaignId = req.query.campaignId;
    if (campaignId) {
        const db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        const now = Date.now();
        db.run("UPDATE campaign SET endDate = ?1 WHERE campaignId = ?2 AND endDate > ?1", [now, campaignId], function(err, obj) {
            if (err) {
                console.error(err);
            }
        });
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;