/**
 * Created by zhuxijun on 16-4-8.
 */

var userDao = require('../persistence/dao/user');

function Business() {

}

Business.save = function (data, callback) {
    return userDao.save(data).nodeify(callback);
}

Business.create = function (data, callback) {
    return userDao.create(data).nodeify(callback);
}

Business.find = function (callback) {
    return userDao.find().nodeify(callback);
}

Business.findById = function (data, callback) {
    return userDao.findById(data).nodeify(callback);
}

Business.findByName = function (data, callback) {
    return userDao.findByName(data).nodeify(callback);
}

Business.findByCondition = function (data, callback) {
    return userDao.find(data).nodeify(callback);
}


Business.findByStatus = function () {
    return userDao.findByStatus();
}

module.exports = Business;