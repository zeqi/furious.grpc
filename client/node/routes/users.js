var express = require('express');
var router = express.Router();
var service = require('../service/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
    service.find({}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

router.get('/save', function (req, res, next) {
    var user = {
        "name": "wangbing",
        "mobile": "13621026810"
    }
    service.save(user, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

router.get('/create', function (req, res, next) {
    var users = [{
        "name": "wanghehe",
        "mobile": "13621026810"
    }, {
        "name": "zhanglei",
        "mobile": "13621026810"
    }];
    service.create({docs: users}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});


router.get('/:id', function (req, res, next) {
    service.findById({id: req.params['id']}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

/* GET users by name listing. */
router.get('/name/:name', function (req, res, next) {
    service.findByName({name: req.params['name']}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

module.exports = router;
