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
    callback(userDao.find());
}

Business.findByCondition = function (data, callback) {
    var data = {name: data};
    return userDao.find(data).notify(callback);
}

Business.findByName = function (data, callback) {
    return userDao.findByName(data).notify(callback);
}

Business.findByStatus = function () {
    return userDao.findByStatus();
}

module.exports = Business;