let express = require('express');
let router = express.Router();
let sqlite = require('sqlite3');

router.get('/', function(req, res, next) {
    const campaignId = res.body.campaignId;
    if (campaignId !== null) {
        const db = new sqlite.Database('../../database/fundraising.db');
        db.exec("UPDATE campaign SET end_date = CURRENT_TIMESTAMP WHERE campaign_id = ?", campaignId, function(err, obj) {
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