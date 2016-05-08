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
        super(business);
    }

    findByName(req, callback) {
        var request = req.request;
        return business.findByName(request.name).then(function(data) {
            return callback(null, new res.OK(normalize(data)));
        }).fail(function(err) {
            return callback(null, new res.Error(resCode.res201, err.message));
        });
    }

    findByStatus(req, callback) {
        var request = req.request;
        return business.findByStatus(request.status).then(function(data) {
            return callback(null, new res.OK(normalize(data)));
        }).fail(function(err) {
            return callback(null, new res.Error(resCode.res201, err.message));
        });
    }
}

module.exports = new Api();