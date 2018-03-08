let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/account', function(req, res, next) {
    res.render(__dirname  + '/account-page.html');
});

module.exports = router;
