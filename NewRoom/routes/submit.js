var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient } = require ('mongodb');
const uri = "mongodb+srv://dung:dung123@cluster0.eznb3.mongodb.net/Test?retryWrites=true&w=majority";
const client = new MongoClient(uri);



/* GET home page. */
router.post('/', function(req, res, next) {
  var session;

  checkUserDB(req.body.username,req.body.password).then(
  function(value){
     if(value){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome Te <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
  },
  function(error){
     console.log('Error');
  }
  );
  console.log('hello');
  /*
*/
  //res.render('submit', {username: req.body.username});
});

async function checkUserDB(user, password) {

    try {
    await client.connect();
    const database = client.db("Test");
    const testCollection = database.collection("testCollection");
    var query = {username: user};
    const result = await testCollection.findOne(query, { noCursorTimeout:false });
//  find user name
    var match = await bcrypt.compare(password, result.password);
    console.log(match);
    return match;

  } finally {
    //console.log("Error while connect to DB");
    await client.close();
  }

}


module.exports = router;
