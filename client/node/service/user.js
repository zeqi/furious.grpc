/**
 * Created by zeqi on 2016/4/15.
 */



var grpc = require('grpc');

var PROTO_PATH = __dirname + '/../../../protos/user.proto';
var proto = grpc.load(PROTO_PATH).node_mongo;

//console.log(grpc);

function eachAttributes(doc) {
    for (var item in doc) {
      console.log(item);
    }
}
console.log(new proto.Req_Doc());
console.log(new proto.Res_Doc());
console.log(new proto.Res_Docs());
//console.log(eachAttributes(proto.Res_Doc));

/*var api;
function setApi() {
    console.log(api);
    if (api) {
        return api;
    }
    var _api = new proto.User('localhost:50051',
        grpc.credentials.createInsecure());
    console.log(_api);
    return _api;
}*/

module.exports.Proto = proto;
module.exports.Api = new proto.User('localhost:50051',
    grpc.credentials.createInsecure());