/**
 * Handle data service requests
 *
 * @module routes/dataClientWrapper
 *
 */
var dataService = require('../services/data.js');
var reqUtil = require('../utils/request.js');
var logger = require('../utils/logger').getLogger('routes/dataClientWrapper');

var nonghe_platform_name = 'nonghe_platform_name';

/**
 * Request handler to add corporation memeber
 *
 * @function
 * @param req - express http request
 * @param res - express http response
 *
 */
exports.invoke = function (req, res) {
    var method = 'invoke';
    logger.debug(method, '[ENTER]');

    logger.debug(method, 'method: ' + req.method);
    logger.debug(method, 'url: ' + req.url);
    logger.debug(method, 'payload: ' + JSON.stringify(req.body));
    logger.debug(method, 'userId: ' + reqUtil.getUserId(req));

    var platform_name = req.get(nonghe_platform_name);
    if (platform_name) {
        logger.debug(method, nonghe_platform_name + ': ' + platform_name);
    } else {
        logger.debug(method, nonghe_platform_name + ': Not set platform name');
    }

    dataService.execute(req.method, req.url, req.body, reqUtil.getUserId(req))
        .then(function (result) {

            if (result.headers && result.headers['content-range']) {
                res.set('Content-Range', result.headers['content-range']);
            }

            res.json(result.body);
            logger.debug(method, '[EXIT]');

        }).fail(function (err) {

        logger.error(method, 'err.status', err.status);
        logger.error(method, 'err.response.status', err.response.status);
        logger.error(method, 'err.response.error', err.response.error);
        logger.error(method, 'err.response.body', err.response.body);

        res.format({

            'text/html': function () {
                switch (err.status) {
                    case 404:
                        res.render('404');
                        break;
                    default:
                        res.render('error');
                        break;
                }
            },

            'application/json': function () {
                res.status(err.status).json(err && err.response && err.response.body);
            },

            'default': function () {
                res.status(err.status).json(err && err.response && err.response.body);
            }
        });

        logger.debug(method, '[EXIT]');
        return;

    });
};