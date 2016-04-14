/**
 * Created by zhuxijun on 16-4-8.
 */

var Q = require('q');

function Base() {

}

Base.prototype.create=function(model,data) {
    return Q.Promise(function (resolve, reject) {
        var mod = new model(data);
        mod.save(function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log(result);
                resolve(result);
            }
        });
    });
}

module.exports = new Base();

