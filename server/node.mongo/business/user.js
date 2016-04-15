/**
 * Created by zhuxijun on 16-4-8.
 */

var userDao = require('../persistence/dao/userTwo');

function Business() {

}

Business.create = function (data) {
    return userDao.create(data);
}

Business.find = function (data, callback) {
    console.log(data);
    userDao.find().nodeify(callback);
}

Business.findByCondition = function (data, callback) {
    var data = {name: data};
    return userDao.find(data).nodeify(callback);
}

Business.findByName = function (data, callback) {
    return userDao.findByName(data).nodeify(callback);
}

Business.findByStatus = function () {
    return userDao.findByStatus();
}

module.exports = Business;