let express = require('express');
let router = express.Router();

router.get('/', function(req, res, next) {
    let db = new sqlite.Database("../../database/fundraising.db");
    db.all("SELECT * FROM campaign WHERE is_pending = true", function(err, rows) {
        if (err) {
            console.error(err);
        }
        res.json(rows);
    });
});

module.exports = router;