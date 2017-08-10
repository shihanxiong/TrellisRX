var express = require('express');
var router = express.Router();

/* GET patients listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a list of patients');
});

module.exports = router;
