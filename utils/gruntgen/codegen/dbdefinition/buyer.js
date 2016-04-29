/**
 * Created by zhuxijun on 16-4-13.
 * The db definitions for buyer
 * The content include 4 parts:
 * [1] module info
 * [2] db-model info
 * [3] dao-class info
 * [4] router-info
 */

exports.info = {

    //===========================================
    //              Module Info
    //===========================================

    moduleName: 'buyer',

    collectionName: 'sys.buyer',

    dataSourceName: 'NongheDataSource',

    //===========================================
    //          MongoDB Model
    //===========================================

    schemaName: 'BuyerSchema',

    moduleNamePrefix: 'ec',

    modelName: 'BuyerModel',

    'schema-desc': 'Mongoose database schema for e-commerce buyer.',

    // the "comma: true" is used to control the format of output source
    // comma: true, means append a "," at the line of source code for current item
    // false, will not generate a "," at the current source line
    schema: [
        {
            'name': 'name',
            'type': 'String',
            'required': true,
            'description': '采购商名称  Mapping original --> think_buyers.name ',
            comma: true
        },
        {
            'name': 'headimgurl',
            'type': 'String',
            'required': true,
            'description': '采购商头像',
            comma: true
        },
        {
            'name': 'owner',
            'type': 'Schema.Types.ObjectId',
            'required': true,
            'description': '采购商管理员标识  Mapping original --> think_buyers.id -> think_auth.id -> think_auth.account -> _id',
            comma: true
        },
        {
            'name': 'region',
            'type': 'String',
            'required': true,
            'description': '所在区域，三级选择  Mapping original --> think_buyers.province',
            comma: true
        },
        {
            'name': 'location',
            'type': 'String',
            'required': true,
            'description': '地址  Mapping original --> think_buyers.address',
            comma: true
        },
        {
            'name': 'zipcode',
            'type': 'String',
            'required': false,
            'description': '邮编  Mapping original --> think_buyers.zip',
            comma: true
        },
        {
            'name': 'purchasingIntents',
            'type': '[String]',
            'required': true,
            'description': '采购方向    Mapping original -->	think_buyers.products',
            comma: true
        },
        {
            'name': 'telephone',
            'type': 'String',
            'required': true,
            'description': '联系电话   Mapping original --> think_buyers.comtel',
            comma: true
        },
        {
            'name': 'website',
            'type': 'String',
            'required': true,
            'description': '采购商网站   Mapping original --> think_buyers.website',
            comma: true
        },
        {
            'name': 'description',
            'type': 'String',
            'required': true,
            'description': '采购商简介   Mapping original --> think_buyers.note',
            comma: true
        },
        {
            'name': 'businessLicenseImage',
            'type': '{\n' +
            'serverId: String,  //server id.\n' +
            'image: {\n' +
            'url: String,\n' +
            'width: Number,\n' +
            'height: Number\n' +
            '},\n' +
            'thumbnail: {\n' +
            'url: String,\n' +
            'width: Number,\n' +
            'height: Number\n' +
            '}\n' +
            '}',
            'required': true,
            'description': '营业执照扫描件',
            comma: true
        },
        {
            'name': 'status',
            'type': '{type: String, default: "registered"}',
            'required': true,
            'description': 'String	状态(inactive, registered, submitted, certified, certificationRejected, deleted)   Mapping original --> think_company.status，0-"283696"，1-"379"，2-"21"',
            comma: true
        },
        {
            'name': 'sourceType',
            'type': 'String',
            'required': true,
            'description': '来源   Mapping original --> utm_source',
            comma: true
        },
        {
            'name': 'sourceDetail',
            'type': 'Schema.Types.Mixed',
            'required': true,
            'description': '来源详情   Mapping original --> think_company.addtime.  ' +
            'MABY:{' +
            'utm_medium: String,' +
            'utm_channel: String,' +
            'utm_campaign: String,' +
            'utm_term: String' +
            '}',
            comma: true
        },
        {
            'name': 'createTime',
            'type': '{type: Date, default: Date.now}',
            'required': false,
            'description': '创建时间   Mapping original --> think_company.addtime',
            comma: true
        },
        {
            'name': 'updateTime',
            'type': '{type: Date, default: Date.now}',
            'required': false,
            'description': '更新时间   Mapping original --> think_company.edittime',
            comma: true
        },
        {
            'name': 'activateTime',
            'type': 'Date',
            'required': false,
            'description': '激活时间   Mapping original --> think_company.edittime',
            comma: true
        },
        {
            'name': 'note',
            'type': 'String',
            'required': false,
            'description': '备注   Mapping original --> think_company.note + think_company.note2',
            comma: false
        }
    ],

    'getDataType': function () {
        if ('string' === typeof this.type) return this.type;

        if ('object' === typeof this.type) return JSON.stringify(this.type);

        return '';
    },

    'getNormalizePath': function () {
        if (this.path) {
            if (this.path.replace(/^(.*[n])*.*(.|n)$/g, "$2") != '/') {
                this.path += '/';
            }
            return this.path;
        }
        return '';
    },

    //===========================================
    //              DAO Class Definition
    //===========================================

    daoClassName: 'BuyerDAO',

    'dao-desc': 'Database Access Object for e-commerce Buyer',

    isCacheable: true,

    maxCacheSize: 0,

    createMethodGen: true,

    countMethodGen: true,

    retrieveByConditionMethodGen: true,

    deleteByKeyMethods: [{key: '_id', methodSignature: 'Uid'}],

    retrieveByKeyMethods: [{key: '_id', methodSignature: 'Uid'}],

    updateByKeyMethods: [{key: '_id', methodSignature: 'Uid', upsert: false}],

    updateByCondition: true,

    //===========================================
    //            Router Class Definition
    //===========================================
    routeClassName: 'BuyerRouter',

    basePath: 'buyers',

    isRegister: true,

    'route-desc': 'Express Router class for e-commerce Buyer',

    RestfulCreateMethodGen: {
        annotations: [
            '@api {POST} /messages Create a buyer',
            '@apiName CreateBuyer',
            '@apiGroup Buyer',
            '@apiVersion 1.0.0',
            '@apiDescription Create a buyer definition',
            '@apiSuccess (200) {buyer} buyer The new buyer',
            '@apiError AccessDenied Only authenticated user can perform this API',
            '@apiError IncorrectDataFormat   The buyer definition missing required fields',
            '@apiErrorExample Response (example):\n' +
            '    HTTP/1.1 401 Not Authenticated\n' +
            '      {\n' +
            '        "error": "NotAuthenticated"\n' +
            '      }',
            '@apiExample {curl} Example usage(note: please replace {...} with your test data before run the command):\n' +
            '  curl -H "Content-Type: application/json" -X POST -d \'{...}\' http://localhost:8000/buyers'
        ]
    },
    RestfulGetByConditionMethodGen: {
        annotations: [
            '@api {GET} /buyers?...&skip=..&&limit=..&&sort=.. Get buyers(s) by condition',
            '@apiName GetBuyerByCondition',
            '@apiGroup Buyer',
            '@apiVersion 1.0.0',
            '@apiDescription Get buyer(s) by condition',
            '@apiParam {Number} skip skip records count',
            '@apiParam {Number} limit the response records count limit',
            '@apiSuccess (201) {buyer[]} buyers The buyers match the conditions',
            '@apiError AccessDenied Only authenticated user can perform this API',
            '@apiErrorExample Response (example):\n' +
            '    HTTP/1.1 401 Not Authenticated\n' +
            '      {\n' +
            '        "error": "NotAuthenticated"\n' +
            '      }',
            '@apiExample {curl} Example usage:\n' +
            '  curl -i http://localhost:8000/messages?skip=0&limit=10'
        ]
    },
    RestfulDeleteByKeyMethods: [{
        key: '_id', methodSignature: 'Uid', paramName: 'id', annotations: [
            '@api {DELETE} /messages/:id Delete buyer definition by unique id',
            '@apiName DeleteBuyerByUid',
            '@apiGroup Buyer',
            '@apiVersion 1.0.0',
            '@apiDescription Delete buyer by unique id',
            '@apiParam {String} id buyer unique id',
            '@apiSuccess (200) {Boolean} isDeleted ',
            '@apiError AccessDenied Only authenticated user can perform this API',
            '@apiErrorExample Response (example):\n' +
            '    HTTP/1.1 401 Not Authenticated\n' +
            '      {\n' +
            '        "error": "NotAuthenticated"\n' +
            '      }',
            '@apiExample {curl} Example usage(note: please replace {...} with your test data before run the command):\n' +
            '  curl -H "Content-Type: application/json" -X DELETE http://localhost:8000/messages/11111111111111'
        ]
    }],
    RestfulUpdateByKeyMethods: [{
        key: '_id', methodSignature: 'Uid', paramName: 'id', annotations: [
            '@api {PUT} /messages/:id Update entire buyer definition by unique id',
            '@apiName UpdateBuyerByUid',
            '@apiGroup Buyer',
            '@apiVersion 1.0.0',
            '@apiDescription Update entire buyer by unique id',
            '@apiParam {String} id buyer unique id',
            '@apiSuccess (200) {buyer} buyer The updated buyer',
            '@apiError AccessDenied Only authenticated user can perform this API',
            '@apiErrorExample Response (example):\n' +
            '    HTTP/1.1 401 Not Authenticated\n' +
            '      {\n' +
            '        "error": "NotAuthenticated"\n' +
            '      }',
            '@apiExample {curl} Example usage(note: please replace {...} with your test data before run the command):\n' +
            '  curl -H "Content-Type: application/json" -X PUT -d \'{...}\' http://localhost:8000/messages/11111111111111'
        ]
    }],
    RestfulGetByKeyMethods: [{
        key: '_id', methodSignature: 'Uid', paramName: 'id', annotations: [
            '@api {GET} /messages/:id Get buyer by unique id',
            '@apiName GetBuyerByUid',
            '@apiGroup Buyer',
            '@apiVersion 1.0.0',
            '@apiDescription Get buyer by unique id',
            '@apiParam {String} id buyer unique id',
            '@apiSuccess (200) {buyer} buyer The buyer match with given unique id',
            '@apiError AccessDenied Only authenticated user can perform this API',
            '@apiErrorExample Response (example):\n' +
            '    HTTP/1.1 401 Not Authenticated\n' +
            '      {\n' +
            '        "error": "NotAuthenticated"\n' +
            '      }',
            '@apiExample {curl} Example usage:\n' +
            '  curl -i http://localhost:8000/messages/11111111111111'
        ]
    }]
};



