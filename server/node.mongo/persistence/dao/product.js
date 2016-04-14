/**
 * Created by zhuxijun on 16-4-8.
 */

'use strict'

var model = require('../models/product').model;
var BaseDao = require('./baseTwo');

class Dao extends BaseDao {
    constructor() {
        super(model);
    }

    get NAME() {
        return 'ProductDao';
    }
}

module.exports = new Dao();