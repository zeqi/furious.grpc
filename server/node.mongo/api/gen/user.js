/**
 * Created by zeqi
 * @module api-->user
 * @auto-gen
 * Note: auto-gen code, NOT allowed to modify
 */

'use strict'

var BaseApi = require('../base');
var business = require('../../business/user');

var normalize = require('../../utils/normalize');
var res = require('../../utils/res');
var resCode = require('../../define/resCode');

class Api extends BaseApi {
    constructor() {
        super(business, normalize, res, resCode);
    }

    findByName(req, callback) {
        var self = this;
        var request = req.request;
        return self.business.findByName(request.name).then(function(data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function(err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    findByStatus(req, callback) {
        var self = this;
        var request = req.request;
        return self.business.findByStatus(request.status).then(function(data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function(err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }
}

module.exports = new Api();