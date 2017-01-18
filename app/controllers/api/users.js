var express = require('express')
  , router = express.Router()
  , User   = require('./../../models/user'); // get our mongoose model

//Api Setup 
router.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'Chris Beaver', 
    password: 'password',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully');
    res.json({ success: true });
  });
});


// route to return all users (GET http://localhost:8080/api/users)
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

module.exports = router