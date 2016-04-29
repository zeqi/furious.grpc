'use strict'

/**
 * Emitter Interface defines the methods used for send a message following 
 * specific protocol. This interface is protocol specific. That means,
 * for one kind of message type, we will deliver a emitter.
 *
 * The implementation of this class will be trigger by message queue listener.
 * As the 1st stage, we are using mongodb to emulate the queue behavior, so a db listener
 * will be added to listening on the db change, and by turn call the appropriate emitter 
 * to send the message based on the message type definition
 *
 * @author lizh
 *
 */

/**
 * Abstract class define the basic shape/behavior of Emitter 
 */
class Emitter {
  
	/**
	 * Constructor method which use to create a emitter instance
	 */
	constructor() {
	}

	/**
	 * The static attribute for the dispatcher name
	 * The name could be a qname, it should be unique
	 * It can be used as the regitry key for dispatcher 
	 * instance look up
	 */
  get TYPE () {
      return 'BASE_TYPE';	
	}

	/**
	 * Get message payload from message store
	 * @param {string}, message-ref, the message-ref which can identify a message in a message store
	 * @param {function}, callback(error, content)
	 * @return {promise}, message content
	 * @abstract
	 */
	getPayload(msgRef, callback) {
    throw new Error('Unimplemented method in abstract class');	
	}

	/**
	 *  Check whether the target prefer mute mode for the message notification
	 *  @param {string}, target, the user id
	 *  @param {function} , callback(error, mute}, if mute = true, means no message emit, if mute = false, send the message to target
	 *
	 *  @return {promise}, boolean, true: no message send, false, message will be sent
	 *
	 */
	muteOnTarget(target, callback) {
	
	}
	/**
	 * Deliver a message to endpoint
	 *
	 * @param {string}, message-ref
	 * @param {object}, options, the data structure as below:
	 * {
	 *   msgId: <string>,
	 *   msgType: <string>,
	 *   to: <string>,
	 *   endpoint: {
	 *      endpointType: <string>,
	 *      address: <string>
	 *   }
	 * }
	 * 
	 * @param {function}, optional callback(error, result)
	 *
	 * @return {promise}
	 *
	 * @abstract
	 */
  send(msgRef, options, callback) {
    throw new Error('Unimplemented method in abstract class');	
	}
}

module.exports = exports = Emitter; 
