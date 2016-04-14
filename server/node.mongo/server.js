/**
 * Created by zhuxijun on 16-4-14.
 */

var mongoose = require('mongoose');
var grpc = require('grpc');

var logger = require('./utils/logger.js').getLogger("server");

var db = mongoose.connection;
db.on('error', function (err) {
    logger.error('cconnect mongodb err:',err);
    process.exit();
});
db.once('open', function callback() {
    logger.debug('mongodb ready!');
    var server = new grpc.Server();
    //============================================
    //          Grpc server interface
    //============================================

    var user = require('./service/user');
    server.addProtoService(user.service, user.Interface);
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
    logger.debug('service ready!');
});
mongoose.connect('mongodb://127.0.0.1:27017/go');