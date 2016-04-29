'use strict'

/**
 * Message model/service registry
 *
 * Singletone class for message service registry
 *
 * @author lizh
 */

var MsgSvcRegClz = (function() {
  var MSG_SERVICE_REGISTRY_NAME = 'MsgServiceRegistry';	
	var MSG_SERVICES_REGISTRY_SINGLETON = null;
  var _dispatchers = {};
	var _emitters = {};

	/**
	 * The class for message services registry
	 */
	class MsgServiceRegistry {
		constructor () {
		}

		static get INSTANCE() {
			if (MSG_SERVICES_REGISTRY_SINGLETON) return MSG_SERVICES_REGISTRY_SINGLETON;

		  MSG_SERVICES_REGISTRY_SINGLETON = new MsgServiceRegistry();
			return MSG_SERVICES_REGISTRY_SINGLETON;
		}
    
		/**
		 * get message services registry name
		 *
		 */
		getName() {
	    return MSG_SERVICE_REGISTRY_NAME;	
		}

    /**
		 * Get instance of dispatcher by name
		 *
		 * @param {string}, dispatcher name
		 *
		 * @return {Object}, dispatcher instance
		 */
		getDisptcher (name) {
			if (! name) return;
	    return _dispatchers[name];
		}
    
    /**
		 * Add instance of dispatcher by name
		 *
		 * @param {string}, dispatcher name
		 *
		 */
		addDisptcher (dispatcher) {
			if (! dispatcher || ! dispatcher.NAME) { 
		    throw new Error('Invalid parameter: ', dispatcher);	
			}
	    _dispatchers[dispatcher.NAME] = dispatcher;
		}
		
		/**
		 * Get instance of emitter by type
		 *
		 * @param {string}, emitter type 
		 *
		 * @return {Object}, emitter instance
		 */
		getEmitter (type) {
			if (! type) return;
	    return _emitters[type];
		}
		
		/**
		 * Add instance of emitter by type
		 *
		 * @param {string}, emitter type 
		 *
		 */
		addEmitter (emitter) {
			if (! emitter || ! emitter.TYPE) {
		    throw new Error('Invalid parameter: ', emitter);	
			}
	    _emitters[emitter.TYPE] = emitter;
		}
	}
	return MsgServiceRegistry;
})();

module.exports = exports = MsgSvcRegClz; 
