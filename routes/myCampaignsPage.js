let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render(__dirname  + '/campaigns-page.html');
});

module.exports = router;
