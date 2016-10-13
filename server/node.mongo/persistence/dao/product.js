/**
 * @description Operation database dao for product module
 * @module dao-->product
 */

'use strict'

var model = require('../models/product').model;
var BaseDao = require('./base');

/**
 * @description product dao
 * @example
 * var dao = new Dao();
 * @class
 * @extends {BaseDao}
 * @see The <a href="module-dao--_base-Base.html">module-dao--_base-Base.html</a >.
 */
class Dao extends BaseDao {
    /**
     * @constructor
     */
    constructor() {
        super(model);
    }

    /**
     *
     * @returns {string}
     */
    get NAME() {
        return 'ProductDao';
    }
}

module.exports = new Dao();