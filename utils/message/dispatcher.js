'use strict'

/**
 * Dispatch Interface is used to generate message-ref record in user queue based on biz logic requirement,
 * So it is business specific, different business layer will  deliver/register 
 * the dispatch implementation individually
 *
 * @author lizh
 *
 */
var path                = require('path');
var Mustache            = require('mustache');
var debug               = require('debug')('nonghe:msg:dispatcher');
var fs                  = require('fs');
var Q                   = require('q');

/**
 * Abstract class define the basic shape/behavior of Dispatcher
 */
class Dispatcher {
  
	/**
	 * Constructor method which use to create a dispatcher instance
	 */
	constructor(templateHome, msgStore, qWriter) {
		this._templateHome = templateHome;
		this._qWrite = qWriter;
		this._msgStore = msgStore;
	}

	/**
	 * The static attribute for the dispatcher name
	 * The name could be a qname, it should be unique
	 * It can be used as the regitry key for dispatcher 
	 * instance look up
	 *
	 * @abstract 
	 */
	get NAME() {
      return 'BASE_DISPATCHER';	
	}

	/**
	 * Render a message payload via mustach template 
	 *
	 * @parma <string>, the mustache template id
	 *   The template id name convention is <I|W|E>-<FeatureID>-<ShortTemplateID>-<msgType>.mustache
	 *   e.g:
	 *      For INFO message: I-ORDER-10000000-Wechat_Text.mustache
	 *      For Warning message: W-ORDER-10000000-Nong_Internal.mustach
	 *      For Error message: E-ORDER-10000000-Mobile_SMS.mustach
	 * @param <string>, message type, the type of the message. e.g: "Wechat:Text"
	 * @param <object>, JSON object, contain the data which will fill in the template
	 *
	 * @return <string>, return a redenerred string
	 *
	 * @private
	 * @final
	 *
	 */
	renderMsg(templateId, msgType, replacement) {
		var method = 'renderMsg';
		debug(method + ' [Enter]');
    try {
			// TODO, cache is needed in future featrues
			var templateFile = templateId + '-' + msgType.replace(new RegExp(/(:)/g), '_' ) + '.mustache';
			templateFile = path.join(this._templateHome, templateFile);
			if (! fs.existsSync(templateFile)) {
				debug(method + ' [Exit](failed)' + ' Missing template file "' + templateFile + '"');
				throw new Error('Missing template file: "' + templateFile + '"');	
			}

			var template = fs.readFileSync(templateFile,'utf-8');
			Mustache.parse(template);
			var msgPayload = Mustache.render(template, replacement);
			debug(method + ' [Exit], render result: ' + msgPayload);
			return msgPayload;
		} catch (err) {
			debug('Error occurs during render message, due to: ' + err);
			debug(method + ' [Exit](failed), ' + err);
			throw err;
		} 
	}

	/**
	 * Create a message(s) record in person queue
	 * For specific message generator, it may create 
	 * multiple message records to different endpoints
	 * Each business module who want to trigger message, 
	 * they can contribute a dispatcher implementation, 
	 * and register it into message registry during server initial phase
	 *
	 * @param <object>, message holder
	 *   {
	 *      headers: {
	 *        msgId: <string>,
	 *        from: <qname>,
	 *        to: <qname>,
	 *        msgType: <string>,
	 *        QoS: <number>
	 *      },
	 *      dataHolder : {
   *        templateId: <string>,
	 *        replacement: <object>
	 *      }
	 *   }
	 * @param <string>, message-ref, the UUID which can identify a message in the message store
	 * @param <string>, the message-id, the ID of the message, please note: the is protocol layer message ID, the same ID may have different message to present the different status of the message exchange, e.g: message may have conn, REQ, RES and ACK status  
	 * @param <string>, the message-type qname, which can tell the dispatcher what protocol and message format need to be used for the message
	 * @param <string>|<Array>, target person IDs
	 *
	 * 
	 * @param <object>, options, the options for the dispatch
	 *
	 * @return <promise>, promise type with an array of created message-ref records
	 *
	 * @public
	 * @final
	 * 
	 */
  dispatch(msgHolder, options, callback) {
		var method = 'dispatch';
		var self = this;

		if (options && 'function' === typeof options) {
	    callback = options;
			options = null;
		}

		try {
			var payload = self.renderMsg(msgHolder.dataHolder.templateId, msgHolder.headers.msgType, msgHolder.dataHolder.replacement);

			var message = {
				msgId: msgHolder.headers.msgId,
				from: msgHolder.headers.from,
				to: msgHolder.headers.to,
				msgType: msgHolder.headers.msgType,
				QoS: msgHolder.headers.QoS,
				payload: payload
			};

			var createdMsg = null;
			var endpoints = null;
			return self.saveToStore(message).then(function(msg) {
				debug(method + ' Created message in message store: '+ msg);
				createdMsg = msg;
				return self.settleTargets(message.to, message.msgType, options);
			}).then(function(endpoints) {
				debug(method + ' Relevant endpoints: ' + endpoints);
				var opts = message;
				return self.putToQ(createdMsg._id.toString(), opts, endpoints);
			}).then(function(msgRefs) {
				debug(method + ' Message references created: ' + msgRefs);
				return {
					msgStore:createdMsg,
					msgQueue:msgRefs
				};
			}).fail(function(error) {
				debug('Error occurs for put message to Q, due to: ' + error);	
				throw error;
			}).nodeify(callback);
		} catch (err) {
			debug('Erros ocurs during dispatching message to Q: ' + err);	
			return Q.reject(err).nodeify(callback);
		}
	}
 
	/**
	 * Put the message-ref to target queues
	 *
	 * @param {string}, message-ref
	 * @param {object}, options, including message id, from, target, endpoint, msgType
	 * @param {array}, array of endpoints, e.g: {target: <string>, endpointType: <string>, address: <string>}
	 * @param {function}, callback, optional
	 *
	 * @return {promise}, the created message-refs
	 * @private
	 * @final
	 */
	putToQ(msgRef, opts, endpoints, callback) {
		var self = this;
		try {
			if (! endpoints || 0 === endpoints.length) {
				return Q.reject(new Error('Invalid endpoints value: ' + endpoints)).nodeify(callback);	
			}
			var msgRefs = [];
			endpoints.forEach(function(endpoint) {
				msgRefs.push({
					msgRef: msgRef,
					msgId: opts.msgId,
					from: opts.from,
					target: endpoint.target,
					endpoint: {
						endpointType: endpoint.endpointType,
						address: endpoint.address
					},
					msgType: opts.msgType
				});
			});
			return self._qWrite.put(msgRefs).nodeify(callback);
		} catch(err) {
			debug('Error occurs during put message into Q, due to: ' + err);	
			return Q.reject(err).nodeify(callback);
		}
	}

	/**
	 * Save the message to message store
	 *
	 * @param {object}, message
	 * @return {promise}, message-ref
	 * 
	 * @private
	 * @final
	 */
	saveToStore(msg, callback) {
		var self = this;
		try {
			if (! msg ) {
				return Q.reject(new Error('Invalid message: ' + msg)).nodeify(callback);	
			}

			return self._msgStore.create(msg).nodeify(callback);
		} catch (error) {
			return Q.reject(new Error('Error occurs during daving message to store due to: ' + error)).nodeify(callback);	
		}
	}

	/**
	 * Each concrete dispatch need to implement this method to translate the "to" qname 
	 * to specific target person and(or) endpoints
	 * @param <string>, qname of to presentation
	 * @param <string>, the message-type qname, which can tell the dispatcher what protocol and message format need to be used for the message
	 * @param <object>, options, the options for the dispatch
	 * @param <function>, callback(error, result), optional parameter 
	 *
	 * @return {promise}, value is array of target and endpoint address information
	 * e.g: 
	 * [{
	 *   target: <string>,
	 *   endpointType: <string>,
	 *   address: <string>
	 * }]
	 *
	 * @public
	 *
	 * @abstract
	 */
	settleTargets (to, msgType, options, callback) {
   throw Error('No implementation as abstract method in base class');	
	}
}

module.exports = exports = Dispatcher; 
