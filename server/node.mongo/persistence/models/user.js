/**
 * Persistence model for 
 * Mongoose database schema for user.
 * @module model-->user
 * @auto-gen
 * Note: auto-gen code, NOT allowed to modify
 */

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({

    /**
     * Property definition - mobile
     * User current use phone number, Do not repeat in the collection or table
     */
    mobile: String,

    /**
     * Property definition - name
     * User name
     */
    name: String,

    /**
     * Property definition - status
     * Current user status active|verified
     */
    status: {
        type: Number,
        default: 0
    },

    /**
     * Property definition - gender
     * Current user gender 0:未知,1:男.2:女
     */
    gender: {
        type: Number,
        default: 0
    },

    /**
     * Property definition - createTime
     * Current user create time
     */
    createTime: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'user'
});

/**
 * Get User by name
 * @param cb <function>  call back
 * @returns {*|Query}
 */
Schema.statics.findByName = function(name, cb) {
    return this.find({
        name: new RegExp(name, 'i')
    }, cb);
}

/**
 * Get User by status
 * @param cb <function>  call back
 * @returns {*|Query}
 */
Schema.methods.findByStatus = function(cb) {
    return this.model('user').find({
        status: this.status
    }, cb);
}

module.exports.schema = Schema;
module.exports.model = mongoose.model('user', Schema);