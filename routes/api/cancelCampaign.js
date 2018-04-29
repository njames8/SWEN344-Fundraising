let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
const path = require('path');

router.get('/', function(req, res, next) {
    const campaignId = req.query.campaignId;
    if (campaignId) {
        const db = new sqlite.Database(path.resolve('database/fundraising.db'), sqlite.OPEN_READWRITE);
        const stmt = db.prepare(
            "UPDATE user_info SET balance = " +
            "balance + " +
            "(SELECT SUM(contribution) FROM campaign_contributor WHERE campaignId = $campaignId AND userId = $userId AND isLive=1 GROUP BY userId) " +
            "WHERE userId = $userId; "
        );
        const stmt2 = db.prepare("UPDATE campaign_contributor SET isLive = 0 WHERE campaignId = $campaignId AND userId = $userId; ");
        db.each("SELECT userId FROM campaign_contributor WHERE campaignId = ?", campaignId, function(err, row) {
            if (err) {
                console.error(err);
            }
            const params = {
                $userId: row.userId,
                $campaignId: campaignId
            };
            stmt.run(params);
            stmt2.run(params);
        });
        const now = Date.now();
        db.run("UPDATE campaign SET endDate = ?1, total = 0.0 WHERE campaignId = ?2", [now,campaignId]);
        res.sendStatus(200);
    } else res.sendStatus(400);
});

module.exports = router;