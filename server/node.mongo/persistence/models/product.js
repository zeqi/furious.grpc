/**
 * Created by zhuxijun on 16-4-8.
 */

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({

    name: String,
    status: {
        type: Number,
        default: 0
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        default: 0
    }
}, {
    collection: 'product'
});

module.exports.schema = Schema;
module.exports.model = mongoose.model('product', Schema);