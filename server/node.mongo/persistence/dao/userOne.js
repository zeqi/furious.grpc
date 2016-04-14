/**
 * Created by zhuxijun on 16-4-8.
 */

var UserModel = require('../models/user').model;
var BaseDao = require('./baseOne');

function Dao() {

}

Dao.prototype.create = function (user) {
    return BaseDao.create(UserModel, user);
}

module.exports = new Dao();

