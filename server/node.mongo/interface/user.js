/**
 * Created by zhuxijun on 16-4-14.
 */

var Inter = require('./gen/user');
var service = Inter.getService();
var inter = Inter.getInterface();

console.log(inter);

exports.service = service;
exports.Interface = inter;