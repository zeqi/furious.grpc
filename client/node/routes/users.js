var express = require('express');
var router = express.Router();
var service = require('../service/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  service.find({}, function (err, response) {
    console.log(err);
    console.log(response);
    res.send(response);
  });
});

/* GET users listing. */
router.get('/:name', function(req, res, next) {
  service.findByName({name: req.params['name']}, function (err, response) {
    console.log(err);
    console.log(response);
    res.send(response);
  });
});

module.exports = router;
