/**
 * Created by zeqi on 2016/4/15.
 */



var grpc = require('grpc');

var PROTO_PATH = __dirname + '/../../../protos/user.proto';
var proto = grpc.load(PROTO_PATH).node_mongo;

module.exports =new proto.User('localhost:50051',
    grpc.credentials.createInsecure());