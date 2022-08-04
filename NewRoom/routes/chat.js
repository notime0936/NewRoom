var express = require('express');
var router = express.Router();


/* Chat home page. */
router.get('/', function(req, res, next) {

   res.render('chat');
   //res.send('hello');
});




module.exports = router;
