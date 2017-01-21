var express = require('express')
  , router = express.Router()
  , User   = require('./../../models/user') // get our mongoose model
  , config = require('./../../../config')
  , jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/', function(req, res) {
  console.log(req.body.name);
  console.log(req.body.password);
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' + req.body.name });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        // remove the password because of stuff 
        user.password = 'can not touch this!'; 
        var token = jwt.sign(user, config.secret, { expiresIn: 60 * 60 });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }

  });
});

module.exports = router