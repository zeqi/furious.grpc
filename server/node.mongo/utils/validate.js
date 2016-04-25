/**
 * Created by zeqi on 2016/4/23.
 */

'use strict'

//var Array = require('./validate');

Array.prototype.inArray = function (e) {
    this.fromCharCode = String.fromCharCode(2);
    var r = new RegExp(this.fromCharCode + e + this.fromCharCode);
    return (r.test(this.fromCharCode + this.join(this.fromCharCode) + this.fromCharCode));
};

class Validate {
    constructor() {
        this.type;
    }

    isValidateType(args, type) {
        var self = this;
        if (args.length < 1) {
            return false;
        }
        if (type) {
            self.type = type;
        }
        if (!self.type) {
            return false;
        }
        var types;
        if (!Array.isArray(self.type)) {
            types = [self.type];
        }else {
            types = self.type;
        }

        for (var item in args) {
            if (!(types.inArray(typeof args[item]))) {
                return false;
            }
        }
        return true;
    }

    isString() {
        var self = this;
        self.type = 'string';
        return self.isValidateType(arguments);

    }

    isNumber() {
        var self = this;
        self.type = 'number';
        return self.isValidateType(arguments);

    }

    isObject() {
        var self = this;
        self.type = 'object';
        return self.isValidateType(arguments);
    }

}
var validate = new Validate();

/*var isdata = {};
console.log(validate.isNumber(1111));*/

module.exports = validate;



