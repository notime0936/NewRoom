var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
   
    var session;
    session = req.session;
    var user;
    user = session.userid;
    if(session.userid){
        session.userid = null;
        res.send('Hello '+user+', you have logged out!');
    }
    else{
        //res.send('Please login to log out.');
        res.render('profile')
    }
});

router.post('/',function(req, res, next){
});
module.exports = router;