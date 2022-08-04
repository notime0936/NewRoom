var express = require('express');
var router = express.Router();
const { MongoClient } = require ('mongodb');
const bcrypt = require('bcryptjs');


router.get('/', function(req, res, next) {

  res.render('login');
});

module.exports = router;
