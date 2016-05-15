var grpc = require('grpc');

var PROTO_PATH = __dirname + '/../../../protos/user.proto';
var proto = grpc.load(PROTO_PATH).node_mongo;

//console.log(grpc);
//console.log(proto);
/*console.log(proto);

console.log(grpc.callError);
console.log(grpc.propagate);
console.log(grpc.status);*/

console.log(new proto.Res());

/*console.log(new proto.Msg(111, '22222'));
console.log(new proto.Res());*/

//console.log(new proto.Req_Doc());
/*console.log(new proto.Res_Doc());
console.log(new proto.Res_Docs());
console.log(new proto.Res_Docs_count(1, 2, '3333', {list: [], count: 0}));*/
//console.log(eachAttributes(proto.Res_Doc));

module.exports.proto = proto;
var api = new proto.User('localhost:50051', grpc.credentials.createInsecure());
console.log(api.$channel);
api.$channel.getConnectivityState(function (state) {
    console.log(state);
});
/*api.$channel.watchConnectivityState(function (state) {
    console.log(state);
});*/    
module.exports.api = api;