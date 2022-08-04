var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   
    var session;
    session = req.session;
    if(session.userid){
        res.send('Hello '+session.userid+', you have logged in!');
    }
    else{
        res.send('Please login to update your profile.');
    }
});

router.post('/',function(req, res, next){
});
module.exports = router;