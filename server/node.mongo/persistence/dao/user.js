/**
 * Persistence dao for 
 * According to the module definition, Create a module dao for the module 
 * @module dao-->user
 * @auto-gen
 * Note: auto-gen code, NOT allowed to modify
 */

'use strict'

var Q = require('q');

var logger = require('../../utils/logger.js').getLogger("dao/user");
var BaseDao = require('./base');
var DaoError = BaseDao.DaoError;
var Model = require('../models/user');
var model = Model.model;
var schema = Model.schema;

/**
 * Mongodb data access portal of function
 */
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
        var task = self.model.findByName(name, callback);
        return self.execTask(task, callback, self.method).nodeify(callback);
    }

    findByStatus(status, callback) {
        this.method = 'findByStatus';
        var self = this;
        if (!status) {
            return Q.reject(self.paramError(status)).nodeify(callback);
        }
        var dog = new self.model({
            status: status
        });
        var task = dog.findByStatus(callback);
        return self.execTask(task, callback, self.method).nodeify(callback);
    }

    get NAME() {
        return 'UserDao';
    }
}

module.exports = new Dao();