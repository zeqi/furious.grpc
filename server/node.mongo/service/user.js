/**
 * Created by zhuxijun on 16-4-14.
 */

var grpc = require('grpc');

var logger = require('../utils/logger.js').getLogger("service/user");
var User = require('../business/user');

var PROTO_PATH = __dirname + '/../../../protos/user.proto';
var proto = grpc.load(PROTO_PATH).node_mongo;


exports.service = proto.User.service;
exports.Interface = {
    find: User.find,
    findByName: User.findByName
}