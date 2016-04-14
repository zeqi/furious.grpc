var express = require('express');
var router = express.Router();
var client = require('../service/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.find({name: 'zeqi'}, function (err, response) {
    console.log(err);
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
