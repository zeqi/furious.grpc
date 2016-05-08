/**
 * Data service agent
 *
 * @module services/data
 *
 */
var http = require('http');
var configUtil = require('../utils/configUtil');
var agent = require('superagent');
var Q = require('q');
var logger = require('../utils/logger').getLogger('services/data');

var METHOD_GET = 'get';
var METHOD_POST = 'post';
var METHOD_PUT = 'put';
var METHOD_DELETE = 'delete';
var METHOD_PATCH = 'patch';

var nonghe_platform_name = 'nonghe_platform_name';

/**
 * Execute data service with specified verb and return the corresponding result.
 *
 * @function
 * @return {Promise} promise to return the result.
 *
 */
exports.execute = function (verb, path, payload, userId, req) {

    var method = 'execute';
    logger.debug(method, 'Entry', verb, path);

    var url = configUtil.getDSUrl() + path;
    logger.debug(method, 'Url:', url);

    var defer = Q.defer();

    var request;

    if (!verb) verb = METHOD_GET;

    verb = verb.trim().toLowerCase();

    switch (verb) {
        case METHOD_GET:
            request = agent.get(url);
            break;
        case METHOD_POST:
            request = agent.post(url);
            break;
        case METHOD_PUT:
            request = agent.put(url);
            break;
        case METHOD_DELETE:
            request = agent.del(url);
            break;
        case METHOD_PATCH:
            request = agent.patch(url);
            break;
        default:
            request = agent.get(url);
            break;
    }

    request.set('Content-Type', 'application/json');
    request.set('Authorization', configUtil.getDSBasicAuth());

    if (userId) {
        request.set('NONGHE-USERID', userId);
    }

    if (req) {
        var platform_name = req.get(nonghe_platform_name);
        if (platform_name) {
            request.set(nonghe_platform_name, platform_name);
            logger.debug(method, nonghe_platform_name + ': ' + platform_name);
        } else {
            logger.debug(method, nonghe_platform_name + ': Not set platform name');
        }
    }

    if (verb === METHOD_POST || verb === METHOD_PUT || verb === METHOD_PATCH) {
        request.send(JSON.stringify(payload));
    }
    request.end(function (err, res) {
        if (err) {
            logger.error(method, 'Failed to execute the data service.');
            logger.error(method, err);
            // logger.error(method, res);
            defer.reject(err);
        } else {
            logger.debug(method, 'Headers', res.headers);
            // logger.debug(method, 'Result', res.body);
            defer.resolve(res);
        }
    });
    return defer.promise;
};

