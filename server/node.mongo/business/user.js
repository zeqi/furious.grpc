/**
 * Created by zeqi
 * @module business-->user
 * @auto-gen
 * Note: auto-gen code, NOT allowed to modify
 */

var userDao = require('../persistence/dao/user');

function Business() {

}

/**
 *  Create a user record
 * @param doc <object>  use object
 * @param callback <function>  call back
 * @returns {*} <promise>  Created user object
 */
Business.save = function(doc, callback) {
    return userDao.save(doc).nodeify(callback);
}

/**
 *  Create a number of user record
 * @param docs <object>  user object list
 * @param callback function>  call back
 * @returns {*} <promise>  Created user object list
 */
Business.create = function(docs, callback) {
    return userDao.create(docs).nodeify(callback);
}

/**
 *  Get users by params condition
 * @param condition <object>  Containing user attributes as condition
 * @param pageIndex <number>  Current page index, default:1
 * @param pageSize <number>  Current page size, default:10
 * @param sort <object>  Used to sort
 * @param callback <function>  call back
 * @returns {*} <promise>  user object list
 */
Business.find = function(condition, pageIndex, pageSize, sort, callback) {
    return userDao.find(condition, pageIndex, pageSize, sort).nodeify(callback);
}

/**
 *  Get a user by user id
 * @param id <string>  current user id
 * @param callback <function>  call back
 * @returns {*} <promise>  user object
 */
Business.findById = function(id, callback) {
    return userDao.findById(id).nodeify(callback);
}

/**
 *  Get a user object by current condition
 * @param condition <object>  Containing user attributes as condition
 * @param callback <function>  call back
 * @returns {*} <promise>  user object
 */
Business.findOne = function(condition, callback) {
    return userDao.findOne(condition).nodeify(callback);
}

/**
 *  Get users object and users count by params condition
 * @param condition <object>  Containing user attributes as condition
 * @param pageIndex <number>  Current page index, default:1
 * @param pageSize <number>  Current page size, default:10
 * @param sort <object>  Used to sort
 * @param callback <function>  call back
 * @returns {*} <promise>  Containing two attributes of the user list and count
 */
Business.findListAndCount = function(condition, pageIndex, pageSize, sort, callback) {
    return userDao.findListAndCount(condition, pageIndex, pageSize, sort).nodeify(callback);
}

/**
 *  Get count by condition
 * @param condition <object>   Containing user attributes as condition
 * @param callback <function>  call back
 * @returns {*} <promise>  a number
 */
Business.count = function(condition, callback) {
    return userDao.count(condition).nodeify(callback);
}

/**
 *  According to the condition update to the records
 * @param condition <object>  Containing user attributes as condition
 * @param update <object>  Need to update those properties
 * @param options <object>  Optional condition
 * @param callback <function>  call back
 * @returns {*} <promise>  Object being updated
 */
Business.update = function(condition, update, options, callback) {
    return userDao.update(condition, update, options).nodeify(callback);
}

/**
 *  Get current prams id find a user object and update related attributes
 * @param id <string>  user id
 * @param update <object>   Need to update those properties
 * @param callback <function>  call back
 * @returns {*} <promise>  Object being updated
 */
Business.findByIdAndUpdate = function(id, update, callback) {
    return userDao.findByIdAndUpdate(id, update).nodeify(callback);
}

/**
 *  Delete the corresponding conditions of the user
 * @param condition <object>  Containing user attributes as condition
 * @param callback <function>  call back
 * @returns {*} Object deleted
 */
Business.remove = function(condition, callback) {
    return userDao.remove(condition).nodeify(callback);
}

Business.findByName = function(name, callback) {
    return userDao.findByName(name).nodeify(callback);
}

Business.findByStatus = function(status, callback) {
    return userDao.findByStatus(status).nodeify(callback);;
}
module.exports = Business;