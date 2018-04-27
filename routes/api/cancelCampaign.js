let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');

router.get('/', function(req, res, next) {
    const campaignId = res.body['campaignId'];
    if (campaignId !== null) {
        const db = new sqlite.Database('../../database/fundraising.db');
        const stmt = db.prepare(
            "UPDATE user_info SET balance = " +
            "(SELECT balance FROM user_info WHERE user_id = $userId) + " +
            "(SELECT SUM(contribution) FROM campaign_contributor WHERE campaign_id = $campaignId AND user_id = $userId GROUP BY user_id); " +
            "UPDATE campaign_contributor SET is_live = FALSE WHERE campaign_id = $campaignId AND user_id = $userId; "
        );
        db.each("SELECT user_id FROM campaign_contributor WHERE campaign_id = ?", campaignId, function(err, row) {
            if (err) {
                console.error(err);
            }
            const params = {
                $userId: row,
                $campaignId: campaignId
            };
            stmt.run(params)
        });
        db.exec("UPDATE campaign SET end_date = CURRENT_TIMESTAMP WHERE campaign_id = ?", campaignId);
        res.sendStatus(200);
    }
});

module.exports = router;