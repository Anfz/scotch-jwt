var express = require('express')
  , router = express.Router()
  , jwt    = require('jsonwebtoken') // used to create, sign, and verify tokens  
  , config = require('./../../../config')
  , User   = require('./../../models/user'
  , AuthMid = require('./../../middleware/auth'));

// non authenticated routes
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest api on earth!' });
});
router.use('/authenticate', require('./auth'))

// end non authenticated routes 
// authenticate middleware  
router.use(AuthMid);  
// end authenticate middleware 

// authenticated routes
router.use('/users', require('./users'))
// end authenticated routes 
module.exports = router