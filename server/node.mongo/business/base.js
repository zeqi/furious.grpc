/**
 * Created by zeqi
 * @module business-->base
 */

'use strict'

class Base {
    constructor(dao) {
        this.dao = dao;
    }

    /**
     *  Create a record
     * @param doc <object>  use object
     * @param callback <function>  call back
     * @returns {*} <promise>  Created record object
     */
    save(doc, callback) {
        return this.dao.save(doc).nodeify(callback);
    }

    /**
     *  Create records
     * @param docs <object>  record object list
     * @param callback function>  call back
     * @returns {*} <promise>  Created record object list
     */
    create(docs, callback) {
        return this.dao.create(docs).nodeify(callback);
    }

    /**
     *  Get records by params condition
     * @param condition <object>  Containing record attributes as condition
     * @param pageIndex <number>  Current page index, default:1
     * @param pageSize <number>  Current page size, default:10
     * @param sort <object>  Used to sort
     * @param callback <function>  call back
     * @returns {*} <promise>  record object list
     */
    find(condition, pageIndex, pageSize, sort, callback) {
        return this.dao.find(condition, pageIndex, pageSize, sort).nodeify(callback);
    }

    /**
     *  Get a record by record id
     * @param id <string>  current record id
     * @param callback <function>  call back
     * @returns {*} <promise>  record object
     */
    findById(id, callback) {
        return this.dao.findById(id).nodeify(callback);
    }

    /**
     *  Get a record object by current condition
     * @param condition <object>  Containing record attributes as condition
     * @param callback <function>  call back
     * @returns {*} <promise>  record object
     */
    findOne(condition, callback) {
        return this.dao.findOne(condition).nodeify(callback);
    }

    /**
     *  Get records object and records count by params condition
     * @param condition <object>  Containing record attributes as condition
     * @param pageIndex <number>  Current page index, default:1
     * @param pageSize <number>  Current page size, default:10
     * @param sort <object>  Used to sort
     * @param callback <function>  call back
     * @returns {*} <promise>  Containing two attributes of the record list and count
     */
    findListAndCount(condition, pageIndex, pageSize, sort, callback) {
        return this.dao.findListAndCount(condition, pageIndex, pageSize, sort).nodeify(callback);
    }

    /**
     *  Get count by condition
     * @param condition <object>   Containing record attributes as condition
     * @param callback <function>  call back
     * @returns {*} <promise>  a number
     */
    count(condition, callback) {
        return this.dao.count(condition).nodeify(callback);
    }

    /**
     *  According to the condition update to the records
     * @param condition <object>  Containing record attributes as condition
     * @param update <object>  Need to update those properties
     * @param options <object>  Optional condition
     * @param callback <function>  call back
     * @returns {*} <promise>  Object being updated
     */
    update(condition, update, options, callback) {
        return this.dao.update(condition, update, options).nodeify(callback);
    }

    /**
     *  Get current prams id find a record object and update related attributes
     * @param id <string>  record id
     * @param update <object>   Need to update those properties
     * @param callback <function>  call back
     * @returns {*} <promise>  Object being updated
     */
    findByIdAndUpdate(id, update, options, callback) {
        return this.dao.findByIdAndUpdate(id, update, options).nodeify(callback);
    }

    /**
     *  Delete the corresponding conditions of the record
     * @param condition <object>  Containing record attributes as condition
     * @param callback <function>  call back
     * @returns {*} <promise>  deleted object
     */
    remove(condition, callback) {
        return this.dao.remove(condition).nodeify(callback);
    }

    /**
     *  According to the id remove this record
     * @param id <string>  record id
     * @param options <object>  Optional condition
     * @param callback <function>  call back
     * @returns {*} <promise>  deleted object
     */
    findByIdAndRemove(id, options, callback) {
        return this.dao.findByIdAndRemove(id, options, callback).nodeify(callback);
    }
}


module.exports = Base;