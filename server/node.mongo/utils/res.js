/**
 * Created by zhuxijun on 16-4-14.
 */

var resCode = require('../define/resCode');

var resStatus = {
    Unknown: 0,
    OK: 1,
    Error: 2,
    WANING: 3
}

function Result(data, status, code, msg) {
    this.data = data || null;
    this.status = status || resStatus.OK;
    this.code = code || resCode.res200;
    this.msg = msg || "";
}

function res(data, status, code, msg) {
    Result.call(this,data, status, code, msg);
}

res.OK = function (data, msg) {
    Result.call(this, data, resStatus.OK, resCode.res200, msg);
}

res.Error = function (code, msg) {
    Result.call(this, null, resStatus.Error, code, msg);
}

res.pre = function (data) {
    return "<pre>" + JSON.stringify(data, null, 4) + "</pre>";
}

module.exports = res;