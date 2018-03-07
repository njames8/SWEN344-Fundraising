let express = require('express');
let router = express.Router();
let file = require("../../mock_data/my_campaigns.json");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.json(file);
});

module.exports = router;