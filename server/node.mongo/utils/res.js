/**
 * Created by zhuxijun on 16-4-14.
 */

function Enum() {

}

Enum.resStatus = {
    Unknown: 0,
    OK: 1,
    Error: 2,
    WANING: 3
}

Enum.resCode = {
    res200: 200,
    res201: 201,
    res300: 300,
    res500: 500
}

function comm() {

}

comm.result = function (data, status, code, msg) {
    this.data = data || {};
    this.status = status || Enum.resStatus.OK;
    this.code = code || Enum.resCode.res200;
    this.msg = msg || "";
}

comm.serializePre = function (data) {
    return "<pre>" + JSON.stringify(data, null, 4) + "</pre>";
}

module.exports = comm;