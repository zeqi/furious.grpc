/**
 * Created by zhuxijun on 16-4-8.
 */

'use strict'

var Q = require('q');

var model = require('../models/user').model;
var BaseDao = require('./baseTwo');

class Dao extends BaseDao {
    constructor() {
        super(model);
    }

    findByName(name, callback) {
        return Q.Promise(function (resolve, reject) {
            model.findByName(name, function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        }).nodeify(callback);
    }

    findByStatus(status, callback) {
        var dog = new model({status: status});
        return Q.Promise(function (resolve, reject) {
            dog.findByStatus(function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
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



