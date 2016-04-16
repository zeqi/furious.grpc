/**
 * Created by zhuxijun on 16-4-8.
 */

'use strict'

var Q = require('q');

class Base {
    constructor(model) {
        this.model = model;
    }

    save(data, callback) {
        if (Array.isArray(data)){
            return this.create(data,callback);
        }
        var self = this;
        return Q.Promise(function (resolve, reject) {
            var mod = new self.model(data);
            mod.save(function (err, doc) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(doc);
                }
            });
        }).nodeify(callback);
    }

    create(data, callback) {
        if (!Array.isArray(data)){
            data = [data];
        }
        var self = this;
        return Q.Promise(function (resolve, reject) {
            self.model.create(data, function (err, docs) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        }).nodeify(callback);
    }

    find(condition, callback) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            if (!condition) {
                condition = {};
            }
            self.model.find(condition)
                .exec(function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
        }).nodeify(callback);
    }

    findById(id, callback) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            if (!id) {
                reject('Invalid param:' + id);
            }
            self.model.findById(id)
                .exec(function (err, doc) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(doc);
                    }
                });
        }).nodeify(callback);
    }

    findOne(condition, callback) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            if (!condition) {
                condition = {};
            }
            self.model.findOne(condition)
                .exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
        }).nodeify(callback);
    }

    update(condition, callback) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            if (!condition) {
                reject('Invalid param:' + condition);
            }
            self.model.update(condition)
                .exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
        }).nodeify(callback);
    }

    findOneAndUpdate(condition, update, options, callback) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            if (!condition) {
                reject('Invalid param:' + condition);
            }
            self.model.findOneAndUpdate(condition, update, options)
                .exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
        }).nodeify(callback);
    }

    remove(condition, callback) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            if (!condition) {
                reject('Invalid param:' + condition);
            }
            self.model.remove(condition)
                .exec(function (err, docs) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
        }).nodeify(callback);
    }
}

module.exports = Base;