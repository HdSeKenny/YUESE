"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerEvents = registerEvents;
exports.default = void 0;

var _events = require("events");

/**
 * User model events
 */
var UserEvents = new _events.EventEmitter(); // Set max event listeners (0 == unlimited)

UserEvents.setMaxListeners(0); // Model events

var events = {
  save: 'save',
  remove: 'remove' // Register the event emitter to the model events

};

function registerEvents(User) {
  for (var e in events) {
    var event = events[e];
    User.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    UserEvents.emit("".concat(event, ":").concat(doc._id), doc);
    UserEvents.emit(event, doc);
  };
}

var _default = UserEvents;
exports.default = _default;