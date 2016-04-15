/**
 * Created by zhuxijun on 16-4-15.
 */

function setNormalizeModel(obj) {
    if (typeof obj === 'object' && obj._doc) {
        var doc = obj._doc;
        for (var item in doc) {
            if (typeof doc[item] != 'function') {
                if (typeof doc[item] === 'object') {
                    doc[item] = doc[item].toString();
                }
            }
        }
        return doc;
    }
    return obj;
}

module.exports = function (obj) {
    if (typeof obj === 'object') {
        if (!Array.isArray(obj)) {
            return setNormalizeModel(obj);
        }
        else {
            var arr = [];
            obj.forEach(function (item) {
                arr.push(setNormalizeModel(item));
            });
            return arr;
        }
    }
    return obj;
}
