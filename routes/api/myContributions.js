let express = require('express');
let router = express.Router();
const sqlite = require('sqlite3');
/* GET home page. */
router.get('/', function(req, res, next) {
    const userId = res.body.userId;
    if (userId !== null) {
        const db = new sqlite.Database("../../database/fundraising.db");
        db.all("SELECT cp.*, cc.contribution FROM campaign_contributor cc " +
            "INNER JOIN campaign cp ON cc.campaign_id = cp.campaign_id " +
            "WHERE cc.user_id = ?",
            userId,
            function(err, rows) {
                if (err) {
                    console.error(err);
                }
                res.json(rows);
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;