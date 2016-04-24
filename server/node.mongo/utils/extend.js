/**
 * Created by zeqi on 2016/4/23.
 */

Array.prototype.in_array = function (e) {
    this.fromCharCode = String.fromCharCode(2);
    var r = new RegExp(this.fromCharCode + e + this.fromCharCode);
    return (r.test(this.fromCharCode + this.join(this.fromCharCode) + this.fromCharCode));
};

module.exports = Array;