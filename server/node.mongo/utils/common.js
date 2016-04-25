/**
 * Created by zhuxijun on 16-4-25.
 */

Array.prototype.S = String.fromCharCode(2);
Array.prototype.inArray = function (e) {
    var r = new RegExp(this.S + e + this.S);
    return (r.test(this.S + this.join(this.S) + this.S));
};

function getMatchAttributes(obj, attri, matchValue, assignmentFun) {

    if (!obj) {
        return;
    }

    var filterType = ['string', 'number'];
    var type = typeof obj;

    if (type == 'object') {
        for (var item in obj) {
            if ((attri && matchValue && item == attri && obj[item] == matchValue) || (attri && item == attri) || (matchValue && obj[item] == matchValue)) {
                obj[item] = assignmentFun(obj[item]);
                console.log(obj[item]);
            }
            if (!filterType.inArray(typeof obj[item])) {
                getMatchAttributes(obj[item], attri, matchValue, assignmentFun);
            }
        }
    }
}

module.exports.getMatchAttributes = getMatchAttributes;

/*
var businessLicenseImage = {
    "image": {
        "fieldname": "uploadfile",
        "originalname": "splash.jpg",
        "url": "sns/LByEYKswEfe-d-BY3iUpT9D_mthNobga.jpg",
        "item": {
            "tttttt": '11111',
            "url": 'ggdddsagddssskk02008kkku2.png',
            'hhhh': null
        }
    },
    "thumbnail": {
        "fieldname": "uploadfile",
        "originalname": "splash.jpg",
        "url": "sns/LByEYKswEfe-d-BY3iUpT9D_mthNobga_thumbnail.jpg",
        "width": 300,
        "height": 269
    },
    "url": "wwwwwwwwwwwwwwww"
}

var CORPORATION_IMAGE_BASE_URL = 'http://repos.nonghequan.com/images/';
function attributeAssignment(val) {
    val = CORPORATION_IMAGE_BASE_URL + val;
    return val;
}

getMatchAttributes(businessLicenseImage, 'url', null, attributeAssignment);

console.log(businessLicenseImage);
*/
