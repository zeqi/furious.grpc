/**
 * Created by zhuxijun on 16-4-15.
 */

var user = require('../business/user');
var normalize = require('../utils/normalize');
var res = require('../utils/res');

function api() {

}

api.create = function (data) {
    return user.create(data);
}

api.find = function (req, callback) {
    return user.find().then(function (data) {
        return callback(null, new res.result(normalize(data)));
    });
}

api.findByCondition = function (req, callback) {
    return user.find(req.request).then(function (data) {
        return callback(null, new res.result(normalize(data)));
    });
}

api.findByName = function (req, callback) {
    return user.findByName(req.request).then(function (data) {
        return callback(null, new res.result(normalize(data)));
    });
}

api.findByStatus = function () {
    return user.findByStatus();
}

module.exports = api;
