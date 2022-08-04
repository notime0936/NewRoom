var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const sessions = require('express-session');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
//var GridFsStorage = require('multer-gridfs-storage');
//var Grid = require ('gridfs-stream');
var methodOverride = require('method-override');

const { MongoClient } = require ('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var submitRouter = require('./routes/submit');
var newuserRouter = require('./routes/newuser');
var chatRouter = require('./routes/chat');
var roomchatRouter = require('./routes/roomchat');
var signupRouter = require('./routes/signup');
var profileRouter = require('./routes/profile');
var updateprofileRouter = require('./routes/updateprofile');
var logoutRouter = require('./routes/logout');
var getUserName = require('./routes/getusername');
var profilePic = require('./routes/profilepic');
var app = express();

//const uri = "mongodb+srv://dung:dung123@cluster0.eznb3.mongodb.net/Test?retryWrites=true&w=majority";
const uri = "mongodb+srv://notime0936:o5ZA3CM4rRdg3JvY@project1.eznb3.mongodb.net/UserDB?retryWrites=true&w=majority";
const client = new MongoClient(uri);

//multer upload
/*
const storage = multer.diskStorage({
  destination: './public/images/',
  filename: function(req, file, cb){
    file.fieldname = file.originalname;
    cb(null, file.originalname + '-' + Date.now() + ".jpg");
  }
});

const upload = multer({
  storage: storage
})
*/

const mongoose = require('mongoose');
const { createBrotliCompress } = require('zlib');
const { fileURLToPath } = require('url');
try{
   mongoose.connect(
      uri, { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
   );
} catch(e){
   console.log("connection fail");
}
var db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({
   extended: true
}));

//Add Express-session
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "1234abcaskdmoiwoeneorvnojfs",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/submit', submitRouter);
app.use('/newuser', newuserRouter);
app.use('/chat', chatRouter);
app.use('/chatbox', roomchatRouter);
app.use('/signup', signupRouter);
app.use('/profile', profileRouter);
app.use('/updateprofile', updateprofileRouter);
app.use('/logout', logoutRouter);
app.use('/getusername', getUserName);
app.use('/profilepic', profilePic);

//connectDB().catch(console.dir);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function connectDB(doc) {
  try {
    await client.connect();
    const database = client.db("UserDB");
    const testCollection = database.collection("Collection1");
    // create a document to insert
    //const doc = {
      //username: "Dung@gmail.com",
      //password: "123456",
    //}
    
    const result = await testCollection.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

module.exports = app;


