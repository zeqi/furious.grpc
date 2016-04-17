/**
 * Created by zhuxijun on 16-4-8.
 */

'use strict'

var Q = require('q');

var logger = require('../../utils/logger.js').getLogger("dao/user");
var model = require('../models/user').model;
var BaseDao = require('./base');
var DaoError = BaseDao.DaoError;

class Dao extends BaseDao {
    constructor() {
        super(model);
    }

    findByName(name, callback) {
        this.method = 'findByName';
        var self = this;
        if (!name) {
            return Q.reject(self.paramError(name)).nodeify(callback);
        }
        return Q.Promise(function (resolve, reject) {
            model.findByName(name, function (err, result) {
                if (err) {
                    logger.error(self.method, 'Error:\n', err);
                    reject(err);
                } else {
                    logger.debug(self.method, 'Result:\n', result);
                    resolve(result);
                }
            });
        }).nodeify(callback);
    }

    findByStatus(status, callback) {
        this.method = 'findByStatus';
        var self = this;
        if (!status) {
            return Q.reject(self.paramError(status));
        }
        var dog = new model({status: status});
        return Q.Promise(function (resolve, reject) {
            dog.findByStatus(function (err, result) {
                if (err) {
                    logger.error(self.method, 'Error:\n', err);
                    reject(err);
                } else {
                    logger.debug(self.method, 'Result:\n', result);
                    resolve(result);
                }
            });
        }).nodeify(callback);
    }

    get NAME() {
        return 'UserDao';
    }
}

module.exports = new Dao();



