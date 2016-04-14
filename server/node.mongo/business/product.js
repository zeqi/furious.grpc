/**
 * Created by zhuxijun on 16-4-8.
 */

var productDao = require('../persistence/dao/product');

function Business() {

}

Business.create = function (data) {
    return productDao.create(data);
}

module.exports = Business;