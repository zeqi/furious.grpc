/**
 * Created by zhuxijun on 16-4-8.
 */

'use strict'

var Q = require('q');

class Base {
    constructor(model) {
        this.model = model;
    }

    create(data) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            console.log(process.cwd());
            var mod = new self.model(data);
            mod.save(function (err, result) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log(result);
                    resolve(result);
                }
            });
        });
    }

    find(condition) {
        var self = this;
        return Q.Promise(function (resolve, reject) {
            console.log(process.cwd());
            self.model.find(condition)
                .exec(function (err, result) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        console.log(result);
                        resolve(result);
                    }
                });
        });
    }
}

module.exports = Base;