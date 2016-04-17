/**
 * Created by zhuxijun on 16-4-15.
 */

var user = require('../business/user');
var normalize = require('../utils/normalize');
var res = require('../utils/res');
var resCode = require('../define/resCode');

function api() {

}

api.save = function (req, callback) {
    return user.save(req.request).then(function (data) {
        return callback(null, new res.OK(normalize(data)));
    }).fail(function (err) {
        return callback(null, new res.Error(resCode.res201, err.message));
    });
}

api.create = function (req, callback) {
    return user.create(req.request.docs).then(function (data) {
        return callback(null, new res.OK(normalize(data)));
    }).fail(function (err) {
        return callback(null, new res.Error(resCode.res201, err.message));
    });
}

api.find = function (req, callback) {
    return user.find().then(function (data) {
        return callback(null, new res.OK(normalize(data)));
    }).fail(function (err) {
        return callback(null, new res.Error(resCode.res201, err.message));
    });
}

api.findById = function (req, callback) {
    return user.findById(req.request.id,function (err,doc) {
        if (err){
            return callback(null, new res.Error(resCode.res201, err.message));
        }
        var result = new res.OK(normalize(doc));
        return callback(null,result);
    });
}

/*api.findById = function (req, callback) {
    return user.findById(req.request.id).then(function (data) {
        try {
            var result = new res.OK(normalize(data));
            return callback(null,result);
        } catch (err) {
            console.log(err);
        }
    }).fail(function (err) {
        return callback(null, new res.Error(resCode.res201, err.message));
    });
}*/

api.findByName = function (req, callback) {
    return user.findByName(req.request).then(function (data) {
        return callback(null, new res.OK(normalize(data)));
    }).fail(function (err) {
        return callback(null, new res.Error(resCode.res201, err.message));
    });
}

api.findByCondition = function (req, callback) {
    return user.find(req.request).then(function (data) {
        return callback(null, new res.OK(normalize(data)));
    }).fail(function (err) {
        return callback(null, new res.Error(resCode.res201, err.message));
    });
}

api.findByStatus = function () {
    return user.findByStatus();
}

module.exports = api;
