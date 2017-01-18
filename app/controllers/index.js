var express = require('express')
  , router = express.Router()


router.use('/api', require('./api/index'))

// basic route
router.use('/', function(req, res) {
    res.send('Hello! The API is at /api');
});

module.exports = router