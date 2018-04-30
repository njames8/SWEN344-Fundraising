let express = require('express');
let router = express.Router();
let path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve('public/index.html'));
});

module.exports = router;
