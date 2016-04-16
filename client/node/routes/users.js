var express = require('express');
var router = express.Router();
var user = require('../service/user');
var userProto = user.Proto;
var userApi = user.Api;

/* GET users listing. */
router.get('/', function (req, res, next) {
    userApi.find({}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

router.get('/:id', function (req, res, next) {
    userApi.findById({id: req.params['id']}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

/* GET users by name listing. */
router.get('/name/:name', function (req, res, next) {
    userApi.findByName({name: req.params['name']}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

router.get('/save', function (req, res, next) {
    var user = new userProto.Req_Doc('wangbing','13621026810');
    userApi.save(user, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

router.get('/create', function (req, res, next) {
    var users=[
        new userProto.Req_Doc('wanghehe','13621026810'),
        new userProto.Req_Doc('zhanglei','13621026810')
    ];
    userApi.create({docs: users}, function (err, response) {
        console.log(err);
        console.log(response);
        res.send(response);
    });
});

module.exports = router;
