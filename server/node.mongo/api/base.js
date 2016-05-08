/**
 * Created by zeqi
 * @module api-->base
 */

'use strict'

class Base {
    constructor(business, normalize, res, resCode) {
        this.business = business;
        this.normalize = normalize;
        this.res = res;
        this.resCode = resCode;
    }

    save(req, callback) {
        var self =this;
        return this.business.save(req.request).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    create(req, callback) {
        var self =this;
        return this.business.create(req.request.docs).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    find(req, callback) {
        var self =this;
        return this.business.find().then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        })
    }

    findById(req, callback) {
        var self =this;
        return this.business.findById(req.request.id).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    findOne(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.findOne(request.condition).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    findListAndCount(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.findListAndCount(request.condition, request.pageIndex, request.pageSize, request.sort).then(function (data) {
            try {
                return callback(null, new self.res.OK({list: self.normalize(data.list), count: data.count}));
            } catch (err) {
                console.log(err);
            }
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    count(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.count(request.condition || {}).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    update(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.update(request.condition || null, request.update || null, request.options || null).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    findByIdAndUpdate(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.findByIdAndUpdate(request.id, request.update, request.options).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    remove(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.remove(request.condition).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }

    findByIdAndRemove(req, callback) {
        var self =this;
        var request = req.request;
        return this.business.findByIdAndRemove(request.id, request.options, callback).then(function (data) {
            return callback(null, new self.res.OK(self.normalize(data)));
        }).fail(function (err) {
            return callback(null, new self.res.Error(self.resCode.res201, err.message));
        });
    }
}


module.exports = Base;