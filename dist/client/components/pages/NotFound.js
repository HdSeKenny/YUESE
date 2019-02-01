"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NotFound;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NotFound() {
  return _react.default.createElement("div", {
    className: "not-found"
  }, _react.default.createElement("h1", null, "Not Found"));
}

module.exports = exports.default;