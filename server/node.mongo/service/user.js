/**
 * Created by zhuxijun on 16-4-14.
 */

var grpc = require('grpc');

var logger = require('../utils/logger.js').getLogger("service/user");
var UserApi = require('../api/user');

var PROTO_PATH = __dirname + '/../../../protos/user.proto';
var proto = grpc.load(PROTO_PATH).node_mongo;

function sayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
}

exports.service = proto.User.service;
exports.Interface = {
    sayHello: sayHello,
    find: UserApi.find,
    findByName: UserApi.findByName
}