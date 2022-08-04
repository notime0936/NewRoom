var express = require('express');
var router = express.Router();
const { MongoClient } = require ('mongodb');
const bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {

  res.render('home');
});

router.post('/',function(req, res, next){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.pswd,salt);

    const user = {
      firstname:req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      username: req.body.username,
      pswd: hash,
      profilepic: "../images/anime.jpg",
    }
    console.log(user);
    insertUser(user);
    res.redirect('/');
  });
  // 2iTa7bqtH6XI8YPz
  async function insertUser(newuser){
      const uri = "mongodb+srv://legodude0936:2iTa7bqtH6XI8YPz@cluster0.xsdni.mongodb.net/?retryWrites=true&w=majority";
  
      const client = new MongoClient(uri);
      console.log('MONGODB URI!');
      try {
          // Connect to the MongoDB cluster
          await client.connect();
          console.log('MONGODB CONNECTED!');
          const database = client.db("UserDB");
  
          const chatusers = database.collection("Collection1");
         // create a document to insert

          const result = await chatusers.insertOne(newuser);
  
          console.log(`A user was inserted with the _id: ${result.insertedId}`);
  
          
   
      } catch (e) {
          console.error(e);
      } finally {
          await client.close();
      }
 }

module.exports = router;
