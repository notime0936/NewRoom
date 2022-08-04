var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var session;
    session = req.session;
    res.json({name : session.userName});
  });

  module.exports = router;