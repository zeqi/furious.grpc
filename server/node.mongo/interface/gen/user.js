/**
 * Created by zeqi
 * @module interface-->user
 * @auto-gen
 * Note: auto-gen code, NOT allowed to modify
 */

'use strict'

var grpc = require('grpc');
var api = require('../../api/user');

var PROTO_PATH = __dirname + '/../../../../protos/user.proto';
var proto = grpc.load(PROTO_PATH).node_mongo;

var BaseInterface = require('../base');

class Interface extends BaseInterface {
    constructor() {
        super(proto, api)
    }

    getInterface() {
        var self = this;
        self.interfaceDic.findByName = self.api.findByName;
        self.interfaceDic.findByStatus = self.api.findByStatus;
        return self.interfaceDic;
    }

    getService() {
        return this.proto.User.service;
    }
}
module.exports = new Interface();