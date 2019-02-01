"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = _interopRequireDefault(require("events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseClient =
/*#__PURE__*/
function () {
  /**
       * Initiate the event emitter
       */
  function BaseClient() {
    _classCallCheck(this, BaseClient);

    // eslint-disable-next-line
    this.eventEmitter = new _events.default();
  }
  /**
     * Adds the @listener function to the end of the listeners array
     * for the event named @eventName
     * Will ensure that only one time the listener added for the event
     *
     * @param {string} eventName
     * @param {function} listener
     */


  _createClass(BaseClient, [{
    key: "on",
    value: function on(eventName, listener) {
      this.eventEmitter.on(eventName, listener);
    }
    /**
       * Will temove the specified @listener from @eventname list
       *
       * @param {string} eventName
       * @param {function} listener
       */

  }, {
    key: "removeEventListener",
    value: function removeEventListener(eventName, listener) {
      this.eventEmitter.removeListener(eventName, listener);
    }
    /**
     * Will emit the event on the evetn name with the @payload
     * and if its an error set the @error value
     *
     * @param {string} event
     * @param {object} payload
     * @param {boolean} error
     */

  }, {
    key: "emit",
    value: function emit(event, payload) {
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.eventEmitter.emit(event, payload, error);
    }
    /**
       * Returns the event emitter
       * Used for testing purpose and avoid using this during development
       */

  }, {
    key: "getEventEmitter",
    value: function getEventEmitter() {
      return this.eventEmitter;
    }
  }]);

  return BaseClient;
}();

var EventClient = new BaseClient();
var _default = EventClient;
exports.default = _default;
module.exports = exports.default;