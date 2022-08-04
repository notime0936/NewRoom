var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { MongoClient } = require ('mongodb');
const uri = "mongodb+srv://dung:dung123@cluster0.eznb3.mongodb.net/Test?retryWrites=true&w=majority";
const client = new MongoClient(uri);

router.get('/', function(req, res, next) {
  res.render('newuser');
});

/* Store new user */

router.post('/', function(req, res, next) {
  const saltRounds = 10;
  const userPassword = req.body.password;
  
  bcrypt.hash(userPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    const user = {
      username: req.body.username,
      password: hash,
    };
    
  insertUserDB(user);

  });

  res.render('newuserSuccess', {username: req.body.username});
});

async function insertUserDB(user) {

    try {
    await client.connect();
    const database = client.db("Test");
    const testCollection = database.collection("testCollection");
    // create a document to insert
    const result = await testCollection.insertOne(user);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }

}

module.exports = router;
