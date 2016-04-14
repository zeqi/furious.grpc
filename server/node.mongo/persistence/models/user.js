/**
 * Created by zhuxijun on 16-4-8.
 */

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({

    mobile: String,
    name: String,
    status: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: Number,
        default: 0
    },
}, {
    collection: 'user'
});

Schema.statics.findByName = function (name, cb) {
    this.find({ name: new RegExp(name, 'i') }, cb);
    //this.find({ name: name }, cb);
}

Schema.methods.findByStatus = function (cb) {
    return this.model('user').find({ status: this.status }, cb);
}

module.exports.schema = Schema;
module.exports.model = mongoose.model('user', Schema);




