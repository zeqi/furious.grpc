/**
 * Created by zhuxijun on 16-4-8.
 */

var userDao = require('../persistence/dao/userTwo');

function Business() {

}

Business.create = function (data) {
    return userDao.create(data);
}

Business.find = function () {
    var data = {};
    return userDao.find(data);
}

Business.findByCondition = function (data) {
    var data = {name: data};
    return userDao.find(data);
}

Business.findByName = function (data) {
    return userDao.findByName(data);
}

Business.findByStatus = function () {
    return userDao.findByStatus();
}

module.exports = Business;