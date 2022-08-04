var express = require('express');
var router = express.Router();
const { MongoClient } = require ('mongodb');
const bcrypt = require('bcryptjs');
const uri = "mongodb+srv://legodude0936:2iTa7bqtH6XI8YPz@cluster0.xsdni.mongodb.net/?retryWrites=true&w=majority";

router.get('/', function(req, res, next) {
  var session;
    session = req.session;
    if(session.userid){
      res.render('profile',{profile_username:'dung'});
    }
    else{
      res.send('Please login to update your profile.');
    }
});

router.post('/',function(req, res, next){
    var session;
  
    var value = checkLogin(req.body.username,req.body.pswd);
    console.log('value:'+value)
    if(value){
      userInfo(req.body.username).then(function(info)
      {
      console.log('this is info'+info);
      session = req.session;
      session.userid = req.body.username;
      session.userName = info.username;
      session.profilePic = info.profilepic;
      res.render('profile',{profile_username:session.userName});
      });
    }
    else{
      res.send('Invalid username or password');
    }
});
    
  
async function checkLogin(userName, password){
  const client = new MongoClient(uri);
  console.log('user and pass '+userName+password);
  try {
    await client.connect();
    const database = client.db("UserDB");
    const userCollection = database.collection("Collection1");
    var query = {username: userName};
    const result = await userCollection.findOne(query, { noCursorTimeout:false });
    var match = await bcrypt.compare(password, result.pswd);
    console.log('pass is '+match);
    return match;
  
  } finally {
    await client.close();
  }
}

async function userInfo(userName){
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db("UserDB");
    const userCollection = database.collection("Collection1");
    var query = {username: userName};
    var result = await userCollection.findOne(query, { noCursorTimeout:false });
    console.log(result);
    return result;

  } finally {
    await client.close();
  }
}

module.exports = router;
