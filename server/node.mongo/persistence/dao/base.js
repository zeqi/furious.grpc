/**
 * Created by zhuxijun on 16-4-8.
 */

'use strict'

var Q = require('q');

var logger = require('../../utils/logger.js').getLogger("dao/base");

class DaoError {
    constructor(message, value, name, kind, path, reason) {
        this.message = message || 'Dao Error';
        this.value = value || '';
        this.name = name || 'DaoError';
        this.kind = kind || '';
        this.path = path || '';
        this.reason = reason || 'Dao Internal Error';
    }
}

class Base {
    constructor(model) {
        this.model = model;
        this.task = null;
        this.method = '';
    }

    taskError(task) {
        var self = this;
        new DaoError('Exec function ' + self.method + ' find invalid task:' + task, task)
    }

    paramError(param) {
        var self = this;
        new DaoError('Exec function ' + self.method + ' find invalid param:' + param, param)
    }

    execTask(task, callback) {
        var self = this;
        if (!task) {
            return Q.reject(self.taskError(task)).nodeify(callback);
        }
        return Q.Promise(function (resolve, reject) {
            task.exec(function (err, result) {
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

    save(data, callback) {
        if (Array.isArray(data)) {
            return this.create(data, callback);
        }
        var self = this;
        return Q.Promise(function (resolve, reject) {
            var mod = new self.model(data);
            mod.save(function (err, doc) {
                if (err) {
                    logger.error(self.method, 'Error:\n', err);
                    reject(err);
                } else {
                    logger.debug(self.method, 'Result:\n', doc);
                    resolve(doc);
                }
            });
        }).nodeify(callback);
    }

    create(data, callback) {
        this.method = 'create';
        var self = this;
        if (!Array.isArray(data)) {
            data = [data];
        }
        return Q.Promise(function (resolve, reject) {
            self.model.create(data,function (err, docs) {
                if (err) {
                    logger.error(self.method, 'Error:\n', err);
                    reject(err);
                } else {
                    logger.debug(self.method, 'Result:\n', docs);
                    resolve(docs);
                }
            });
        }).nodeify(callback);
    }

    find(condition, callback) {
        this.method = 'find';
        var self = this;
        if (!condition) {
            condition = {};
        }
        var task = self.model.find(condition);
        return self.execTask(task, callback).nodeify(callback);
    }

    findById(id, callback) {
        this.method = 'findById';
        var self = this;
        if (!id) {
            Q.reject(self.paramError(id)).nodeify(callback);
        }
        var task = self.model.findById(id);
        return self.execTask(task, callback).nodeify(callback);
    }

    findOne(condition, callback) {
        this.method = 'findOne';
        var self = this;
        if (!condition) {
            condition = {};
        }
        var task = self.model.findOne(condition);
        return self.execTask(task, callback).nodeify(callback);
    }

    update(condition, callback) {
        this.method = 'update';
        var self = this;
        if (!condition) {
            Q.reject(self.paramError(condition)).nodeify(callback);
        }
        var task = self.model.update(condition);
        return self.execTask(task, callback).nodeify(callback);
    }

    findOneAndUpdate(condition, update, options, callback) {
        this.method = 'findOneAndUpdate';
        var self = this;
        if (!condition) {
            Q.reject(self.paramError(condition)).nodeify(callback);
        }
        var task = self.model.findOneAndUpdate(condition, update, options);
        return self.execTask(task, callback).nodeify(callback);
    }

    remove(condition, callback) {
        this.method = 'remove';
        var self = this;
        if (!condition) {
            Q.reject(self.paramError(condition)).nodeify(callback);
        }
        var task = self.model.remove(condition);
        return self.execTask(task, callback).nodeify(callback);
    }
}

module.exports = Base;

module.exports.DaoError = DaoError;