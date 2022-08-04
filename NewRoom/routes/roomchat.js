var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');


router.get('/', function(req, res, next) {
   
   res.render('roomchat');
});




module.exports = router;
