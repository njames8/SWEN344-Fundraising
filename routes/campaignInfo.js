let express = require('express');
let router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    res.sendFile(path.resolve('public/campaign.html'));
});

module.exports = router;
