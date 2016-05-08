/**
 * Created by zeqi
 * @module business-->user
 * @auto-gen
 * Note: auto-gen code, NOT allowed to modify
 */

'use strict'

var BaseBusiness = require('../base');
var dao = require('../../persistence/dao/user');

class Business extends BaseBusiness {
    constructor() {
        super(dao);
    }

    findByName(name, callback) {
        return dao.findByName(name).nodeify(callback);
    }

    findByStatus(status, callback) {
        return dao.findByStatus(status).nodeify(callback);;
    }
}

module.exports = new Business();