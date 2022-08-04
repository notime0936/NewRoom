var express = require('express');
var router = express.Router();
var multer = require('multer');

const { MongoClient } = require ('mongodb');
const uri = "mongodb+srv://legodude0936:2iTa7bqtH6XI8YPz@cluster0.xsdni.mongodb.net/?retryWrites=true&w=majority";

var uploadLocation = './public/uploads';
var newPicLocation;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadLocation)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".jpg")
  	}
});
var upload = multer({ storage: storage });

router.post('/',upload.single('image'), function(req, res, next){
    var session;
    session = req.session;
    console.log("new profile pic for "+session.userName);
    newPicLocation = req.file.path;
    updatePic(session.userName);
    session.profilePic = req.file.path;
    //return res.json(req.file);
    res.render('profile',{profile_username:session.userName});
});

router.get('/', function(req, res, next) {
    var session;
    session = req.session;
    res.json({path : session.profilePic});
  });


async function updatePic(userName){
    const client = new MongoClient(uri);
    try {
      await client.connect();
      const database = client.db("UserDB");
      const userCollection = database.collection("Collection1");
      var query = {username: userName};
      var newData = newPicLocation;
      var newAvatar = { $set: {profilepic:newData}};
      userCollection.updateOne(query, newAvatar);
      const result = await userCollection.findOne(query, { noCursorTimeout:false });
      //result.profilepic = ".."+newPicLocation;
      console.log(result);
    
    } finally {
      await client.close();
    }
  }

module.exports = router;