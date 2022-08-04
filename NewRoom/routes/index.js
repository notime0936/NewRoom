var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var session;
    session = req.session;
    if(session.userid){
      res.render('profile',{profile_username:session.userName});
    }
    else{
      res.render('home');
    }
});

module.exports = router;
